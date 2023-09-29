import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { EventController } from './routes/events/events.controller';
import { ProjectController } from './routes/projects/projects.controller';
import { UserController } from './routes/users/users.controller';
import { WriteUpController } from './routes/write-ups/write-ups.controller';
import { FilesController } from './routes/files/files.controller';

@Module({
  imports: [DbModule],
  controllers: [
    EventController,
    ProjectController,
    UserController,
    WriteUpController,
    FilesController,
  ],
})
export class AppModule {}
