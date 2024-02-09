import { NewTableOptions, TableSliceInitialState } from "@/types/table";
import { config } from "@/util/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState :    TableSliceInitialState = {
    items : [],
    isLoading : false ,
    error : null
}

export const createTable = createAsyncThunk("tableSlice/createTable" , async( options : NewTableOptions , thunkApi ) => {
    const { name , locationId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/table` , {
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ name , locationId })
        });
        const { table } = await response.json();
        thunkApi.dispatch(addTable(table));
        onSuccess && onSuccess();
    } catch(err) {
        onError && onError();
    }
})

const tableSlice = createSlice({
    name : "tableSlice",
    initialState ,
    reducers : {
        setTables : (state , action : PayloadAction<Table[]>) => {
            state.items = action.payload;
        },
        addTable : (state , action : PayloadAction<Table>) => {
            state.items = [...state.items , action.payload ];
        }
    }
})

export const { setTables , addTable } = tableSlice.actions;

export default tableSlice.reducer;