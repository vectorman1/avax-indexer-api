import * as mongoose from 'mongoose';
import { TransactionSchema } from 'src/schemas/transaction.schema';

export const BlockSchema = new mongoose.Schema(
  {
    hash: String,
    difficulty: String,
    extraData: String,
    gasLimit: Number,
    gasUsed: Number,
    logsBloom: String,
    miner: String,
    nonce: String,
    number: Number,
    parentHash: String,
    sha3Uncles: String,
    size: Number,
    stateRoot: String,
    timestamp: Number,
    totalDifficulty: String,
    transactions: [TransactionSchema],
    transactionsRoot: String,
    uncles: [String],
  },
  {
    collection: 'blocks',
  },
);
