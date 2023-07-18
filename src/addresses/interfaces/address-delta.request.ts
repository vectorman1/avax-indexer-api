import { SortOrderEnum } from 'src/common/interfaces/sort';
import { IsEnum, IsOptional } from 'class-validator';

export class AddressDeltaAggregateReqest {
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sortDir: SortOrderEnum = SortOrderEnum.DESC;
}
