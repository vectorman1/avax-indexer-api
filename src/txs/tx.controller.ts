import { Controller, Get, Query } from '@nestjs/common';
import { TxsRepo } from 'src/txs/tx.repo';
import { PagedResponse } from 'src/common/interfaces/paged.response';
import { Transaction } from 'src/txs/interfaces/tx.interface';
import { TxSortOptsEnum } from 'src/txs/interfaces/tx-sort-opts.enum';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
export class TxsController {
  constructor(private readonly txsRepo: TxsRepo) {}

  @Get()
  @ApiTags('txs')
  @ApiOperation({ summary: 'Get transactions paged' })
  @ApiQuery({
    name: 'page',
    description: 'Start from 0 and defaults to 0',
    required: null,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Defaults to 10',
    required: null,
  })
  @ApiQuery({
    name: 'address',
    description: 'Filter transaction from or to by address',
    required: null,
  })
  @ApiQuery({
    name: 'sort',
    description: `'blockNumber' or 'value'`,
    required: null,
  })
  async paged(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('address') address?: string,
    @Query('sort') sort?: TxSortOptsEnum,
  ): Promise<PagedResponse<Transaction>> {
    return this.txsRepo.paged({
      page: Number(page),
      limit: Number(limit),
      sort,
      address,
    });
  }
}
