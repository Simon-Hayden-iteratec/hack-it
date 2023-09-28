import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventCollection } from '../../../../db/event-collection/evemt-collection.service';
import { EventDto } from '@hack-it/dtos';
import { EventEntity } from '../../../../db/event-collection/event.entity';


@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(private eventCollection: EventCollection) {}

  @Get()
  async getAllEvents(): Promise<EventDto[]> {
    const events = await this.eventCollection.getAllEvents();

    return events.map(EventEntity.toDto)
  }
}