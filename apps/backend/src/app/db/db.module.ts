import { Global, Module } from '@nestjs/common';
import { ConnectionService } from './connection/connection.service';
import { EventCollection } from './event-collection/event-collection.service';
import { ProjectCollection } from './project-collection/project-collection.service';
import { UserCollection } from './user-collection/user-collection.service';
import { WriteUpCollectionService } from './write-up-collection/write-up-collection.service';

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
    ProjectCollection,
    WriteUpCollectionService,
  ],
  exports: [
    ConnectionService,
    UserCollection,
    EventCollection,
    ProjectCollection,
    WriteUpCollectionService,
  ],
})
export class DbModule {}
