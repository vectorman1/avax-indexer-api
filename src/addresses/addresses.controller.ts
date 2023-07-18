import { Controller, Get, Query } from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SortOrderEnum } from 'src/common/interfaces/sort';

@Controller()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiTags('addresses')
  @ApiOperation({ summary: 'Get addressed sorted by delta of value exchanged' })
  @ApiQuery({
    name: 'sortDir',
    description: `'asc' or 'desc'`,
    required: null,
  })
  async getBalanceDeltas(
    @Query('sortDir') sortDir: SortOrderEnum,
  ): Promise<any> {
    return await this.addressesService.getDeltaAddresses(sortDir);
  }
}
