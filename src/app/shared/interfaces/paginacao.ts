export interface Paginacao<T> {
  content: T;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: number;
  empty: boolean;
}
