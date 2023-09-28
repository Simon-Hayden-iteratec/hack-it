import { CreateEventDto, toDate } from '@hack-it/dtos';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ConnectionService } from '../connection/connection.service';
import { EventEntity } from './event.entity';

@Injectable()
export class EventCollection {
  private readonly collection =
    this.connection.getCollection<EventEntity>('events');
  constructor(private connection: ConnectionService) {}

  getAllEvents(): Promise<EventEntity[]> {
    return this.collection.find().toArray();
  }

  getEvent(id: ObjectId): Promise<EventEntity | null> {
    return this.collection.findOne({ _id: id });
  }

  async createEvent(dto: CreateEventDto): Promise<EventEntity> {
    const entity: Omit<EventEntity, '_id'> = {
      title: dto.title,
      desc: dto.desc,
      shortDesc: dto.shortDesc,
      projects: [],
      start: toDate(dto.start),
      end: toDate(dto.end),
    };
    const result = await this.collection.insertOne(entity);
    const inserted = await this.collection.findOne({ _id: result.insertedId });

    if (!inserted) {
      throw new InternalServerErrorException('Inserted document not found');
    }
    return inserted;
  }
}
