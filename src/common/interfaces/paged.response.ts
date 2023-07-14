export interface PagedResponse<T> {
  page: number;
  limit: number;
  total: number;
  data: Array<T>;
}
