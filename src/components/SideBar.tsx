import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import DiningIcon from '@mui/icons-material/Dining';
import EggIcon from '@mui/icons-material/Egg';
import EggAltIcon from '@mui/icons-material/EggAlt';
import TableBarIcon from '@mui/icons-material/TableBar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

const SideBar = () => {
    return (
        <Box sx={{ bgcolor : "success.main" , width : "230px" , height : "100vh" , borderTopRightRadius : "10px"}}>
            {sideBarItems.slice(0 , sideBarItems.length - 1).map(item => 
                <Link key={item.id} href={item.href} style={{textDecoration : "none" , color : "black"}}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                </Link>    
            )}
            <Divider variant="middle"/>
            {sideBarItems.slice(sideBarItems.length - 1).map(item => 
                <Link key={item.id} href={item.href} style={{textDecoration : "none" , color : "black"}}>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                </Link>    
            )}
        </Box>
    )
}

export default SideBar;

const sideBarItems = [
    {   
        id : 1,
        name : "Orders",
        icon : <DiningIcon/>,
        href : "/backoffice/orders"
    },
    {   
        id : 2,
        name : "Menu Categories",
        icon : <CategoryIcon/>,
        href : "/backoffice/menuCategories"
    },
    {   
        id : 3,
        name : "Menus",
        icon : <RestaurantMenuIcon/>,
        href : "/backoffice/menus"
    },
    {     
        id : 4,
        name : "Addon Categories",
        icon : <EggAltIcon/>,
        href : "/backoffice/addonCategories"
    },
    {   
        id : 5,
        name : "Addons",
        icon : <EggIcon/>,
        href : "/backoffice/addons"
    },
    {   
        id : 6,
        name : "Tables",
        icon : <TableBarIcon/>,
        href : "/backoffice/tables"
    },
    {   
        id : 7,
        name : "Locations",
        icon : <LocationOnIcon/>,
        href : "/backoffice/locations"
    },
    {   
        id : 8,
        name : "Setting",
        icon : <SettingsIcon/>,
        href : "/backoffice/setting"
    },
]