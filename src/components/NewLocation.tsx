import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/location";
import { CreateLocationOptions } from "@/types/location";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";

interface Props {
   open : boolean;
   setOpen : (value : any) => void; 
}

const defaultLocation : CreateLocationOptions = {
    name : "" , city : "" , street : "" , township : ""
}

const NewLocationLayout = ( { open , setOpen } : Props) => {
    const [newLocation , setNewLocation ] = useState<CreateLocationOptions>(defaultLocation);
    const dispatch = useAppDispatch();

    const handleCreateLocation = () => {
        dispatch(createLocation({ ... newLocation , onSuccess : () => setOpen(false) }))
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewLocation(defaultLocation);
        }}>
            <DialogTitle>New Location</DialogTitle>
            <DialogContent sx={{display : "flex" , flexDirection : "column" , gap : "20px" , width : "400px"}}>
                <TextField onChange={(event) => setNewLocation({ ...newLocation , name : event.target.value })} placeholder="name" />
                <TextField onChange={(event) => setNewLocation({ ...newLocation , street : event.target.value })} placeholder="street" />
                <TextField onChange={(event) => setNewLocation({ ...newLocation , township : event.target.value })} placeholder="township" />
                <TextField onChange={(event) => setNewLocation({ ...newLocation , city : event.target.value })} placeholder="city" />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewLocation(defaultLocation);
                }}>Cancel</Button>
                <Button variant="contained" disabled={newLocation.name === "" || newLocation.street === "" || newLocation.township === "" || newLocation.city === ""} onClick={handleCreateLocation}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewLocationLayout;