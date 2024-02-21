import DropZoneIcon from "@/components/DropZoneIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/slices/menu";
import { UpdateMenuOptions } from "@/types/menu";
import { config } from "@/util/config";
import { Box, Button, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { Menu } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuDetailPage = () => {
    const router = useRouter();
    const menuCategoryMenus = useAppSelector(store => store.menuCategoryMenu.items);
    const allMenuCategories = useAppSelector(store => store.menuCategory.items);
    const menuCategories = allMenuCategories.filter(item => !item.isArchived);
    const [updatedMenu , setUpdatedMenu ] = useState<UpdateMenuOptions>();
    const allMenus = useAppSelector(store => store.menu.items);
    const menus = allMenus.filter(item => !item.isArchived);
    const currentMenu = menus.find(item => item.id === Number(router.query.id)) as Menu;
    const dispatch = useAppDispatch();
    const [ selectedImage , setSelectedImage ] = useState<File>()

    useEffect(() => {
        if(allMenus.length && menuCategoryMenus.length) {
          const menuCategoryIds = menuCategoryMenus.filter(item => item.menuId === currentMenu.id).map(item => item.menuCategoryId);
          setUpdatedMenu({...currentMenu , menuCategoryIds});
        } 
    } , [allMenus , menuCategoryMenus ]);

    if(!updatedMenu || !menuCategories) return null;

    const handleUpdateMenu = async() => {
      let updatedImgUrl = updatedMenu.imgUrl;
      if(selectedImage) {
        const formData = new FormData();
        formData.append( "files" , selectedImage );
        const response = await fetch(`${config.apiBaseUrl}/imageUpload` , {
          method : "POST",
          body : formData
        });
        const { imgUrl } = await response.json();
        updatedImgUrl = imgUrl;
      }
      dispatch(updateMenu({ ...updatedMenu , imgUrl : updatedImgUrl , onSuccess : () => { router.push("/backoffice/menu")} }))
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h5">{currentMenu.name}</Typography>
                <Button variant="outlined" color="error" >Delete</Button>
            </Box>

            <Box sx={{ display : "flex" , justifyContent : "center" , alignItems : "center" , gap : "30px"}}>
              <Image alt={updateMenu.name} src={ updatedMenu.imgUrl ? updatedMenu.imgUrl : "/default-menu.png"} width={150} height={90} />
              <DropZoneIcon setSelectedImage={setSelectedImage}  />
              {selectedImage ? <Box  sx={{ display : "flex" , flexDirection : "column" , gap : "20px" , alignItems : "center"}}>
                <Typography sx={{ bgcolor : "secondary.main" , p : "5px 7px" , borderRadius : "5px" , color : "white"}}>New Image</Typography>
                <Chip label={selectedImage.name} onDelete={() => setSelectedImage(undefined)} sx={{  bgcolor : "success.main"}} /> 
              </Box>
              : <span></span> }
            </Box>
            <TextField label="name" defaultValue={updatedMenu.name} onChange={(evt) => setUpdatedMenu({...updatedMenu , name : evt.target.value })} />
            <TextField label="price" defaultValue={updatedMenu.price} onChange={(evt) => setUpdatedMenu({...updatedMenu , price : Number(evt.target.value) })} />
            <TextField label="detail" defaultValue={updatedMenu.detail} onChange={(evt) => setUpdatedMenu({...updatedMenu , detail : evt.target.value })} />
            <FormControl> 
                <InputLabel sx={{ bgcolor : "white"}}> Related Menu Categories </InputLabel>
                <Select
                  multiple
                  label=" Related Menu Categories "
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
                <Button variant="contained" onClick={handleUpdateMenu} disabled={!updatedMenu.name || !updatedMenu.menuCategoryIds.length}>Update</Button>
            </Box>
        </Box>
    )
};

export default MenuDetailPage;