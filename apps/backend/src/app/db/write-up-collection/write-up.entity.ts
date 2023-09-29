import {
  ImgWriteUpDataDto,
  SimpleWriteUpDto,
  TextWriteUpDataDto,
  WriteUpDto,
} from '@hack-it/dtos';
import { Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ProjectEntity } from '../project-collection/project.entity';
import { UserEntity } from '../user-collection/user.entity';

export abstract class WriteUpEntity {
  _id: ObjectId;
  title: string;
  teaser: string;

  author: ObjectId;
  published: boolean;

  createdAt: Date;
  updatedAt: Date;

  project: ObjectId;

  data: TextWriteUpDataEntity | ImgWriteUpDataEntity;

  static toSimpleDto(
    entity: Omit<WriteUpEntity, 'author' | 'project'>
  ): SimpleWriteUpDto {
    let data: WriteUpDto['data'];
    switch (entity.data.type) {
      case 'text': {
        data = TextWriteUpDataEntity.toDto(entity.data);
        break;
      }
      case 'img': {
        data = ImgWriteUpDataEntity.toDto(entity.data);
        break;
      }
      default: {
        logger.warn('Failed to match write-up data type:', entity.data);
        data = {
          type: 'text',
          body: '',
        };
      }
    }
    return {
      id: entity._id.toHexString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      teaser: entity.teaser,
      title: entity.title,
      data,
    };
  }

  static toDto(entity: FullWriteUpEntity): WriteUpDto {
    return {
      ...this.toSimpleDto(entity),
      author: UserEntity.toDto(entity.author),
      project: ProjectEntity.toSimpleDto(entity.project),
    };
  }
}

export interface FullWriteUpEntity
  extends Omit<WriteUpEntity, 'author' | 'project'> {
  author: UserEntity;
  project: ProjectEntity;
}

const logger = new Logger(WriteUpEntity.name);

export abstract class TextWriteUpDataEntity {
  type: 'text';
  body: string;

  static toDto(entity: TextWriteUpDataEntity): TextWriteUpDataDto {
    return entity;
  }
}

export abstract class ImgWriteUpDataEntity {
  type: 'img';
  src: string;

  static toDto(entity: ImgWriteUpDataEntity): ImgWriteUpDataDto {
    return entity;
  }
}

export const WRITE_UP_COLLECTION = 'write-ups';
