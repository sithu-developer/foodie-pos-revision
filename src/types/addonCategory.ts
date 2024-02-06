import { AddonCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface AddonCategorySliceInitialState {
    items : AddonCategory[] ,
    isLoading : boolean,
    error : Error | null
}

export interface NewAddonCategoryOptions extends BaseOptions {
    name : string;
    optional : boolean;
    menuIds : number[];
}

export interface UpdatedAddonCategoryOptions extends BaseOptions , NewAddonCategoryOptions {
    id : number;
}