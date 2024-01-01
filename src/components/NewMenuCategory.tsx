import { useAppDispatch } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategory";
import { NewMenuCategoryOptions } from "@/types/menuCategory";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, TextField } from "@mui/material"
import { useState } from "react";

interface Props {
   open : boolean;
   setOpen : (value : any) => void; 
}

const defaultMenuCategory : NewMenuCategoryOptions = {
    name : "" , available : true
}

const NewMenuCategoryLayout = ( { open , setOpen } : Props) => {
    const [newMenuCategory , setNewMenuCategory ] = useState<NewMenuCategoryOptions>(defaultMenuCategory);
    const dispatch = useAppDispatch();

    const handleCreateMenuCategory = () => {
        dispatch(createMenuCategory({ ... newMenuCategory , selectedLocationId : Number(localStorage.getItem("selectedLocationId")) }))
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewMenuCategory(defaultMenuCategory);
        } }>
            <DialogTitle>New Menu Category</DialogTitle>
            <DialogContent sx={{display : "flex" , flexDirection : "column" , gap : "20px" , minWidth : "300px"}}>
                <TextField onChange={(event) => setNewMenuCategory({ ...newMenuCategory , name : event.target.value })} placeholder="name"/>
                <FormControlLabel control={<Switch defaultChecked />} label="Available" onChange={(event , value) => setNewMenuCategory({...newMenuCategory , available : value }) } />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewMenuCategory(defaultMenuCategory);
                }}>Cancel</Button>
                <Button variant="contained" disabled={newMenuCategory.name.length === 0} onClick={handleCreateMenuCategory}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewMenuCategoryLayout;