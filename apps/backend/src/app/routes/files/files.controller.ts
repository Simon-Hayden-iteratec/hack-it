import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GridFSBucket, GridFSFile, ObjectId } from 'mongodb';
import { ConnectionService } from '../../db/connection/connection.service';

@Controller('files')
@ApiTags('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);
  private readonly bucket = new GridFSBucket(this.connection.getDb());

  constructor(private connection: ConnectionService) {}

  @ApiOperation({
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    schema: {
      properties: {
        id: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  })
  @Post()
  async uploadFile(@Req() request: FastifyRequest): Promise<string[]> {
    const ids: string[] = [];
    for await (const part of request.parts({
      limits: { fileSize: 2 ** 30 /* 1GiB */ },
    })) {
      if (part.type !== 'file') {
        continue;
      }
      const uploadStream = this.bucket.openUploadStream(part.filename, {
        contentType: part.mimetype,
      });
      const done = new Promise<void>((resolve, reject) => {
        part.file.on('end', () => {
          resolve();
        });
        part.file.on('error', (reason) => {
          reject(reason);
        });
      });
      part.file.pipe(uploadStream);
      await done;
      ids.push(uploadStream.id.toHexString());
    }
    return ids;
  }

  @Get(':id')
  async downloadFile(
    @Param('id') id: string,
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) reply: FastifyReply
  ): Promise<StreamableFile> {
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch (_) {
      throw new NotFoundException(`No file with ID '${id}' found`);
    }

    const fileCursor = this.bucket.find({ _id });
    let fileInfo: GridFSFile;
    try {
      fileInfo = await fileCursor.next();
      if (!fileInfo) {
        throw new NotFoundException(`No file with ID '${id}' found`);
      }

      reply.headers({
        'Accept-Range': 'bytes',
        'Content-Type': fileInfo.contentType,
        'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
      });
    } finally {
      await fileCursor
        .close()
        .catch((e) => this.logger.error('Failed to close find cursor:', e));
    }

    if (req.headers.range) {
      const [start, end] = req.headers.range
        .slice(6)
        .split('-', 2)
        .map((part) => parseInt(part, 10));
      const readstream = this.bucket.openDownloadStream(_id, {
        start,
        end,
      });

      reply.status(206);
      reply.headers({
        'Content-Range': `bytes ${start}-${end ? end : fileInfo.length - 1}/${
          fileInfo.length
        }`,
        'Content-Length': (end ? end : fileInfo.length) - start,
      });

      return new StreamableFile(readstream);
    } else {
      const readstream = this.bucket.openDownloadStream(_id);

      reply.status(200);
      reply.header('Content-Length', fileInfo.length);

      return new StreamableFile(readstream);
    }
  }
}
