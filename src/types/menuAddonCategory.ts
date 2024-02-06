import { MenuAddonCategory } from "@prisma/client";

export interface MenuAddonCategorySliceInitialState {
    items : MenuAddonCategory[] ,
    isLoading : boolean,
    error : Error | null
}