import { OmitType } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { DayDto } from './day.dto';


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
}

export class CreateEventDto extends OmitType(EventDto, ['id'] as const) {

}