import { Module } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';

@Module({
  providers: [AddressesService],
})
export class AddressesModule {}
