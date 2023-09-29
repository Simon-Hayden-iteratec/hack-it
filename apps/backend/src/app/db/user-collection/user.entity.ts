import { UserDto } from '@hack-it/dtos';
import { ObjectId } from 'mongodb';

export abstract class UserEntity {
  _id: ObjectId;
  email: string; // Unique
  name: string;
  company: string | undefined;

  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity._id.toHexString(),
      email: entity.email,
      name: entity.name,
      company: entity.company,
    }
  }
}

export const USER_COLLECTION = 'users';
