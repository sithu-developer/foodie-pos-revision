import { Company } from "@prisma/client";

export interface CompanySliceInitialState {
    item : Company | null ,
    isLoading : boolean,
    error : Error | null
}