import { Controller, Get, Query } from '@nestjs/common';
import { AddressesRepo } from 'src/addresses/addresses.repo';

@Controller()
export class AddressesController {
  constructor(private readonly addressesRepo: AddressesRepo) {}

  @Get()
  async getBalanceDeltas(@Query() sortDir: string = 'desc'): Promise<any> {
    return await this.addressesRepo.getBalanceDelta(sortDir);
  }
}
