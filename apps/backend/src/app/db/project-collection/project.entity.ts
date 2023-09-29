import { ProjectDto, SimpleProjectDto } from '@hack-it/dtos';
import { ObjectId } from 'mongodb';
import { EventEntity } from '../event-collection/event.entity';
import { UserEntity } from '../user-collection/user.entity';

export abstract class ProjectEntity {
  _id: ObjectId;
  title: string;
  desc: string;
  shortDesc: string;

  event: ObjectId;
  owners: ObjectId[];
  participants: ObjectId[];

  static toDto(entity: FullProjectEntity): ProjectDto {
    return {
      id: entity._id.toHexString(),
      title: entity.title,
      desc: entity.desc,
      shortDesc: entity.shortDesc,
      owners: entity.owners.map((owner) => UserEntity.toDto(owner)),
      event: undefined,
      participants: entity.participants.map((participant) =>
        UserEntity.toDto(participant)
      ),
    };
  }

  static toSimpleDto(
    entity: Omit<ProjectEntity, 'owners' | 'event' | 'participants'>
  ): SimpleProjectDto {
    return {
      id: entity._id.toHexString(),
      title: entity.title,
      desc: entity.desc,
      shortDesc: entity.shortDesc,
    };
  }
}

export interface FullProjectEntity
  extends Omit<ProjectEntity, 'owners' | 'event' | 'participants'> {
  owners: UserEntity[];
  event: EventEntity;
  participants: UserEntity[];
}

export const PROJECT_COLLECTION = 'projects';
