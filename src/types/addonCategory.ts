import { AddonCategory } from "@prisma/client";

export interface AddonCategorySliceInitialState {
    item : AddonCategory[] ,
    isLoading : boolean,
    error : Error | null
}