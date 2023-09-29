import { CreateWriteUpDto, SimpleWriteUpDto, WriteUpDto } from '@hack-it/dtos';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ProjectCollection } from '../../db/project-collection/project-collection.service';
import { UserCollection } from '../../db/user-collection/user-collection.service';
import { WriteUpCollectionService } from '../../db/write-up-collection/write-up-collection.service';
import { WriteUpEntity } from '../../db/write-up-collection/write-up.entity';

@Controller('write-ups')
@ApiTags('write-ups')
export class WriteUpController {
  constructor(
    private writeUpCollection: WriteUpCollectionService,
    private userCollection: UserCollection,
    private projectCollection: ProjectCollection
  ) {}

  @Get()
  async getAllWriteUps(): Promise<SimpleWriteUpDto[]> {
    const entities = await this.writeUpCollection.getAll();
    return entities.map(WriteUpEntity.toSimpleDto);
  }

  @Get('projects/:projectId')
  async getWriteUpsForProject(
    @Param('projectId') projectId: string
  ): Promise<SimpleWriteUpDto[]> {
    let id: ObjectId;
    try {
      id = new ObjectId(projectId);
    } catch (_) {
      throw new BadRequestException('Project must be a valid ID');
    }
    const entities = await this.writeUpCollection.getForProject(id);
    return entities.map(WriteUpEntity.toSimpleDto);
  }

  @Post()
  async createWriteUp(@Body() dto: CreateWriteUpDto): Promise<WriteUpDto> {
    let projectId: ObjectId;
    try {
      projectId = new ObjectId(dto.project);
    } catch (_) {
      throw new BadRequestException('Project must be a valid ID');
    }
    const [author, project] = await Promise.all([
      this.userCollection.findOrCreateEmail(dto.author),
      this.projectCollection.getById(projectId),
    ]);
    if (!project) {
      throw new BadRequestException(
        `No project with ID '${dto.project}' found`
      );
    }
    const entity = await this.writeUpCollection.createWriteUp(
      author,
      project,
      dto
    );
    return WriteUpEntity.toDto(entity);
  }
}
