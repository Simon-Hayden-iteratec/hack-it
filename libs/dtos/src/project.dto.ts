import { OmitType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { EventDto } from './event.dto';
import { UserDto } from './user.dto';

export class ProjectDto {
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;
  @IsString()
  @IsOptional()
  shortDesc: string;

  event: EventDto | undefined;
  owners: UserDto[];
  participants: UserDto[];
}

export class SimpleProjectDto extends OmitType(ProjectDto, [
  'event',
  'owners',
  'participants',
] as const) {}

export class CreateProjectDto extends OmitType(ProjectDto, [
  'id',
  'event',
  'owners',
  'participants',
] as const) {
  @IsString()
  event: string;
  @IsArray()
  @IsEmail({}, { each: true })
  owners: string[];
}
