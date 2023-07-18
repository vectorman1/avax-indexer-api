import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConstants } from 'src/database/database.constants';
import { Model, PipelineStage } from 'mongoose';
import { Block } from 'src/blocks/interfaces/block.interface';
import { TxsPagedRequest } from 'src/txs/interfaces/txs.paged.request';
import { PagedResponse } from 'src/common/interfaces/paged.response';
import {
  Transaction,
  TransactionsPagedAggregate,
} from 'src/txs/interfaces/tx.interface';
import { TxSortOptsEnum } from 'src/txs/interfaces/tx-sort-opts.enum';

@Injectable()
export class TxsRepo {
  constructor(
    @Inject(DatabaseConstants.BLOCKS_MODEL)
    private blocksModel: typeof Model<Block>,
  ) {}

  async paged(
    req: TxsPagedRequest,
    filterZeroTxs = false,
  ): Promise<PagedResponse<Transaction>> {
    const pipeline: PipelineStage[] = [];
    let f = {};
    if (req.address) {
      f = {
        $or: [
          { 'transactions.from': req.address },
          { 'transactions.to': req.address },
        ],
      };
    }

    let sort = {};
    const defaultSort = {
      'transactions.block_number': -1,
      'transactions.transaction_index': -1,
    };
    switch (req.sort) {
      case TxSortOptsEnum.BlockNumber:
        sort = defaultSort;
        break;
      case TxSortOptsEnum.Value:
        sort = {
          'transactions.value': -1,
        };
        break;
      default:
        sort = defaultSort;
    }

    pipeline.push(
      {
        $match: f,
      },
      {
        $unwind: {
          path: '$transactions',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: req.address
          ? {
              $or: [
                {
                  'transactions.from': req.address,
                },
                {
                  'transactions.to': req.address,
                },
              ],
            }
          : {},
      },
      {
        $match: filterZeroTxs ? { 'transactions.value': { $ne: '0' } } : {},
      },
      {
        $facet: {
          data: [
            {
              $sort: sort,
            },
            {
              $skip: req.page * req.limit,
            },
            {
              $limit: Number(req.limit),
            },
            {
              $replaceRoot: {
                newRoot: '$transactions',
              },
            },
          ],
          count: [
            {
              $count: 'count',
            },
          ],
        },
      },
      {
        $set: {
          total: {
            $arrayElemAt: ['$count.count', 0],
          },
        },
      },
    );

    const data = await this.blocksModel
      .aggregate<TransactionsPagedAggregate>(pipeline)
      .exec();
    const res = data[0];

    return {
      page: req.page,
      limit: req.limit,
      total: res.total,
      data: res.data,
    };
  }
}
