import { UserSliceInitialState } from "@/types/user";
import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState : UserSliceInitialState = {
    item : null,
    isLoading : false ,
    error : null
}

const userSlice = createSlice({
    name : "userSlice",
    initialState ,
    reducers : {
        setUser : (state , action : PayloadAction<User>) => {
            state.item = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;