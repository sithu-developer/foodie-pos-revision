import { Addon } from "@prisma/client";

export interface AddonSliceInitialState {
    item : Addon[] ,
    isLoading : boolean,
    error : Error | null
}