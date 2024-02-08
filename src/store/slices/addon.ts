import { AddonSliceInitialState, NewAddonOptions, UpdatedAddonOptions } from "@/types/addon";
import { config } from "@/util/config";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState :    AddonSliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const createAddon = createAsyncThunk("addonSlice/createAddon" , async( options : NewAddonOptions , thunkApi ) => {
    const { name , addonCategoryId , price , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addon` , {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , addonCategoryId , price })
        });
        const { addon } = await response.json();
        thunkApi.dispatch(addAddon(addon));
        onSuccess &&  onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateAddon = createAsyncThunk("addonSlice/updateAddon" , async( options : UpdatedAddonOptions , thunkApi ) => {
    const { id , name , addonCategoryId , price , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addon` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name , addonCategoryId , price })
        });
        const { addon } = await response.json();
        thunkApi.dispatch(replaceAddon(addon));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

const addonSlice = createSlice({
    name : "addonSlice",
    initialState ,
    reducers : {
        setAddons : (state , action : PayloadAction<Addon[]>) => {
            state.items = action.payload;
        },
        addAddon : (state , action : PayloadAction<Addon>) => {
            state.items = [...state.items , action.payload ];
        },
        replaceAddon : ( state , action : PayloadAction<Addon>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setAddons , addAddon , replaceAddon } = addonSlice.actions;

export default addonSlice.reducer;