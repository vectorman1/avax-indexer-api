export interface Transaction extends Document {
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  input: string;
}

export interface TransactionsPagedAggregate extends Document {
  total: number;
  data: Array<Transaction>;
}
