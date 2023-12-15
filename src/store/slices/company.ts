import { CompanySliceInitialState } from "@/types/company";
import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState :  CompanySliceInitialState = {
    item : null,
    isLoading : false ,
    error : null
}

const companySlice = createSlice({
    name : "companySlice",
    initialState ,
    reducers : {
        setCompany : (state , action : PayloadAction<Company>) => {
            state.item = action.payload;
        }
    }
})

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;