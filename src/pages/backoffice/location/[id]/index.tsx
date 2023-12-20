import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteLocation, updateLocation } from "@/store/slices/location";
import { UpdateLocationOptions } from "@/types/location";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetailPage = () => {
    const router = useRouter();
    const currentLocationId = Number(router.query.id);
    const locations = useAppSelector(state => state.location.items);
    const currentLocation = locations.find(item => item.id === currentLocationId);
    const [updatedLocation , setUpdatedLocation] = useState<UpdateLocationOptions>();
    const dispatch = useAppDispatch();
    const [open , setOpen ] = useState<boolean>(false)

    useEffect(() => {
        if(currentLocation) {
            setUpdatedLocation(currentLocation);
        }
    } , [currentLocation])

    if(!currentLocation || !updatedLocation) return null;

    const handleUpdateLocation = () => {
        dispatch(updateLocation({...updatedLocation , onSuccess : () => router.push("/backoffice/location")}));
    }

    const handleDeleteLocation = () => {
        dispatch(deleteLocation({ id : currentLocation.id , onSuccess : () => router.push("/backoffice/location")}));
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">{currentLocation.name}</Typography>
                <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete</Button>
            </Box>
            <TextField defaultValue={currentLocation.name} onChange={(event) => setUpdatedLocation({...updatedLocation , name : event.target.value})} />
            <TextField defaultValue={currentLocation.street} onChange={(event) => setUpdatedLocation({...updatedLocation , street : event.target.value})} />
            <TextField defaultValue={currentLocation.township} onChange={(event) => setUpdatedLocation({...updatedLocation , township : event.target.value})} />
            <TextField defaultValue={currentLocation.city} onChange={(event) => setUpdatedLocation({...updatedLocation , city : event.target.value})} />
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/location")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateLocation}>Update</Button>
            </Box>
            <DeleteComfirmation open={open} setOpen={setOpen} itemName="Location !" handleDeleteFunction={handleDeleteLocation} />
        </Box>
    )
} 

export default LocationDetailPage;