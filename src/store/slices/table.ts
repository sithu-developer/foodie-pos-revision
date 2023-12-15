import { TableSliceInitialState } from "@/types/table";
import { Table } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :    TableSliceInitialState = {
    item : [],
    isLoading : false ,
    error : null
}

const tableSlice = createSlice({
    name : "tableSlice",
    initialState ,
    reducers : {
        setTables : (state , action : PayloadAction<Table[]>) => {
            state.item = action.payload;
        }
    }
})

export const { setTables } = tableSlice.actions;

export default tableSlice.reducer;