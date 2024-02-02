import { Menu } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuSliceInitialState {
    items : Menu[] ,
    isLoading : boolean,
    error : Error | null
}

export interface CreateMenuOptions extends BaseOptions {
    name : string;
    price ?: number | null;
    detail ?: string | null;
    menuCategoryIds : number[];
}

export interface UpdatedMenuOptions extends BaseOptions , CreateMenuOptions {
    id : number
}