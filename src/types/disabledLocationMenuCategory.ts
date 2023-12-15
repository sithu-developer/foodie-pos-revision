import { DisabledLocationMenuCategory } from "@prisma/client";

export interface DisabledLocationMenuCategorySliceInitialState {
    item : DisabledLocationMenuCategory[] ,
    isLoading : boolean,
    error : Error | null
}