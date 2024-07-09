import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Tasks {
  items: Task[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// types.ts (or wherever your Task model is defined)
export interface Task {
  id: number; // Unique identifier
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}
