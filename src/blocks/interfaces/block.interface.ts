import { Transaction } from 'src/txs/interfaces/tx.interface';

export interface Block extends Document {
  hash: string;
  difficulty: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  logsBloom: string;
  miner: string;
  nonce: string;
  number: number;
  parentHash: string;
  sha3Uncles: string;
  size: number;
  stateRoot: string;
  timestamp: number;
  totalDifficulty: string;
  transactions: [Transaction];
  transactionsRoot: string;
  uncles: [string];
}
