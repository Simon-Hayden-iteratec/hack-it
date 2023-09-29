import { CreateProjectDto } from '@hack-it/dtos';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ConnectionService } from '../connection/connection.service';
import { UserEntity } from '../user-collection/user.entity';
import { PROJECT_COLLECTION, ProjectEntity } from './project.entity';

@Injectable()
export class ProjectCollection {
  private readonly collection =
    this.connection.getCollection<ProjectEntity>(PROJECT_COLLECTION);

  constructor(private connection: ConnectionService) {}

  getAll(): Promise<ProjectEntity[]> {
    return this.collection.find().toArray();
  }

  getById(projectId: ObjectId): Promise<ProjectEntity | null> {
    return this.collection.findOne({ _id: projectId });
  }

  getForEvent(eventId: ObjectId): Promise<ProjectEntity[]> {
    return this.collection.find({ event: eventId }).toArray();
  }

  async createProject(
    eventId: ObjectId,
    owners: UserEntity[],
    dto: CreateProjectDto
  ): Promise<ProjectEntity> {
    const entity: Omit<ProjectEntity, '_id'> = {
      title: dto.title,
      desc: dto.desc,
      shortDesc: dto.shortDesc,
      event: eventId,
      owners: owners.map((owner) => owner._id),
      participants: [],
    };
    const result = await this.collection.insertOne(entity);
    const inserted = await this.collection.findOne({ _id: result.insertedId });
    if (!inserted) {
      throw new InternalServerErrorException('Not found after insert');
    }
    return inserted;
  }
}
