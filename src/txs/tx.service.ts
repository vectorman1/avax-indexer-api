import { Injectable } from '@nestjs/common';

@Injectable()
export class TxService {
  paged(page: number, limit: number, address: string) {
    return 'This action returns all txs';
  }
}
