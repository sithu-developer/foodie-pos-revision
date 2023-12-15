import { Location } from "@prisma/client";

export interface LocationSliceInitialState {
    item : Location[] ,
    isLoading : boolean,
    error : Error | null
}