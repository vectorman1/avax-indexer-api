import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TxsRepo } from 'src/txs/tx.repo';
import { PagedResponse } from 'src/common/interfaces/paged.response';
import { Transaction } from 'src/txs/interfaces/tx.interface';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TxsPagedRequest } from 'src/txs/interfaces/txs.paged.request';

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
  @UsePipes(ValidationPipe)
  paged(
    @Query()
    req: TxsPagedRequest,
  ): Promise<PagedResponse<Transaction>> {
    return this.txsRepo.paged(req);
  }
}
