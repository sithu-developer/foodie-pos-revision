import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import EggAltIcon from '@mui/icons-material/EggAlt';
import NewAddonCategory from "@/components/NewAddonCategory";
import { useState } from "react";


const AddonCategoryPage = () => {

    const allAddonCategories = useAppSelector(store => store.addonCategory.items);
    const addonCategories = allAddonCategories.filter(item => !item.isArchived );
    const [ open , setOpen ] = useState<boolean>(false)


    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between" }}>
                <Typography variant="h4" >Addon Categories</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{ mt : "20px" , display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
                {addonCategories.map(item => <ItemCart key={item.id} name={item.name} icon={<EggAltIcon/>} href={`/backoffice/addon-category/${item.id}`} />)}
            </Box>
            <NewAddonCategory open={open} setOpen={setOpen}/>
        </Box>
    )
}

export default AddonCategoryPage;