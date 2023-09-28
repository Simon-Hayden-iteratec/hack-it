import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { UserController } from './routes/user/controllers/user/user.controller';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [UserModule, DbModule],
  controllers: [UserController],
})
export class AppModule {}
