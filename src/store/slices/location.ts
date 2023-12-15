import { LocationSliceInitialState } from "@/types/location";
import { Location } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  LocationSliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const locationSlice = createSlice({
    name : "locationSlice",
    initialState ,
    reducers : {
        setLocations : (state , action : PayloadAction<Location[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setLocations } = locationSlice.actions;

export default locationSlice.reducer;