import { AddonCategorySliceInitialState } from "@/types/addonCategory";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  AddonCategorySliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const addonCategorySlice = createSlice({
    name : "addonCategorySlice",
    initialState ,
    reducers : {
        setAddonCategories : (state , action : PayloadAction<AddonCategory[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setAddonCategories } = addonCategorySlice.actions;

export default addonCategorySlice.reducer;