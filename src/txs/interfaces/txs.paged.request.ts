import { PagedRequest } from 'src/common/interfaces/paged.request';
import { TxSortOptsEnum } from 'src/txs/interfaces/tx-sort-opts.enum';
import { IsEnum, IsHexadecimal, IsOptional } from 'class-validator';

export class TxsPagedRequest extends PagedRequest {
  @IsOptional()
  @IsHexadecimal()
  address?: string;

  @IsOptional()
  @IsEnum(TxSortOptsEnum)
  sort?: TxSortOptsEnum;
}
