import { MenuCategorySliceInitialState, NewMenuCategoryOptions, UpdateMenuCateogryOptions } from "@/types/menuCategory";
import { config } from "@/util/config";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuCategorySliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const updateMenuCategory = createAsyncThunk("menuCategorySlice/updateMenuCategory" , async(options : UpdateMenuCateogryOptions , thunkApi) => {
    const {id , name , onError , onSuccess } = options;
    try{
        const response = await fetch(`${config.apiBaseUrl}/menuCategory?id=${id}` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name })
        })
        const { updatedMenuCategory } = await response.json();
        thunkApi.dispatch(replaceMenuCategory(updatedMenuCategory))
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }   
})

export const createMenuCategory = createAsyncThunk("menuCategorySlice/createMenuCategory" , async( options : NewMenuCategoryOptions ) => {
    const { name , available , selectedLocationId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menuCategory` , { 
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , available , selectedLocationId })
        });
        const {} = await response.json();
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

const menuCategorySlice = createSlice({
    name : "menuCategorySlice",
    initialState ,
    reducers : {
        setMenuCategories : (state , action : PayloadAction<MenuCategory[]>) => {
            state.items = action.payload;
        },
        replaceMenuCategory : (state , action : PayloadAction<MenuCategory>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setMenuCategories , replaceMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;