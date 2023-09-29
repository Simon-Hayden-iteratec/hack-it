import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';
import {
  MONGODB_DB,
  MONGODB_HOST,
  MONGODB_PROTOCOL,
  MONGODB_USER_NAME,
  MONGODB_USER_PASSWORD,
} from '../../env';

@Injectable()
export class ConnectionService implements BeforeApplicationShutdown {
  private logger = new Logger(ConnectionService.name);

  private readonly client = new MongoClient(
    `${MONGODB_PROTOCOL}${MONGODB_HOST}`,
    {
      auth: { username: MONGODB_USER_NAME, password: MONGODB_USER_PASSWORD },
    }
  );
  private readonly db = this.client.db(MONGODB_DB);

  async init(): Promise<void> {
    this.logger.verbose('Connecting to MongoDB...');
    await this.client.connect();
    this.logger.verbose('MongoDB client is connected');
  }

  getDb(): Db {
    return this.db;
  }

  getCollection<D extends object>(name: string): Collection<Omit<D, '_id'>> {
    return this.db.collection(name);
  }

  async beforeApplicationShutdown() {
    try {
      await this.client.close();
      this.logger.debug('MongoDB connection closed');
    } catch (e) {
      this.logger.error('Failed to close MongoDB client:', e);
    }
  }
}
