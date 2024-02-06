import { CreateMenuOptions, MenuSliceInitialState, UpdateMenuOptions } from "@/types/menu";
import { config } from "@/util/config";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategoryMenus, replaceMenuCategoryMenus } from "./menuCategoryMenu";

const initialState :  MenuSliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const createMenu = createAsyncThunk("menuSlice/createMenu" , async( options : CreateMenuOptions , thunkApi) => {
    const {name , detail , price , menuCategoryIds , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menu` , {
            method : "POST" , 
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , detail , price , menuCategoryIds })
        });
        const { newMenu , menuCategoryMenus } = await response.json();
        thunkApi.dispatch(addMenu( newMenu ));
        thunkApi.dispatch(addMenuCategoryMenus(menuCategoryMenus));
        onSuccess && onSuccess();
    } catch (err) {
        onError && onError();
    }
})

export const updateMenu = createAsyncThunk("menuSlice/updateMenu" , async( options : UpdateMenuOptions , thunkApi ) => {
    const { id , menuCategoryIds , name , detail , price , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/menu` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , menuCategoryIds , name , detail , price })
        });
        const { updatedMenu , updatedMenuCategoryMenus } = await response.json();
        thunkApi.dispatch(replaceMenu( updatedMenu ));
        thunkApi.dispatch(replaceMenuCategoryMenus(updatedMenuCategoryMenus));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

const menuSlice = createSlice({
    name : "menuSlice",
    initialState ,
    reducers : {
        setMenus : (state , action : PayloadAction<Menu[]>) => {
            state.items = action.payload;
        },
        addMenu : (state , action : PayloadAction<Menu>) => {
            state.items = [...state.items , action.payload ]
        },
        replaceMenu : (state , action : PayloadAction<Menu>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setMenus , addMenu , replaceMenu } = menuSlice.actions;

export default menuSlice.reducer;