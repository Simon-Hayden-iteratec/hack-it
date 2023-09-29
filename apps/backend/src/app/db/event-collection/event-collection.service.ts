import { CreateEventDto, toDate } from '@hack-it/dtos';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AggregationCursor, ObjectId } from 'mongodb';
import { ConnectionService } from '../connection/connection.service';
import {
  PROJECT_COLLECTION,
  ProjectEntity,
} from '../project-collection/project.entity';
import { USER_COLLECTION, UserEntity } from '../user-collection/user.entity';
import { EventEntity, FullEventEntity } from './event.entity';

@Injectable()
export class EventCollection {
  private readonly collection =
    this.connection.getCollection<EventEntity>('events');
  constructor(private connection: ConnectionService) {}

  getAllEvents(): Promise<EventEntity[]> {
    return this.collection.find().toArray();
  }

  async getEvent(id: ObjectId): Promise<FullEventEntity | null> {
    let aggregateResult: AggregationCursor<FullEventEntity>;
    try {
      aggregateResult = this.collection.aggregate<FullEventEntity>([
        { $match: { _id: id } },
        {
          $lookup: {
            from: USER_COLLECTION,
            localField: 'owners' satisfies keyof EventEntity,
            foreignField: '_id' satisfies keyof UserEntity,
            as: 'owners' satisfies keyof FullEventEntity,
          },
        },
        {
          $lookup: {
            from: PROJECT_COLLECTION,
            localField: 'projects' satisfies keyof EventEntity,
            foreignField: '_id' satisfies keyof ProjectEntity,
            as: 'projects' satisfies keyof FullEventEntity,
          },
        },
      ]);
      return await aggregateResult.next();
    } finally {
      await aggregateResult?.close();
    }
  }

  async createEvent(
    owners: UserEntity[],
    dto: CreateEventDto
  ): Promise<FullEventEntity> {
    const entity: Omit<EventEntity, '_id'> = {
      title: dto.title,
      desc: dto.desc,
      shortDesc: dto.shortDesc,
      projects: [],
      start: toDate(dto.start),
      end: toDate(dto.end),
      owners: owners.map((owner) => owner._id),
    };
    const result = await this.collection.insertOne(entity);
    const inserted = await this.collection.findOne({ _id: result.insertedId });

    if (!inserted) {
      throw new InternalServerErrorException('Inserted document not found');
    }
    return {
      ...inserted,
      owners,
      projects: [],
    };
  }
}
