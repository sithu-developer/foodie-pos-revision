import { MenuCategorySliceInitialState, NewMenuCategoryOptions, UpdatedMenuCateogryOptions } from "@/types/menuCategory";
import { config } from "@/util/config";
import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDisabledLocationMenuCategories, preRemoveDisabledLcoatonMenuCategoriesWithMenuCategoryId, replaceDisabledLocationMenuCategories } from "./disabledLocationMenuCategory";

const initialState :  MenuCategorySliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const updateMenuCategory = createAsyncThunk("menuCategorySlice/updateMenuCategory" , async(options : UpdatedMenuCateogryOptions , thunkApi) => {
    const {id , name , availabledLocationIds , onError , onSuccess } = options;
    try{
        const response = await fetch(`${config.apiBaseUrl}/menuCategory?id=${id}` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name , availabledLocationIds })
        })
        const { updatedMenuCategory , disabledLocationMenuCategories } = await response.json();
        thunkApi.dispatch(replaceMenuCategory(updatedMenuCategory));
        thunkApi.dispatch(preRemoveDisabledLcoatonMenuCategoriesWithMenuCategoryId(id));
        thunkApi.dispatch(replaceDisabledLocationMenuCategories(disabledLocationMenuCategories));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }   
})

export const createMenuCategory = createAsyncThunk("menuCategorySlice/createMenuCategory" , async( options : NewMenuCategoryOptions , thunkApi ) => {
    const { name , availabledLocationIds , selectedLocationId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menuCategory` , { 
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , availabledLocationIds , selectedLocationId })
        });
        const { newMenuCategory , disabledLocationMenuCategories } = await response.json();
        thunkApi.dispatch(addMenuCategory(newMenuCategory) );
        thunkApi.dispatch(addDisabledLocationMenuCategories(disabledLocationMenuCategories));
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
        },
        addMenuCategory : (state , action : PayloadAction<MenuCategory> ) => {
            state.items = [... state.items , action.payload ];
        }
    }
})

export const { setMenuCategories , replaceMenuCategory , addMenuCategory } = menuCategorySlice.actions;

export default menuCategorySlice.reducer;