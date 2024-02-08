import { Addon } from "@prisma/client";
import { BaseOptions } from "./app";

export interface AddonSliceInitialState {
    items : Addon[] ,
    isLoading : boolean,
    error : Error | null
}

export interface NewAddonOptions extends BaseOptions {
    name : string;
    price ?: number | null;
    addonCategoryId ?: number;
}

export interface UpdatedAddonOptions extends NewAddonOptions {
    id : number;
}