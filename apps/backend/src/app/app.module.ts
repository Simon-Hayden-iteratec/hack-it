import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { UserController } from './routes/user/controllers/user/user.controller';
import { UserModule } from './routes/user/user.module';
import { EventModule } from './routes/event/event.module';

@Module({
  imports: [UserModule, DbModule, EventModule],
  controllers: [UserController],
})
export class AppModule {}
