import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { EventController } from './routes/events/events.controller';
import { ProjectController } from './routes/projects/projects.controller';
import { UserController } from './routes/users/users.controller';
import { WriteUpController } from './routes/write-ups/write-ups.controller';

@Module({
  imports: [DbModule],
  controllers: [
    EventController,
    ProjectController,
    UserController,
    WriteUpController,
  ],
})
export class AppModule {}
