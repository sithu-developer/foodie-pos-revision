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
        },
        replaceMenuCategoryMenus : (state , action : PayloadAction<MenuCategoryMenu[]>) => {
            state.items = state.items.filter(item => item.menuId !== action.payload[0].menuId );
            state.items = [...state.items , ...action.payload ];
        }
    }
})

export const { setMenuCategoryMenus , addMenuCategoryMenus , replaceMenuCategoryMenus } = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;