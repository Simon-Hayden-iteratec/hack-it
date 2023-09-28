import { Module } from '@nestjs/common';
import { EventController } from './controller/event.controller';

@Module({
  controllers: [EventController],
})
export class EventModule {}
