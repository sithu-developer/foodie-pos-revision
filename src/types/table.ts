import { Table } from "@prisma/client";

export interface TableSliceInitialState {
    item : Table[] ,
    isLoading : boolean,
    error : Error | null
}