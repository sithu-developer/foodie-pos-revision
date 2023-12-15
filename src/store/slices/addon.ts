import { AddonSliceInitialState } from "@/types/addon";
import { Addon } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :    AddonSliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const addonSlice = createSlice({
    name : "addonSlice",
    initialState ,
    reducers : {
        setAddons : (state , action : PayloadAction<Addon[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setAddons } = addonSlice.actions;

export default addonSlice.reducer;