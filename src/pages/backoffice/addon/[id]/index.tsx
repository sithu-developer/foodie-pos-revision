import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddon } from "@/store/slices/addon";
import { UpdatedAddonOptions } from "@/types/addon";
import { Box, Button, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetailPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const allAddons = useAppSelector(store => store.addon.items);
    const addons = allAddons.filter(item => !item.isArchived);
    const currentAddon = addons.find(item => item.id === id );
    const [ updatedAddon , setUpdatedAddon ] = useState<UpdatedAddonOptions>();
    const allAddonCategories = useAppSelector(store => store.addonCategory.items);
    const addonCategories = allAddonCategories.filter(item => !item.isArchived);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(currentAddon) {
            setUpdatedAddon(currentAddon);
        }
    } , [allAddons , id ])

    if(!currentAddon || !updatedAddon || !addonCategories ) return null;

    const handleUpdateAddon = () => {
        dispatch(updateAddon({...updatedAddon , onSuccess : () => {
            router.push("/backoffice/addon")
        }}))
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4">{currentAddon.name} ( Addon )</Typography>
                <Button variant="outlined" color="error" > Delete </Button>
            </Box>
            <TextField defaultValue={currentAddon.name} label="name" onChange={(evt) => setUpdatedAddon({...updatedAddon , name : evt.target.value })} />
            <TextField defaultValue={currentAddon.price} label="price" onChange={(evt) => setUpdatedAddon({...updatedAddon , price : Number(evt.target.value) })} />
            <FormControl >
                <InputLabel sx={{ bgcolor : "white"}}> Related Menus </InputLabel>
                <Select
                  label=" Related Menus "
                  value={updatedAddon.addonCategoryId}
                  onChange={(evt) => setUpdatedAddon({...updatedAddon , addonCategoryId : Number(evt.target.value) } ) }
                >
                  {addonCategories.map(item => 
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  )}
                </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "20px"}}>
                <Button variant="contained" onClick={() => router.push("/backoffice/addon")}>Cancel</Button>
                <Button variant="contained" disabled={!updatedAddon.name || !updatedAddon.addonCategoryId} onClick={handleUpdateAddon}>Update</Button>
            </Box>
        </Box>
    )
}

export default AddonDetailPage;