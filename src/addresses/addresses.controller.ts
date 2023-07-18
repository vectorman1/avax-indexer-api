import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressesService } from 'src/addresses/addresses.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddressDeltaAggregateReqest } from 'src/addresses/interfaces/address-delta.request';

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
  @UsePipes(ValidationPipe)
  async getBalanceDeltas(
    @Query() req: AddressDeltaAggregateReqest,
  ): Promise<any> {
    return await this.addressesService.getDeltaAddresses(req.sortDir);
  }
}
