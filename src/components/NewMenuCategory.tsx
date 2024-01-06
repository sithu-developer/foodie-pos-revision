import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategory";
import { NewMenuCategoryOptions } from "@/types/menuCategory";
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material"
import { Location } from "@prisma/client";
import { useState } from "react";

interface Props {
   open : boolean;
   setOpen : (value : any) => void; 
}

const defaultMenuCategory : NewMenuCategoryOptions = {
    name : "" , availabledLocationIds : []
}

const NewMenuCategoryLayout = ( { open , setOpen } : Props) => {
    const [newMenuCategory , setNewMenuCategory ] = useState<NewMenuCategoryOptions>(defaultMenuCategory);
    const dispatch = useAppDispatch();
    const allLocations = useAppSelector(store => store.location.items);
    const locations = allLocations.filter(item => !item.isArchived);

    const handleCreateMenuCategory = () => {
        dispatch(createMenuCategory({ ... newMenuCategory ,  selectedLocationId : Number(localStorage.getItem("selectedLocationId")) 
        , onSuccess : () => {
            setOpen(false);
            setNewMenuCategory(defaultMenuCategory);
          }
        }))
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewMenuCategory(defaultMenuCategory);
        } }>
            <DialogTitle>New Menu Category</DialogTitle>
            <DialogContent sx={{display : "flex" , flexDirection : "column" , gap : "20px" , minWidth : "300px"}}>
                <TextField onChange={(event) => setNewMenuCategory({ ...newMenuCategory , name : event.target.value })} placeholder="name"/>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel sx={{ bgcolor : "white"}}>Available for (locations)</InputLabel>
                    <Select
                      multiple
                      label="Available for (locations)"
                      value={newMenuCategory.availabledLocationIds}
                      onChange={(event) => {
                        const value  = event.target.value as number[];
                        setNewMenuCategory({...newMenuCategory , availabledLocationIds : value })
                      }}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(value => {
                            const currentLocation = locations.find(item => item.id === value) as Location;
                            return <Chip key={value} label={currentLocation.name} />
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
                      {locations.map(item => 
                        <MenuItem key={item.id} value={item.id}>
                          <Checkbox checked={newMenuCategory.availabledLocationIds.includes(item.id)} />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      )}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewMenuCategory(defaultMenuCategory);
                }}>Cancel</Button>
                <Button variant="contained" disabled={newMenuCategory.name.length === 0} onClick={handleCreateMenuCategory}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewMenuCategoryLayout;