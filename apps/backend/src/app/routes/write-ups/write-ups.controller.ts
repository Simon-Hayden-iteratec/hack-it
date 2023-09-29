import { CreateWriteUpDto, SimpleWriteUpDto, WriteUpDto } from '@hack-it/dtos';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCollection } from '../../db/user-collection/user-collection.service';
import { WriteUpCollectionService } from '../../db/write-up-collection/write-up-collection.service';
import { WriteUpEntity } from '../../db/write-up-collection/write-up.entity';

@Controller('write-ups')
@ApiTags('write-ups')
export class WriteUpController {
  constructor(
    private writeUpCollection: WriteUpCollectionService,
    private userCollection: UserCollection
  ) {}

  @Get()
  async getAllWriteUps(): Promise<SimpleWriteUpDto[]> {
    const entities = await this.writeUpCollection.getAll();
    return entities.map(WriteUpEntity.toSimpleDto);
  }

  @Post()
  async createWriteUp(@Body() dto: CreateWriteUpDto): Promise<WriteUpDto> {
    const author = await this.userCollection.findOrCreateEmail(dto.author);
    const entity = await this.writeUpCollection.createWriteUp(author, dto);
    return WriteUpEntity.toDto(entity);
  }
}
