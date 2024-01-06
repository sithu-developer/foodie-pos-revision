import { MenuCategory } from "@prisma/client";
import { BaseOptions } from "./app";

export interface MenuCategorySliceInitialState {
    items : MenuCategory[] ,
    isLoading : boolean,
    error : Error | null
}

export interface UpdatedMenuCateogryOptions extends BaseOptions {
    id : number;
    name : string;
    availabledLocationIds : number[];
}

export interface NewMenuCategoryOptions extends BaseOptions {
    name : string;
    availabledLocationIds : number[];
    selectedLocationId ?: number;
}