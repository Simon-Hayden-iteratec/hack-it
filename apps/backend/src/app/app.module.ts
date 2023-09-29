import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { EventController } from './routes/events/events.controller';
import { UserController } from './routes/users/users.controller';

@Module({
  imports: [DbModule],
  controllers: [EventController, UserController],
})
export class AppModule {}
