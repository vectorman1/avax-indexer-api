import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConstants } from 'src/database/database.constants';
import { Model } from 'mongoose';
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

  async paged(req: TxsPagedRequest): Promise<PagedResponse<Transaction>> {
    const pipeline = [];
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
        $project: {
          transactions: req.address
            ? {
                $filter: {
                  input: '$transactions',
                  as: 'tx',
                  cond: {
                    $or: [
                      {
                        $eq: ['$$tx.from', req.address],
                      },
                      {
                        $eq: ['$$tx.to', req.address],
                      },
                    ],
                  },
                },
              }
            : 1,
        },
      },
      {
        $unwind: {
          path: '$transactions',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $sort: sort,
      },
      {
        $replaceRoot: {
          newRoot: '$transactions',
        },
      },
      {
        $facet: {
          data: [
            {
              $skip: req.page * req.limit,
            },
            {
              $limit: Number(req.limit),
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
        $unwind: {
          path: '$count',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          total: '$count.count',
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
