import { PagedRequest } from 'src/common/interfaces/paged.request';
import { TxSortOptsEnum } from 'src/txs/interfaces/tx-sort-opts.enum';

export interface TxsPagedRequest extends PagedRequest {
  address?: string;
  sort: TxSortOptsEnum;
}
