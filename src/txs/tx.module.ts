import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TxsController } from 'src/txs/tx.controller';
import { TxsRepo } from 'src/txs/tx.repo';
import { BlocksModule } from 'src/blocks/blocks.module';

@Module({
  imports: [DatabaseModule, BlocksModule],
  controllers: [TxsController],
  providers: [TxsRepo],
  exports: [TxsRepo],
})
export class TxsModule {}
