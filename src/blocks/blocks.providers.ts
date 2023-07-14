import { BlockSchema } from 'src/schemas/block.schema';
import { DatabaseConstants } from 'src/database/database.constants';

export const blocksProviders = [
  {
    provide: DatabaseConstants.BLOCKS_MODEL,
    useFactory: (connection) => connection.model('Block', BlockSchema),
    inject: [DatabaseConstants.CONNECTION],
  },
];
