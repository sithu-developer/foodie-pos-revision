import { Location } from "@prisma/client";
import { BaseOptions } from "./app";

export interface LocationSliceInitialState {
    items : Location[] ,
    selectedLocationId : number | null;
    isLoading : boolean,
    error : Error | null
}

export interface CreateLocationOptions extends BaseOptions {
    name : string;
    street : string;
    township : string;
    city : string;
}