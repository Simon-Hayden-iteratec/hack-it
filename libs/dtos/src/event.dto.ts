import { OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DayDto } from './day.dto';
import { SimpleProjectDto } from './project.dto';
import { UserDto } from './user.dto';

export class EventDto {
  id: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  shortDesc: string | undefined;

  @IsString()
  @IsOptional()
  desc: string | undefined;

  @ValidateNested()
  start: DayDto;

  @ValidateNested()
  end: DayDto;

  updatedAt: string;
  createdAt: string;

  owners: UserDto[];
  projects: SimpleProjectDto[];
}

export class SimpleEventDto extends OmitType(EventDto, [
  'owners',
  'projects',
] as const) {}

export class CreateEventDto extends OmitType(EventDto, [
  'id',
  'owners',
  'projects',
] as const) {
  /**
   * The owners' emails.
   */
  @IsArray()
  @IsEmail({}, { each: true })
  owners: string[];
}
