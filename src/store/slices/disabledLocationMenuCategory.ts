import { DisabledLocationMenuCategorySliceInitialState } from "@/types/disabledLocationMenuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  DisabledLocationMenuCategorySliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

const disabledLocationMenuCategorySlice = createSlice({
    name : "disabledLocationMenuCategorySlice",
    initialState ,
    reducers : {
        setDisabledLocationMenuCategories : (state , action : PayloadAction<DisabledLocationMenuCategory[]>) => {
            state.items = action.payload;
        },
        addDisabledLocationMenuCategories : (state , action : PayloadAction<DisabledLocationMenuCategory[]>) => {
            state.items = [ ...state.items , ...action.payload ]
        },
        replaceDisabledLocationMenuCategories : (state , action : PayloadAction<DisabledLocationMenuCategory[]>) => {
            state.items = [...state.items , ...action.payload];
        },
        preRemoveDisabledLcoatonMenuCategoriesWithMenuCategoryId : (state , action : PayloadAction<number>) => { // this action is for preRemove of replaceDisabled
            state.items = state.items.filter(item => item.menuCategoryId !== action.payload);
        }
    }
})

export const { setDisabledLocationMenuCategories , addDisabledLocationMenuCategories , replaceDisabledLocationMenuCategories , preRemoveDisabledLcoatonMenuCategoriesWithMenuCategoryId } = disabledLocationMenuCategorySlice.actions;

export default disabledLocationMenuCategorySlice.reducer;