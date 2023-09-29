import { ApiExtraModels, ApiProperty, OmitType, refs } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from './user.dto';

export class BaseWriteUpData {
  type: string;
}

export class TextWriteUpDataDto {
  @ApiProperty({ enum: ['text'] })
  @IsEnum(['text'])
  type: 'text';
  @IsString()
  body: string;
}

export class ImgWriteUpDataDto {
  @ApiProperty({ enum: ['img'] })
  @IsEnum(['img'])
  type: 'img';
  @IsString()
  src: string;
}

@ApiExtraModels(TextWriteUpDataDto, ImgWriteUpDataDto)
export class WriteUpDto {
  id: string;
  @IsString()
  title: string;
  @IsString()
  teaser: string;

  author: UserDto;
  createdAt: string;
  updatedAt: string;

  @ApiProperty({
    oneOf: refs(TextWriteUpDataDto, ImgWriteUpDataDto),
  })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => BaseWriteUpData, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { name: 'text', value: TextWriteUpDataDto },
        { name: 'img', value: ImgWriteUpDataDto },
      ],
    },
  })
  data: TextWriteUpDataDto | ImgWriteUpDataDto;
}

export class SimpleWriteUpDto extends OmitType(WriteUpDto, [
  'author',
] as const) {}

export class CreateWriteUpDto extends OmitType(WriteUpDto, ['id', 'author', 'createdAt', 'updatedAt'] as const) {
  /**
   * The email of the author.
   */
  @IsEmail()
  author: string;
}
