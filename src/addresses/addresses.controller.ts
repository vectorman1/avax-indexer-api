import { Controller, Get, Query } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { SortOrderEnum } from 'src/common/interfaces/sort';

@Controller()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async getBalanceDeltas(
    @Query() sortDir: SortOrderEnum = SortOrderEnum.DESC,
  ): Promise<any> {
    return await this.addressesService.getDeltaAddresses(sortDir);
  }
}
