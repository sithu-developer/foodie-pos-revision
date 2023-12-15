import { Menu } from "@prisma/client";

export interface MenuSliceInitialState {
    item : Menu[] ,
    isLoading : boolean,
    error : Error | null
}