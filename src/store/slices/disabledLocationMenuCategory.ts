import { DisabledLocationMenuCategorySliceInitialState } from "@/types/disabledLocationMenuCategory";
import { DisabledLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  DisabledLocationMenuCategorySliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const disabledLocationMenuCategorySlice = createSlice({
    name : "disabledLocationMenuCategorySlice",
    initialState ,
    reducers : {
        setDisabledLocationMenuCategories : (state , action : PayloadAction<DisabledLocationMenuCategory[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setDisabledLocationMenuCategories } = disabledLocationMenuCategorySlice.actions;

export default disabledLocationMenuCategorySlice.reducer;