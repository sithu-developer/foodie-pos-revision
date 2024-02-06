import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/addonCategory";
import { NewAddonCategoryOptions } from "@/types/addonCategory";
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material"
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  open : boolean;
  setOpen : (value : boolean ) => void;
}

const defaultAddonCategory : NewAddonCategoryOptions = {
    name : "" , optional : false , menuIds : []
}
const NewAddonCategory = ({ setOpen , open } : Props) => {
  const router = useRouter();
  const [ newAddonCategory , setNewAddonCategory ] = useState<NewAddonCategoryOptions>(defaultAddonCategory);
  const allMenus = useAppSelector(store => store.menu.items);
  const menus = allMenus.filter(item => !item.isArchived );
  const dispatch = useAppDispatch();

  const handleCreateAddonCategory = () => {
    dispatch(createAddonCategory({...newAddonCategory , onSuccess : () => {
      setOpen(false);
      setNewAddonCategory(defaultAddonCategory);
    } }))
  }

  return(
    <Dialog open={open} onClose={() => {
        setOpen(false);
        setNewAddonCategory(defaultAddonCategory);
        }}>
        <DialogTitle>New Addon Category</DialogTitle>
        <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "20px" , minWidth : "400px"}}>
            <TextField autoFocus label="name"  sx={{mt : "25px"}} onChange={(evt) => setNewAddonCategory({...newAddonCategory , name : evt.target.value})} />
            <Box>
                <FormControlLabel control={<Switch />} label="is Optional ? " onChange={(evt , value ) => setNewAddonCategory({...newAddonCategory , optional : value }) } />
            </Box>
            <FormControl >
                <InputLabel sx={{ bgcolor : "white"}}> Related Menus </InputLabel>
                <Select
                  multiple
                  label=" Related Menus "
                  value={newAddonCategory.menuIds}
                  onChange={(event) => {
                    const value  = event.target.value as number[];
                    setNewAddonCategory({...newAddonCategory , menuIds : value })
                  }}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => {
                        const currentMenu = menus.find(item => item.id === value) as Menu;
                        return <Chip key={value} label={currentMenu.name} />
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
                      <Checkbox checked={newAddonCategory.menuIds.includes(item.id)} />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  )}
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={() => {
                setOpen(false);
                setNewAddonCategory(defaultAddonCategory);
            }} >Cancel</Button>
            <Button variant="contained" disabled={!newAddonCategory.name || !newAddonCategory.menuIds.length } onClick={handleCreateAddonCategory}>Create</Button>
        </DialogActions>
    </Dialog>
  )
}

export default NewAddonCategory;