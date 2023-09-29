import { CreateWriteUpDto } from '@hack-it/dtos';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { UserEntity } from '../user-collection/user.entity';
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

  async createWriteUp(
    author: UserEntity,
    dto: CreateWriteUpDto
  ): Promise<FullWriteUpEntity> {
    const entity: Omit<WriteUpEntity, '_id'> = {
      teaser: dto.teaser,
      title: dto.title,

      author: author._id,
      published: false,

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
    };
  }
}
