import { MenuCategoryMenuSliceInitialState } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuCategoryMenuSliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const menuCategoryMenuSlice = createSlice({
    name : "menuCategoryMenuSlice",
    initialState ,
    reducers : {
        setMenuCategoryMenus : (state , action : PayloadAction<MenuCategoryMenu[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setMenuCategoryMenus } = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;