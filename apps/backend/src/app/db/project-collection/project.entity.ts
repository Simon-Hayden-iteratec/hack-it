import { SimpleProjectDto } from '@hack-it/dtos';
import { ObjectId } from 'mongodb';


export abstract class ProjectEntity {
  _id: ObjectId;
  title: string;
  desc: string;
  shortDesc: string;

  event: ObjectId;
  owners: ObjectId[];
  participants: ObjectId[];

  static toSimpleDto(entity: ProjectEntity): SimpleProjectDto {
    return {
      id: entity._id.toHexString(),
      title: entity.title,
      desc: entity.desc,
      shortDesc: entity.shortDesc,
    }
  }
}

export const PROJECT_COLLECTION = 'projects';