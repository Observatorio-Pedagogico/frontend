import { Paginacao } from "./paginacao";

export interface ResponseBody<T> {
  data: T;
  errors: string[];
  links: any[];
}
export interface ResponsePagina<T> {
  data: Paginacao<T>;
  errors: string[];
  links: any[];
}
