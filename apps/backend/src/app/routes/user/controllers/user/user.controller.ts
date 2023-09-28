import { CreateUserDto, UserDto } from '@hack-it/dtos';
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCollection } from '../../../../db/user-collection/user-collection.service';
import { UserEntity } from '../../../../db/user-collection/user.entity';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private userCollection: UserCollection) {}

  @Get('by-email/:email')
  async getByEmail(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userCollection.getUser(email);
    if (!user) {
      throw new NotFoundException(
        undefined,
        `User with email '${email}' not found`
      );
    }
    return UserEntity.toDto(user);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userCollection.createUser(dto);
    return UserEntity.toDto(user);
  }
}
