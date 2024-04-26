import { Location } from "@prisma/client";

export interface AppInitialState {
    inited : boolean;
    isLoading : boolean;
    error : Error | null;
}

export interface BaseOptions {
    onSuccess ?: ( value ?: any ) => void;
    onError ?: (value ?: any ) => void;
}

export interface SetInitFunctionType {
    inited : boolean;
    locations : Location[]
}