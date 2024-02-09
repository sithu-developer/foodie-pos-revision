import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddonCategory } from "@/store/slices/addonCategory";
import { UpdatedAddonCategoryOptions } from "@/types/addonCategory";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, ListItemText, Menu, MenuItem, OutlinedInput, Select, Switch, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetailPage = () => {
    const router = useRouter();
    const allAddonCategories = useAppSelector(store => store.addonCategory.items);
    const addonCategories = allAddonCategories.filter(item => !item.isArchived );
    const currentAddonCategory = allAddonCategories.find(item => item.id === Number(router.query.id));
    const menuAddonCategories = useAppSelector(store => store.menuAddonCategory.items);
    const [ updatedAddonCategory , setUpdatedAddonCategory ] = useState<UpdatedAddonCategoryOptions>();
    const allMenus = useAppSelector(store => store.menu.items);
    const menus = allMenus.filter(item => !item.isArchived);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(currentAddonCategory && menuAddonCategories.length) {
            const menuIds = menuAddonCategories.filter(item => item.addonCategoryId === Number(router.query.id)).map(item => item.menuId);
            setUpdatedAddonCategory({...currentAddonCategory , menuIds })
        }
    } , [allAddonCategories , menuAddonCategories ])

    if(!currentAddonCategory || !updatedAddonCategory || !menus.length) return null;

    const handleUpdateAddonCategory = () => {
        dispatch(updateAddonCategory({...updatedAddonCategory , onSuccess : () => {
            router.push("/backoffice/addon-category");
        }}))
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px" }}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4">{currentAddonCategory?.name}</Typography>
                <Button variant="outlined" color="error" >Delete</Button>
            </Box>
            <TextField label="name" defaultValue={currentAddonCategory.name} onChange={(evt) => setUpdatedAddonCategory({...updatedAddonCategory , name : evt.target.value })} />
            <Box>
                <FormControlLabel control={<Switch defaultChecked={currentAddonCategory.optional} />} label="is Optional ? " onChange={(evt , value) => setUpdatedAddonCategory({...updatedAddonCategory , optional : value })} />
            </Box>
            <FormControl >
                <InputLabel sx={{ bgcolor : "white"}}> Related Menus </InputLabel>
                <Select
                  multiple
                  label=" Related Menus "
                  value={updatedAddonCategory.menuIds}
                  onChange={(event) => {
                    const value  = event.target.value as number[];
                    setUpdatedAddonCategory({...updatedAddonCategory , menuIds : value })
                  }}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => {
                        const currentMenu = menus.find(item => item.id === value);
                        if(currentMenu ) return <Chip key={value} label={currentMenu.name} />
                      } )}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 18 ,
                        width: 250,
                      },
                    },
                  }}
                >
                  {menus.map(item => 
                    <MenuItem key={item.id} value={item.id}>
                      <Checkbox checked={updatedAddonCategory.menuIds.includes(item.id)} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  )}
                </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/addon-category")} >Cancel</Button>
                <Button variant="contained" disabled={!updatedAddonCategory.name || !updatedAddonCategory.menuIds.length} onClick={handleUpdateAddonCategory} >Update</Button>
            </Box>
        </Box>
    )
}

export default AddonCategoryDetailPage;