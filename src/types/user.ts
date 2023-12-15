import { User } from "@prisma/client";

export interface UserSliceInitialState {
    item : User | null ,
    isLoading : boolean,
    error : Error | null
}