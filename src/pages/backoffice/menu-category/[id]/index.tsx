import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategory";
import { Box, Button, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetailPage = () => {
    const router = useRouter()
    const menuCategoryId = Number(router.query.id);
    const menuCategories = useAppSelector(store => store.menuCategory.items);
    const currentMenuCategory = menuCategories.find(item => item.id === menuCategoryId);
    const [updatedMenuCategoryName , setUpdatedMenuCategoryName ] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(currentMenuCategory) {
            setUpdatedMenuCategoryName(currentMenuCategory.name);
        }
    } , [currentMenuCategory]);

    if(!currentMenuCategory) return null;

    const handleUpdateMenuCategory = () => {
        dispatch(updateMenuCategory({ id : menuCategoryId , name : updatedMenuCategoryName , onSuccess : () => router.push("/backoffice/menu-category") }));
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">{currentMenuCategory.name} Detail Page</Typography>
                <Button variant="outlined"  color="error">Delete</Button>
            </Box>
            <TextField defaultValue={currentMenuCategory.name} onChange={( event ) => setUpdatedMenuCategoryName(event.target.value)} />
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/menu-category")}>Cancel</Button>
                <Button variant="contained" disabled={updatedMenuCategoryName.length === 0} onClick={handleUpdateMenuCategory}>Update</Button>
            </Box>
        </Box>
    )
}

export default MenuCategoryDetailPage;