import * as mongoose from 'mongoose';
import { DatabaseConstants } from 'src/database/database.constants';

export const databaseProviders = [
  {
    provide: DatabaseConstants.CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_DB_URI),
  },
];
