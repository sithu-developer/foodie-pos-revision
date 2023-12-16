import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuCategorySliceInitialState {
    items : MenuCategory[] ,
    isLoading : boolean,
    error : Error | null
}

export interface UpdateMenuCateogryOptions extends BaseOptions {
    id : number;
    name : string;
}

export interface NewMenuCategoryOptions extends BaseOptions {
    name : string;
    available : boolean;
}