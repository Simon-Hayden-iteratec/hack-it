import { Global, Module } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import { UserCollection } from './user-collection/user-collection.service';

const CONNECTION_INIT = Symbol('connection-init');

@Global()
@Module({
  providers: [
    ConnectionService,
    {
      provide: CONNECTION_INIT,
      useFactory: async (service) => {
        await service.init();
      },
      inject: [ConnectionService],
    },
    UserCollection,
  ],
  exports: [ConnectionService, UserCollection],
})
export class DbModule {}
