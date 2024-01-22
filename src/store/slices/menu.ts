import { CreateMenuOptions, MenuSliceInitialState } from "@/types/menu";
import { config } from "@/util/config";
import { Menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenuCategoryMenus } from "./menuCategoryMenu";

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

const menuSlice = createSlice({
    name : "menuSlice",
    initialState ,
    reducers : {
        setMenus : (state , action : PayloadAction<Menu[]>) => {
            state.items = action.payload;
        },
        addMenu : (state , action : PayloadAction<Menu>) => {
            state.items = [...state.items , action.payload ]
        }
    }
})

export const { setMenus , addMenu } = menuSlice.actions;

export default menuSlice.reducer;