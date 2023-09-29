import { CreateUserDto } from '@hack-it/dtos';
import { Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserCollection {
  private readonly collection =
    this.connection.getCollection<UserEntity>('users');
  constructor(private connection: ConnectionService) {}

  async findOrCreateEmails(emails: string[]): Promise<UserEntity[]> {
    const users = Promise.all(
      emails.map((email) => this.findOrCreateEmail(email))
    );
    return users;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
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

  async findOrCreateEmail(email: string): Promise<UserEntity> {
    const $setOnInsert: Omit<UserEntity, '_id'> = {
      email,
      company: undefined,
      name: undefined,
    };
    return this.collection.findOneAndUpdate(
      { email },
      { $setOnInsert },
      { upsert: true, returnDocument: 'after' }
    );
  }
}
