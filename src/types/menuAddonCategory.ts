import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySliceInitialState {
    item : MenuAddonCategory[] ,
    isLoading : boolean,
    error : Error | null
}