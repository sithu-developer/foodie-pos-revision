import DeleteComfirmation from "@/components/DeleteComfirmation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategory";
import { UpdatedMenuCateogryOptions } from "@/types/menuCategory";
import { Box, Button, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { Location } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetailPage = () => {
    const router = useRouter()
    const menuCategoryId = Number(router.query.id);
    const menuCategories = useAppSelector(store => store.menuCategory.items);
    const currentMenuCategory = menuCategories.find(item => item.id === menuCategoryId);
    const [updatedMenuCategory , setUpdatedMenuCategory ] = useState<UpdatedMenuCateogryOptions>();
    const dispatch = useAppDispatch();
    const allLocations = useAppSelector(state => state.location.items);
    const locations = allLocations.filter(item => !item.isArchived ); // *** cannot use as useEffect's Dependency
    const disabledLocationMenuCategories = useAppSelector(store => store.disabledLocationMenuCategory.items);
    const [openComfirmation , setOpenComfirmation ] = useState<boolean>(false);

    useEffect(() => {
        if(currentMenuCategory && disabledLocationMenuCategories && menuCategoryId && locations ) {
            const currentDisabledLocationMenuCategories = disabledLocationMenuCategories.filter(item => item.menuCategoryId === menuCategoryId)
            const currentDisabledLocationIds = currentDisabledLocationMenuCategories.map(item => item.locationId);
            const currentAvailabledLocationIds = locations.filter(item => !currentDisabledLocationIds.includes(item.id)).map(item => item.id);
            setUpdatedMenuCategory({ id : menuCategoryId , name : currentMenuCategory.name , availabledLocationIds : currentAvailabledLocationIds });
        }
    } , [ currentMenuCategory , menuCategoryId , disabledLocationMenuCategories , allLocations ]);

    if(!currentMenuCategory || !updatedMenuCategory ) return null;

    const handleUpdateMenuCategory = () => {
      dispatch(updateMenuCategory({ ...updatedMenuCategory 
          ,onSuccess : () => router.push("/backoffice/menu-category")
      }));
    }

    const handleDeleteMenuCategory = () => {
      console.log("deleted")
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h6">{currentMenuCategory.name} Detail Page</Typography>
                <Button variant="outlined"  color="error" onClick={() => setOpenComfirmation(true)} >Delete</Button>
            </Box>
            <TextField defaultValue={currentMenuCategory.name} onChange={( event ) => setUpdatedMenuCategory({...updatedMenuCategory , name : event.target.value})} />
            <FormControl>
                <InputLabel sx={{ bgcolor : "white"}}>Available for (locations) </InputLabel>
                <Select
                  multiple
                  label="Available for (locations) "
                  value={updatedMenuCategory.availabledLocationIds}
                  onChange={(event) => setUpdatedMenuCategory({...updatedMenuCategory , availabledLocationIds : event.target.value as number[]})}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => <Box sx={{ display : "flex" , flexWrap : "wrap" , gap : "5px"}}>{
                    selected.map(item => {
                        const location = locations.find(location => location.id === item);
                        if(location) return <Chip key={location.id} label={location.name} />
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
                  {locations.map(value => (
                    <MenuItem key={value.id} value={value.id}>
                      <Checkbox checked={updatedMenuCategory.availabledLocationIds.includes(value.id)} />
                      <ListItemText primary={value.name} />
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/menu-category")}>Cancel</Button>
                <Button variant="contained" disabled={updatedMenuCategory.name.length === 0} onClick={handleUpdateMenuCategory}>Update</Button>
            </Box>
            <DeleteComfirmation open={openComfirmation} setOpen={setOpenComfirmation} itemName="Menu Category" handleDeleteFunction={handleDeleteMenuCategory} />
        </Box>
    )
}

export default MenuCategoryDetailPage;