import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuSliceInitialState {
    items : MenuCategoryMenu[] ,
    isLoading : boolean,
    error : Error | null
}