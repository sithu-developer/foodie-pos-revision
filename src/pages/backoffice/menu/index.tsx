import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useState } from "react";
import NewMenu from "@/components/NewMenu";


const MenuPage = () => {
    const [open , setOpen] = useState<boolean>(false);
    const allMenus = useAppSelector(store => store.menu.items);
    const menus = allMenus.filter(item => !item.isArchived);
    
    
    return (
        <Box>
            <Box sx={{display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4">Menu Page</Typography>
                <Button variant="contained" onClick={() => setOpen(true)} >Create Menu</Button>
            </Box>
            <Box sx={{ mt : "20px" , display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
                {menus.map(item => <ItemCart key={item.id} name={item.name} icon={<RestaurantMenuIcon/>} href={`/backoffice/menu/${item.id}`} />)}
            </Box>
            <NewMenu open={open} setOpen={setOpen} />
        </Box>
    )
}

export default MenuPage;