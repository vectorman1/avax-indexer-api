import { Inject, Injectable } from '@nestjs/common';
import { DatabaseConstants } from 'src/database/database.constants';
import { Model, PipelineStage } from 'mongoose';
import { Block } from 'src/blocks/interfaces/block.interface';
import { AddressDeltaAggregate } from 'src/addresses/interfaces/address-delta.aggregate';

@Injectable()
export class AddressesRepo {
  constructor(
    @Inject(DatabaseConstants.BLOCKS_MODEL)
    private blocksModel: typeof Model<Block>,
  ) {}

  async getBalanceDelta(dir: string): Promise<Array<AddressDeltaAggregate>> {
    const pipeline: PipelineStage[] = [];
    pipeline.push(
      {
        $project: {
          transactions: {
            $filter: {
              input: '$transactions',
              as: 'tx',
              cond: {
                $ne: ['$$tx.value', '0'],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: '$transactions',
        },
      },
      {
        $replaceRoot: {
          newRoot: '$transactions',
        },
      },
      {
        $project: {
          deltas: {
            $concatArrays: [
              [
                {
                  address: '$from',
                  delta: {
                    $sum: [
                      {
                        $toLong: {
                          $concat: ['-', '$value'],
                        },
                      },
                      {
                        $toLong: {
                          $multiply: ['$gas', -1],
                        },
                      },
                    ],
                  },
                },
              ],
              [
                {
                  address: '$to',
                  delta: {
                    $toLong: '$value',
                  },
                },
              ],
            ],
          },
        },
      },
      {
        $unwind: {
          path: '$deltas',
        },
      },
      {
        $replaceRoot: {
          newRoot: '$deltas',
        },
      },
      {
        $group: {
          _id: '$address',
          address: {
            $first: '$address',
          },
          delta: {
            $sum: '$delta',
          },
        },
      },
      {
        $sort: {
          delta: -1,
        },
      },
      {
        $set: {
          delta: {
            $toString: '$delta',
          },
        },
      },
      {
        $unset: ['_id'],
      },
    );

    const res = await this.blocksModel
      .aggregate<AddressDeltaAggregate>(pipeline)
      .allowDiskUse(true)
      .exec();

    return res;
  }
}
