export interface ResponseBody<T> {
    data: T;
    errors: string[];
    links: any[];
  }
  