import { CreateLocationOptions, DeleteLocationOptions, DeleteLocationPermanentlyOptions, LocationSliceInitialState, RestoreLocationOptions, UpdateLocationOptions } from "@/types/location";
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

export const updateLocation = createAsyncThunk("locationSlice/updateLocation" , async( options : UpdateLocationOptions , thunkApi) => {
    const { id , name , street , township , city , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/location` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name , street , township , city })
        });
        const { updatedLocation } = await response.json();
        thunkApi.dispatch(replaceLocation( updatedLocation ))
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

export const restoreLocation = createAsyncThunk("locationSlice/restoreLocation" , async( options : RestoreLocationOptions , thunkApi) => {
    const { id , isRestore ,  onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/location` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , isRestore })
        });
        const { updatedLocation } = await response.json();
        thunkApi.dispatch(replaceLocation( updatedLocation ))
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

export const deleteLocation = createAsyncThunk("locationSlice/deleteLocation" , async( options : DeleteLocationOptions , thunkApi) => {
    const { id , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/location?id=${id}` , {
            method : "DELETE",
        });
        const { deletedLocation } = await response.json();
        thunkApi.dispatch(replaceLocation(deletedLocation));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

export const deleteLocationPermanently = createAsyncThunk("locationSlice/deleteLocationPermanently" , async( options : DeleteLocationPermanentlyOptions , thunkApi) => {
    const { id ,isPermanent , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/location?id=${id}` , {
            method : "DELETE",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ isPermanent })
        });
        const { permanentlyDeletedLocation } = await response.json();
        thunkApi.dispatch(removeLocation(permanentlyDeletedLocation));
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
            const selectedLocationId = Number(localStorage.getItem("selectedLocationId"));
            if(selectedLocationId) {
                state.selectedLocationId = selectedLocationId;
            } else {
                state.selectedLocationId = action.payload[0].id;
                localStorage.setItem("selectedLocationId", String(action.payload[0].id))
            }
        },
        changeSelectedLocationId : (state , action : PayloadAction<number>) => {
            state.selectedLocationId = action.payload;
        },
        addLocation : (state , action : PayloadAction<Location>) => {
            state.items = [...state.items , action.payload];
        },
        replaceLocation : (state , action : PayloadAction<Location>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        },
        removeLocation : (state , action : PayloadAction<Location>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { setLocations , changeSelectedLocationId , addLocation , replaceLocation , removeLocation } = locationSlice.actions;

export default locationSlice.reducer;