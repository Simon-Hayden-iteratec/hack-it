import { OmitType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DayDto } from './day.dto';
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

  owners: UserDto[];
}

export class CreateEventDto extends OmitType(EventDto, ['id', 'owners'] as const) {
  /**
   * The owners' emails.
   */
  @IsArray()
  @IsEmail({}, {each: true})
  owners: string[];
}