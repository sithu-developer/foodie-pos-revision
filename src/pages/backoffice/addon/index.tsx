import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import EggIcon from '@mui/icons-material/Egg';
import { useState } from "react";
import NewAddon from "@/components/NewAddon";


const AddonPage = () => {
    const allAddons = useAppSelector(store => store.addon.items);
    const addons = allAddons.filter(item => !item.isArchived);
    const [ open , setOpen ] = useState<boolean>(false);

    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , mb : "20px"}}>
                <Typography variant="h4">Addons</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
                {addons.map(item => <ItemCart key={item.id} name={item.name} icon={<EggIcon />} href={`/backoffice/addon/${item.id}`} />)}
            </Box>
            <NewAddon open={open} setOpen={setOpen} />
        </Box>
    )
}

export default AddonPage;