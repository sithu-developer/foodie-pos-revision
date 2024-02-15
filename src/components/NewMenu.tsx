import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menu";
import { CreateMenuOptions } from "@/types/menu";
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import { MenuCategory } from "@prisma/client";
import { useState } from "react";
import DropZone from "./DropZone";
import { config } from "@/util/config";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultMenu : CreateMenuOptions = {
    name : "" , detail : "" , price : 0 , menuCategoryIds : []
}

const NewMenu = ({open , setOpen} : Props) => {
    const [newMenu , setNewMenu ] = useState<CreateMenuOptions>(defaultMenu);
    const dispatch = useAppDispatch();
    const allMenuCategories = useAppSelector(store => store.menuCategory.items);
    const menuCategories = allMenuCategories.filter(item => !item.isArchived );
    const [ selectedImages , setSelectedImages] = useState<File[]>([]);

    const handleCreateMenu = async() => {
      if(selectedImages.length) {
        const formData = new FormData();
        formData.append("files" , selectedImages[0]);
        const response = await fetch(`${config.apiBaseUrl}/imageUpload`, {
          method : "POST",
          body : formData
        });
        const { imgUrl } = await response.json();
        dispatch(createMenu({ ... newMenu , imgUrl , onSuccess : () => {
          setOpen(false);
        }}))
      } else {
        dispatch(createMenu({ ... newMenu , onSuccess : () => {
          setOpen(false);
        }}));
      }
    }

    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewMenu(defaultMenu);
            setSelectedImages([]);
        }} >
            <DialogTitle>New Menu</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "10px" , minWidth : "400px" , maxWidth : "500px"}}>
                <TextField  label="name" sx={{mt : "15px"}} onChange={(event) => setNewMenu({...newMenu , name : event.target.value })} autoFocus/>
                <TextField  label="price (optional)" onChange={(event) => setNewMenu({...newMenu , price : Number(event.target.value) })} />
                <TextField  label="detail (optional)" onChange={(event) => setNewMenu({...newMenu , detail : event.target.value })} />
                <FormControl sx={{ m: 1 }}>
                    <InputLabel sx={{ bgcolor : "white"}}>Available for (locations)</InputLabel>
                    <Select
                      multiple
                      label="Available for (locations)"
                      value={newMenu.menuCategoryIds}
                      onChange={(event) => {
                        const value  = event.target.value as number[];
                        setNewMenu({...newMenu , menuCategoryIds : value })
                      }}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(value => {
                            const currentLocation = menuCategories.find(item => item.id === value) as MenuCategory;
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
                      {menuCategories.map(item => 
                        <MenuItem key={item.id} value={item.id}>
                          <Checkbox checked={newMenu.menuCategoryIds.includes(item.id)} />
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      )}
                    </Select>
                </FormControl>
                <DropZone setSelectedImages={setSelectedImages}  />
                <Box>
                  {selectedImages[0] && 
                  <Box>
                    <Chip label={selectedImages[0].name} onDelete={() => setSelectedImages([])} />
                  </Box>}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpen(false);
                    setNewMenu(defaultMenu);
                    setSelectedImages([]);
                }} variant="contained" >Cancel</Button>
                <Button onClick={handleCreateMenu} disabled={newMenu.name.length === 0 || newMenu.menuCategoryIds.length === 0 } variant="contained" >Comfirm</Button>
            </DialogActions>
        </Dialog>   
    )
}

export default NewMenu;