import { MenuCategoryMenuSliceInitialState } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuCategoryMenuSliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

const menuCategoryMenuSlice = createSlice({
    name : "menuCategoryMenuSlice",
    initialState ,
    reducers : {
        setMenuCategoryMenus : (state , action : PayloadAction<MenuCategoryMenu[]>) => {
            state.items = action.payload;
        },
        addMenuCategoryMenus : (state , action : PayloadAction<MenuCategoryMenu[]>) => {
            state.items = [...action.payload , ...state.items];
        }
    }
})

export const { setMenuCategoryMenus , addMenuCategoryMenus } = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;