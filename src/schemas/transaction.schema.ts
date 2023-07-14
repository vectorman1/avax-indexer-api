import mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  hash: String,
  nonce: Number,
  blockHash: String,
  blockNumber: Number,
  transactionIndex: Number,
  from: String,
  to: String,
  value: String,
  gas: Number,
  gasPrice: String,
  input: String,
});
