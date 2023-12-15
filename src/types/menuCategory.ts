import { MenuCategory } from "@prisma/client";

export interface MenuCategorySliceInitialState {
    item : MenuCategory[] ,
    isLoading : boolean,
    error : Error | null
}