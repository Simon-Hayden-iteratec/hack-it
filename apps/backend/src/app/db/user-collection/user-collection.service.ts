import { CreateUserDto } from '@hack-it/dtos';
import { Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserCollection {
  private readonly collection =
    this.connection.getCollection<UserEntity>('users');
  constructor(private connection: ConnectionService) {}

  async getUser(email: string): Promise<UserEntity | null> {
    return this.collection.findOne({ email });
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const entity: Omit<UserEntity, '_id'> = {
      email: user.email,
      name: user.name,
      company: user.company,
    };
    return this.collection.findOneAndUpdate(
      {
        email: entity.email,
      },
      {
        $set: entity,
      },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );
  }
}
