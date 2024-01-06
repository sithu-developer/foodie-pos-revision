import { DisabledLocationMenuCategory } from "@prisma/client";

export interface DisabledLocationMenuCategorySliceInitialState {
    items : DisabledLocationMenuCategory[] ,
    isLoading : boolean,
    error : Error | null
}