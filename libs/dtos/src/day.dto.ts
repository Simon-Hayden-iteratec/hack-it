import { IsNumber } from 'class-validator';

export class DayDto {
  @IsNumber()
  year: number;
  @IsNumber()
  month: number;
  @IsNumber()
  day: number;
}

export function toDate(day: DayDto): Date {
  return new Date(Date.UTC(day.year, day.month, day.day));
}

export function toDay(date: Date): DayDto {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}
