import { AppInitialState } from "@/types/app";
import { config } from "@/util/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./user";
import { setCompany } from "./company";
import { setLocations } from "./location";
import { setMenuCategories } from "./menuCategory";
import { setMenus } from "./menu";
import { setMenuCategoryMenus } from "./menuCategoryMenu";
import { setAddonCategories } from "./addonCategory";
import { setMenuAddonCategories } from "./menuAddonCategory";
import { setAddons } from "./addon";
import { setTables } from "./table";
import { setDisabledLocationMenuCategories } from "./disabledLocationMenuCategory";

export const appFetch = createAsyncThunk("appSlice/appFetch" , async ( _ , thunkApi ) => {
    try {
        const response = await fetch(`${config.apiBaseUrl}/app`);
        const {
            user ,
            company  , 
            locations ,
            disabledLocationMenuCategories,
            menuCategories  ,
            menus ,
            menuCategoryMenus,
            addonCategories,
            menuAddonCategories ,
            addons ,
            tables 
          } = await response.json();
        thunkApi.dispatch(setInit(true));
        thunkApi.dispatch(setUser(user));
        thunkApi.dispatch(setCompany(company));
        thunkApi.dispatch(setLocations(locations));
        thunkApi.dispatch(setDisabledLocationMenuCategories(disabledLocationMenuCategories));
        thunkApi.dispatch(setMenuCategories(menuCategories));
        thunkApi.dispatch(setMenus(menus));
        thunkApi.dispatch(setMenuCategoryMenus(menuCategoryMenus));
        thunkApi.dispatch(setAddonCategories(addonCategories));
        thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
        thunkApi.dispatch(setAddons(addons));
        thunkApi.dispatch(setTables(tables));
    } catch (err) {
        console.log(err)
    }
})


const initialState : AppInitialState = {
    inited : false,
    isLoading : false,
    error : null
}

const appSlice = createSlice({
    name : "appSlice",
    initialState , 
    reducers : {
        setInit : (state , action : PayloadAction<boolean>) => {
            state.inited = action.payload;
        }
    }
});

export const {setInit} = appSlice.actions;

export default appSlice.reducer;