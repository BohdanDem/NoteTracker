export interface ResponseInterface<T> {
  limit: number;
  page: number;
  itemCount: number;
  itemCountPerPage: number;
  data: T[];
}
