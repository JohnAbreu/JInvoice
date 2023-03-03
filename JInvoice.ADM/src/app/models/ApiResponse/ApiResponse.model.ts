import { Paginator } from "./Paginator.Model";

export interface APIResponse<T> {
    result?:  T;
    messages:   any[];
    isSuccess:  boolean;
    statusCode: number;
    paginator:  Paginator;
}


