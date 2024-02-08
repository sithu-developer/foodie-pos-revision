import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/addon";
import { NewAddonOptions } from "@/types/addon";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultAddon : NewAddonOptions = {
    name : "" , price : 0 , addonCategoryId : undefined
}

const NewAddon = ( { open , setOpen } : Props) => {
    const allAddonCategories = useAppSelector(store => store.addonCategory.items);
    const addonCategories = allAddonCategories.filter(item => !item.isArchived);
    const [ newAddon , setNewAddon ] = useState<NewAddonOptions>(defaultAddon);
    const dispatch = useAppDispatch();

    const handleCreateAddon = () => {
        dispatch(createAddon({...newAddon , onSuccess : () => {
            setOpen(false);
            setNewAddon(defaultAddon);
        }}));
    };
    
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewAddon(defaultAddon);
        }}>
            <DialogTitle>New Addon</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : 'column' , gap : "20px" , width : "400px"}}>
                <TextField autoFocus label="name" sx={{ mt : "20px"}} onChange={(evt) => setNewAddon({...newAddon , name : evt.target.value})} />
                <TextField label="price" defaultValue="0" onChange={(evt) => setNewAddon({...newAddon , price : Number(evt.target.value)})} />
                <FormControl >
                    <InputLabel sx={{ bgcolor : "white"}}> Related Menus </InputLabel>
                    <Select
                      label=" Related Menus "
                      value={newAddon.addonCategoryId === undefined ? "" : newAddon.addonCategoryId} // this is very good idea
                      onChange={(evt) => setNewAddon({...newAddon , addonCategoryId : Number(evt.target.value) } ) }
                    >
                      {addonCategories.map(item => 
                        <MenuItem key={item.id} value={item.id}>
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      )}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewAddon(defaultAddon);
                }}>Cancel</Button>
                <Button variant="contained" disabled={!newAddon.name || !newAddon.addonCategoryId} onClick={handleCreateAddon}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewAddon;