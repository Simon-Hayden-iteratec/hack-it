import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string | undefined;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  company: string | undefined;
}

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}
