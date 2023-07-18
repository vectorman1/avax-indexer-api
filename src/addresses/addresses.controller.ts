import { Controller, Get, Query } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';

@Controller()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async getBalanceDeltas(@Query() sortDir: string = 'desc'): Promise<any> {
    return await this.addressesService.getDeltaAddresses(sortDir);
  }
}
