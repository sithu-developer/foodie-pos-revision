import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Paper, Typography } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';
import { useState } from "react";
import NewMenuCategoryLayout from "@/components/NewMenuCategory";


const MenuCategories = () => {
    const menuCategories = useAppSelector(store => store.menuCategory.items);
    const [open , setOpen ] = useState<boolean>(false)

    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">Menu Categories</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "10px"}}>
                {menuCategories.map(item => <ItemCart key={item.id} href={`/backoffice/menu-category/${item.id}`} icon={<CategoryIcon/>} name={item.name} />)}
            </Box>
            <NewMenuCategoryLayout open={open} setOpen={setOpen} />
        </Box>
    )
}

export default MenuCategories;