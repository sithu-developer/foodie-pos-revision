import { MenuCategorySliceInitialState } from "@/types/menuCategory";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuCategorySliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const menuCategorySlice = createSlice({
    name : "menuCategorySlice",
    initialState ,
    reducers : {
        setMenuCategories : (state , action : PayloadAction<MenuCategory[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setMenuCategories } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;