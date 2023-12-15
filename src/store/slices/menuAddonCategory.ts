import { MenuAddonCategorySliceInitialState } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuAddonCategorySliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const menuAddonCategorySlice = createSlice({
    name : "menuAddonCategorySlice",
    initialState ,
    reducers : {
        setMenuAddonCategories : (state , action : PayloadAction<MenuAddonCategory[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setMenuAddonCategories } = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;