import { MenuAddonCategorySliceInitialState } from "@/types/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuAddonCategorySliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

const menuAddonCategorySlice = createSlice({
    name : "menuAddonCategorySlice",
    initialState ,
    reducers : {
        setMenuAddonCategories : (state , action : PayloadAction<MenuAddonCategory[]>) => {
            state.items = action.payload;
        },
        addMenuAddonCategories : (state , action : PayloadAction<MenuAddonCategory[]>) => {
            state.items = [ ...state.items , ...action.payload ];
        },
        replaceMenuAddonCategories : (state , action : PayloadAction<MenuAddonCategory[]>) => {
            state.items = state.items.filter(item => item.addonCategoryId !== action.payload[0].addonCategoryId);
            state.items = [...state.items , ...action.payload ]
        }
    }
})

export const { setMenuAddonCategories , addMenuAddonCategories , replaceMenuAddonCategories } = menuAddonCategorySlice.actions;

export default menuAddonCategorySlice.reducer;