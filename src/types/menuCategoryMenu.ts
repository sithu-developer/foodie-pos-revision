import { MenuCategoryMenu } from "@prisma/client";

export interface MenuCategoryMenuSliceInitialState {
    item : MenuCategoryMenu[] ,
    isLoading : boolean,
    error : Error | null
}