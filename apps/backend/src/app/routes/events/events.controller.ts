import { CreateEventDto, EventDto, SimpleEventDto } from '@hack-it/dtos';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { EventCollection } from '../../db/event-collection/event-collection.service';
import { EventEntity } from '../../db/event-collection/event.entity';
import { UserCollection } from '../../db/user-collection/user-collection.service';

@Controller('events')
@ApiTags('events')
export class EventController {
  constructor(
    private eventCollection: EventCollection,
    private userCollection: UserCollection
  ) {}

  @Get()
  async getAllEvents(): Promise<SimpleEventDto[]> {
    const events = await this.eventCollection.getAllEvents();
    return events.map(EventEntity.toSimpleDto);
  }

  @Get(':eventId')
  async getEvent(@Param('eventId') eventId: string): Promise<EventDto> {
    let id: ObjectId;
    try {
      id = new ObjectId(eventId);
    } catch (_) {
      // Mask invalid object ID as "not found"
      throw new NotFoundException(`No event with ID '${eventId}' found`);
    }
    const event = await this.eventCollection.getEvent(id);
    if (!event) {
      throw new NotFoundException(`No event with ID '${eventId}' found`);
    }
    return EventEntity.toDto(event);
  }

  @Post()
  async createEvent(@Body() dto: CreateEventDto) {
    const event = await this.eventCollection.createEvent(
      await this.userCollection.findOrCreateEmails(dto.owners),
      dto
    );
    return EventEntity.toDto(event);
  }
}
