import { CreateLocationOptions, LocationSliceInitialState } from "@/types/location";
import { config } from "@/util/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState :  LocationSliceInitialState = {
    items : [],
    selectedLocationId : null,
    isLoading : false ,
    error : null
}

export const createLocation = createAsyncThunk("locationSlice/createLocation" , async( options : CreateLocationOptions , thunkApi) => {
    const { name , street , township , city , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/location`, {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , street , township , city })
        });
        const { location } = await response.json();
        thunkApi.dispatch(addLocation( location ));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

const locationSlice = createSlice({
    name : "locationSlice",
    initialState ,
    reducers : {
        setLocations : (state , action : PayloadAction<Location[]>) => {
            state.items = action.payload;
            state.selectedLocationId = action.payload[0].id;
        },
        changeSelectedLocationId : (state , action : PayloadAction<number>) => {
            state.selectedLocationId = action.payload;
        },
        addLocation : (state , action : PayloadAction<Location>) => {
            state.items = [...state.items , action.payload];
        }
    }
})

export const { setLocations , changeSelectedLocationId , addLocation } = locationSlice.actions;

export default locationSlice.reducer;