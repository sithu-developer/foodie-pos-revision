import { AddonCategorySliceInitialState, NewAddonCategoryOptions, UpdatedAddonCategoryOptions } from "@/types/addonCategory";
import { config } from "@/util/config";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuAddonCategories, replaceMenuAddonCategories } from "./menuAddonCategory";

const initialState :  AddonCategorySliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const createAddonCategory = createAsyncThunk("addonCategorySlice/createAddonCategory" , async( options : NewAddonCategoryOptions , thunkApi ) => {
    const { name , optional , menuIds , onError , onSuccess} = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addonCategory` , {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , optional , menuIds })
        });
        const { addonCategory , menuAddonCategories } = await response.json();
        thunkApi.dispatch(addAddonCategory(addonCategory));
        thunkApi.dispatch(addMenuAddonCategories(menuAddonCategories));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
});

export const updateAddonCategory = createAsyncThunk("addonCategorySlice/updateAddonCategory" , async( options : UpdatedAddonCategoryOptions , thunkApi) => {
    const { id , menuIds , name , optional , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/addonCategory` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , menuIds , name , optional })
        });
        const { addonCategory , menuAddonCategories } = await response.json();
        thunkApi.dispatch(replaceAddonCategory(addonCategory));
        thunkApi.dispatch(replaceMenuAddonCategories(menuAddonCategories));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

const addonCategorySlice = createSlice({
    name : "addonCategorySlice",
    initialState ,
    reducers : {
        setAddonCategories : (state , action : PayloadAction<AddonCategory[]>) => {
            state.items = action.payload;
        },
        addAddonCategory : ( state , action : PayloadAction<AddonCategory>) => {
            state.items = [...state.items , action.payload ]
        },
        replaceAddonCategory : ( state , action : PayloadAction<AddonCategory>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setAddonCategories , addAddonCategory , replaceAddonCategory } = addonCategorySlice.actions;

export default addonCategorySlice.reducer;