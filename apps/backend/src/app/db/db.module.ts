import { Global, Module } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import { EventCollection } from './event-collection/evemt-collection.service';
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
    EventCollection,
  ],
  exports: [ConnectionService, UserCollection, EventCollection],
})
export class DbModule {}
