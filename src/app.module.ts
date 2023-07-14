import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { BlocksModule } from 'src/blocks/blocks.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { CommonModule } from 'src/common/common.module';
import { DatabaseModule } from 'src/database/database.module';
import { TxsModule } from 'src/txs/tx.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AddressesModule,
    BlocksModule,
    CommonModule,
    DatabaseModule,
    TxsModule,
    RouterModule.register([
      {
        path: 'blocks',
        module: BlocksModule,
      },
      {
        path: 'txs',
        module: TxsModule,
      },
      {
        path: 'addresses',
        module: AddressesModule,
      },
    ]),
  ],
  providers: [AppService],
})
export class AppModule {}
