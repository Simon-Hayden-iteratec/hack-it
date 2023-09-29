import { EventDto, SimpleEventDto, toDay } from '@hack-it/dtos';
import { ObjectId } from 'mongodb';
import { ProjectEntity } from '../project-collection/project.entity';
import { UserEntity } from '../user-collection/user.entity';

export abstract class EventEntity {
  _id: ObjectId;
  title: string;
  shortDesc: string | undefined;
  desc: string | undefined;
  start: Date;
  end: Date;

  owners: ObjectId[];
  projects: ObjectId[];

  static toDto(entity: FullEventEntity): EventDto {
    return {
      ...EventEntity.toSimpleDto(entity),
      owners: entity.owners.map((owner) => UserEntity.toDto(owner)),
      projects: entity.projects.map((project) =>
        ProjectEntity.toSimpleDto(project)
      ),
    };
  }

  static toSimpleDto(
    entity: Omit<EventEntity, 'owners' | 'projects'>
  ): SimpleEventDto {
    return {
      id: entity._id.toHexString(),
      title: entity.title,
      desc: entity.desc,
      shortDesc: entity.shortDesc,
      end: toDay(entity.end),
      start: toDay(entity.start),
    };
  }
}

export interface FullEventEntity
  extends Omit<EventEntity, 'owners' | 'projects'> {
  owners: UserEntity[];
  projects: ProjectEntity[];
}
