import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCompany } from "@/store/slices/company";
import { UpdateCompanyOptions } from "@/types/company";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";


const SettingPage = () => {
    const company = useAppSelector(store => store.company.item);
    const [updatedCompany , setUpdatedCompany ] = useState<UpdateCompanyOptions>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(company) {
            setUpdatedCompany(company);
        }
    } , [company])

    if(!company || !updatedCompany) return null;

    const handleUpdateCompany = () => {
        dispatch(updateCompany( {...updatedCompany} ));
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <TextField defaultValue={company.name} onChange={(event) => setUpdatedCompany({...updatedCompany , name : event.target.value}) } />
            <TextField defaultValue={company.street} onChange={(event) => setUpdatedCompany({...updatedCompany , street : event.target.value}) } />
            <TextField defaultValue={company.township} onChange={(event) => setUpdatedCompany({...updatedCompany , township : event.target.value}) } />
            <TextField defaultValue={company.city} onChange={(event) => setUpdatedCompany({...updatedCompany , city : event.target.value}) } />
            <Button variant="contained" sx={{width : "fit-content"}} onClick={handleUpdateCompany}>Update</Button>
        </Box>
    )
}

export default SettingPage;