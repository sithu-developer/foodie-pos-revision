import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { UpdatedMenuOptions } from "@/types/menu";
import { Box, Button, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetailPage = () => {
    const router = useRouter();
    const allMenus = useAppSelector(store => store.menu.items);
    const menus = allMenus.filter(item => !item.isArchived);
    const menuCategoryMenus = useAppSelector(store => store.menuCategoryMenu.items);
    const allMenuCategories = useAppSelector(store => store.menuCategory.items);
    const menuCategories = allMenuCategories.filter(item => !item.isArchived);
    const [updatedMenu , setUpdatedMenu ] = useState<UpdatedMenuOptions>();
    const currentMenu = menus.find(item => item.id === Number(router.query.id)) as Menu;

    useEffect(() => {
        if(allMenus.length) {
          const menuCategoryIds = menuCategoryMenus.filter(item => item.menuId === currentMenu.id).map(item => item.menuCategoryId);
          setUpdatedMenu({...currentMenu , menuCategoryIds});
        } 
    } , [allMenus]);

    if(!updatedMenu || !menuCategories) return null;

    const handleUpdateMenu = () => {
      //here
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">{currentMenu.name}</Typography>
                <Button variant="outlined" color="error" >Delete</Button>
            </Box>
            <TextField defaultValue={updatedMenu.name} onChange={(evt) => setUpdatedMenu({...updatedMenu , name : evt.target.value })} />
            <TextField defaultValue={updatedMenu.price} onChange={(evt) => setUpdatedMenu({...updatedMenu , price : Number(evt.target.value) })} />
            <TextField defaultValue={updatedMenu.detail} onChange={(evt) => setUpdatedMenu({...updatedMenu , detail : evt.target.value })} />
            <FormControl>
                <InputLabel sx={{ bgcolor : "white"}}>Available for (locations) </InputLabel>
                <Select
                  multiple
                  label="Available for (locations) "
                  value={updatedMenu.menuCategoryIds}
                  onChange={(event) => setUpdatedMenu({...updatedMenu , menuCategoryIds : event.target.value as number[]})}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "5px"}}>{
                    selected.map(item => {
                        const menuCategory = menuCategories.find(menuCategory => menuCategory.id === item);
                        if(menuCategory) return <Chip key={menuCategory.id} label={menuCategory.name} />
                    })
                    }</Box>
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 18 ,
                        width: 250,
                      },
                    },
                  }}
                >
                  {menuCategories.map(value => (
                    <MenuItem key={value.id} value={value.id}>
                      <Checkbox checked={updatedMenu.menuCategoryIds.includes(value.id)} />
                      <ListItemText primary={value.name} />
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/menu")}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdateMenu}>Update</Button>
            </Box>
        </Box>
    )
};

export default MenuDetailPage;