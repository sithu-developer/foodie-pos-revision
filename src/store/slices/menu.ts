import { MenuSliceInitialState } from "@/types/menu";
import { Menu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  MenuSliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const menuSlice = createSlice({
    name : "menuSlice",
    initialState ,
    reducers : {
        setMenus : (state , action : PayloadAction<Menu[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setMenus } = menuSlice.actions;

export default menuSlice.reducer;