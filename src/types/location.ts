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

export interface UpdateLocationOptions extends BaseOptions , CreateLocationOptions {
    id : number;
}

export interface DeleteLocationOptions extends BaseOptions {
    id : number;
}

export interface RestoreLocationOptions extends BaseOptions {
    id : number;
    isRestore : boolean;
}

export interface DeleteLocationPermanentlyOptions extends BaseOptions {
    id : number ;
    isPermanent : boolean;
}