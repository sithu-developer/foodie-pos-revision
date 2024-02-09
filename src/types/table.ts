import { Table } from "@prisma/client";
import { BaseOptions } from "./app";

export interface TableSliceInitialState {
    items : Table[] ,
    isLoading : boolean,
    error : Error | null
}

export interface NewTableOptions extends BaseOptions {
    name : string
    locationId : number | ""; 
}