import { Module } from '@nestjs/common';
import { AddressesController } from 'src/addresses/addresses.controller';
import { BlocksModule } from 'src/blocks/blocks.module';
import { AddressesService } from 'src/addresses/addresses.service';
import { TxsModule } from 'src/txs/tx.module';

@Module({
  imports: [BlocksModule, TxsModule],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
