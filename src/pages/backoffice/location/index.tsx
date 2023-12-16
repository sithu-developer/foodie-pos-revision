import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NewLocationLayout from "@/components/NewLocation";
import { useState } from "react";

const LocationPage = () => {
    const locations = useAppSelector(state => state.location.items);
    const [ open , setOpen ] = useState<boolean>(false)

    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">Locations</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "20px"}}>
                {locations.map(item => <ItemCart key={item.id} id={item.id} fromLocationPage={true} name={item.name} icon={<LocationOnIcon/>} />)}
            </Box>
            <NewLocationLayout open={open} setOpen={setOpen} />
        </Box>
    )
}

export default LocationPage;