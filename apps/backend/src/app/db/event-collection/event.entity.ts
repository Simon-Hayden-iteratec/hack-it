import { EventDto, toDay } from '@hack-it/dtos';
import { ObjectId } from 'mongodb';

export abstract class EventEntity {
  _id: ObjectId;
  title: string;
  shortDesc: string | undefined;
  desc: string | undefined;
  start: Date;
  end: Date;

  projects: ObjectId[];

  static toDto(entity: EventEntity): EventDto {
    return {
      id: entity._id.toHexString(),
      title: entity.title,
      desc: entity.desc,
      shortDesc: entity.shortDesc,
      end: toDay(entity.end),
      start: toDay(entity.start),
    }
  }
}
