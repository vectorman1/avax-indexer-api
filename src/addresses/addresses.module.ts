import { Module } from '@nestjs/common';
import { AddressesController } from 'src/addresses/addresses.controller';
import { AddressesRepo } from 'src/addresses/addresses.repo';
import { BlocksModule } from 'src/blocks/blocks.module';

@Module({
  imports: [BlocksModule],
  providers: [AddressesRepo],
  controllers: [AddressesController],
})
export class AddressesModule {}
