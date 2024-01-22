import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Paper, Typography } from "@mui/material"
import CategoryIcon from '@mui/icons-material/Category';
import { useState } from "react";
import NewMenuCategoryLayout from "@/components/NewMenuCategory";


const MenuCategories = () => {
    const allMenuCategories = useAppSelector(store => store.menuCategory.items);
    const menuCategories = allMenuCategories.filter(item => !item.isArchived );
    const [open , setOpen ] = useState<boolean>(false);
    const disabledLocationMenuCategories = useAppSelector(store => store.disabledLocationMenuCategory.items);


    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4">Menu Categories</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "20px" , mt : "10px"}}>
                {menuCategories.map(menuCategory => {
                    const selectedLocationId = Number(localStorage.getItem("selectedLocationId"));
                    const disabledLocationMenuCategoriesForCurrentMenuCategory = disabledLocationMenuCategories.filter(item => item.menuCategoryId === menuCategory.id)
                    const disabledLocationIds = disabledLocationMenuCategoriesForCurrentMenuCategory.map(item => item.locationId);
                    const opacity = disabledLocationIds.includes(selectedLocationId) ? 0.5 : 1;
                    return (
                        <ItemCart opacity={opacity} key={menuCategory.id} href={`/backoffice/menu-category/${menuCategory.id}`} icon={<CategoryIcon/>} name={menuCategory.name} />
                    )
                })}
            </Box>
            <NewMenuCategoryLayout open={open} setOpen={setOpen} />
        </Box>
    )
}

export default MenuCategories;