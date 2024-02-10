import { NewTableOptions, TableSliceInitialState, UpdatedTableOptions } from "@/types/table";
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

export const updateTable = createAsyncThunk("tableSlice/updateTable" , async( options : UpdatedTableOptions , thunkApi ) => {
    const { id , name , locationId , onError , onSuccess } = options;
    try {
        const response = await fetch(`${config.apiBaseUrl}/table` , {
            method : "PUT",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({ id , name , locationId })
        });
        const { table } = await response.json();
        thunkApi.dispatch(replaceTable(table));
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
        },
        replaceTable : (state , action : PayloadAction<Table>) => {
            state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item );
        }
    }
})

export const { setTables , addTable , replaceTable } = tableSlice.actions;

export default tableSlice.reducer;