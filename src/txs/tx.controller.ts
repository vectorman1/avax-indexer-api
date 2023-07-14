import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { TxService } from 'src/txs/tx.service';
import { TxsRepo } from 'src/txs/tx.repo';
import { PagedResponse } from 'src/common/interfaces/paged.response';
import {
  Transaction,
  TransactionsPagedAggregate,
} from 'src/txs/interfaces/tx.interface';
import { TxSortOptsEnum } from 'src/txs/interfaces/tx-sort-opts.enum';

@Controller()
export class TxsController {
  constructor(private readonly txsRepo: TxsRepo) {}

  @Get()
  paged(
    @Query('page') page = 0,
    @Query('limit') limit = 10,
    @Query('address') address: string | undefined,
    @Query('sort') sort: TxSortOptsEnum = TxSortOptsEnum.BlockNumber,
  ): Promise<PagedResponse<Transaction>> {
    return this.txsRepo.paged({
      page: Number(page),
      limit: Number(limit),
      sort,
      address,
    });
  }
}
