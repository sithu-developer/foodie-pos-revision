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
import { useRouter } from "next/router";

const SideBar = () => {
    const router = useRouter();
    const currentPageName = router.pathname.slice(12);
    return (
        <Box sx={{ bgcolor : "success.main" , width : "230px" , height : "100vh" , borderTopRightRadius : "10px"}}>
            {sideBarItems.slice(0 , sideBarItems.length - 1).map(item => 
                <Link key={item.id} href={item.href} style={{textDecoration : "none" , color : currentPageName === item.forChecking ? "white" : "black"}}>
                    <ListItemButton sx={{ bgcolor : currentPageName === item.forChecking ? "primary.main" : "success.main"}}>
                      <ListItemIcon sx={{ color : currentPageName === item.forChecking ? "white" : "black"}}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                </Link>    
            )}
            <Divider variant="middle"/>
            {sideBarItems.slice(sideBarItems.length - 1).map(item => 
                <Link key={item.id} href={item.href} style={{textDecoration : "none" , color : currentPageName === item.forChecking ? "white" : "black"}}>
                    <ListItemButton sx={{ bgcolor : currentPageName === item.forChecking ? "primary.main" : "success.main"}}>
                      <ListItemIcon sx={{ color : currentPageName === item.forChecking ? "white" : "black"}}>
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
        href : "/backoffice/order",
        forChecking : "order"
    },
    {   
        id : 2,
        name : "Menu Categories",
        icon : <CategoryIcon/>,
        href : "/backoffice/menu-category",
        forChecking : "menu-category"
    },
    {   
        id : 3,
        name : "Menus",
        icon : <RestaurantMenuIcon/>,
        href : "/backoffice/menu",
        forChecking : "menu"
    },
    {     
        id : 4,
        name : "Addon Categories",
        icon : <EggAltIcon/>,
        href : "/backoffice/addon-category",
        forChecking : "addon-category"
    },
    {   
        id : 5,
        name : "Addons",
        icon : <EggIcon/>,
        href : "/backoffice/addon",
        forChecking : "addon"
    },
    {   
        id : 6,
        name : "Tables",
        icon : <TableBarIcon/>,
        href : "/backoffice/table",
        forChecking : "table"
    },
    {   
        id : 7,
        name : "Locations",
        icon : <LocationOnIcon/>,
        href : "/backoffice/location",
        forChecking : "location"
    },
    {   
        id : 8,
        name : "Setting",
        icon : <SettingsIcon/>,
        href : "/backoffice/setting",
        forChecking : "setting"
    },
]