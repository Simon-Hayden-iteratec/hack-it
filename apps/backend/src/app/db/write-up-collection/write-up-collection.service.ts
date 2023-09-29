import { CreateWriteUpDto } from '@hack-it/dtos';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AggregationCursor, ObjectId } from 'mongodb';
import { ConnectionService } from '../connection/connection.service';
import {
  PROJECT_COLLECTION,
  ProjectEntity,
} from '../project-collection/project.entity';
import { USER_COLLECTION, UserEntity } from '../user-collection/user.entity';
import {
  FullWriteUpEntity,
  WRITE_UP_COLLECTION,
  WriteUpEntity,
} from './write-up.entity';

@Injectable()
export class WriteUpCollectionService {
  private readonly collection =
    this.connection.getCollection<WriteUpEntity>(WRITE_UP_COLLECTION);

  constructor(private connection: ConnectionService) {}

  getAll(): Promise<WriteUpEntity[]> {
    return this.collection.find().toArray();
  }

  async getWriteUp(id: ObjectId): Promise<FullWriteUpEntity | null> {
    let aggregateResult: AggregationCursor<FullWriteUpEntity>;
    try {
      aggregateResult = this.collection.aggregate<FullWriteUpEntity>([
        { $match: { _id: id } },
        {
          $lookup: {
            from: USER_COLLECTION,
            localField: 'author' satisfies keyof WriteUpEntity,
            foreignField: '_id' satisfies keyof UserEntity,
            as: 'author' satisfies keyof FullWriteUpEntity,
          },
        },
        {
          $lookup: {
            from: PROJECT_COLLECTION,
            localField: 'project' satisfies keyof WriteUpEntity,
            foreignField: '_id' satisfies keyof UserEntity,
            as: 'project' satisfies keyof FullWriteUpEntity,
          },
        },
        {
          $set: {
            project: {
              $arrayElemAt: ['$project', 0],
            },
            author: {
              $arrayElemAt: ['$author', 0],
            },
          },
        },
      ]);
      return await aggregateResult.next();
    } finally {
      await aggregateResult?.close();
    }
  }

  getForProject(projectId: ObjectId): Promise<WriteUpEntity[]> {
    return this.collection.find({ project: projectId }).toArray();
  }

  async createWriteUp(
    author: UserEntity,
    project: ProjectEntity,
    dto: CreateWriteUpDto
  ): Promise<FullWriteUpEntity> {
    const entity: Omit<WriteUpEntity, '_id'> = {
      teaser: dto.teaser,
      title: dto.title,

      author: author._id,
      published: false,

      project: project._id,

      createdAt: new Date(),
      updatedAt: new Date(),

      data: dto.data,
    };

    const result = await this.collection.insertOne(entity);
    const inserted = await this.collection.findOne({ _id: result.insertedId });
    if (!inserted) {
      throw new InternalServerErrorException('Inserted document not found');
    }
    return {
      ...inserted,
      author,
      project,
    };
  }
}
