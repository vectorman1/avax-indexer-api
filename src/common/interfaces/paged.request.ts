import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PagedRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number = 0;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit: number = 10;
}
