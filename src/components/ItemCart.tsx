import { Box, Button, Paper, Typography } from "@mui/material"
import { ReactNode } from "react";
import Link from "next/link";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeSelectedLocationId } from "@/store/slices/location";
import { useRouter } from "next/router";

interface Props {
    locationId ?: number;
    name : string;
    icon : ReactNode;
    href ?: string;
    fromLocationPage ?: boolean;
    opacity ?: number;
    fromTablePage ?: boolean;
}

const ItemCart = ({ locationId , icon , name , href , fromLocationPage , opacity = 1 , fromTablePage } : Props) => {
    const selectedLocationId = useAppSelector(state => state.location.selectedLocationId);
    const dispatch = useAppDispatch();
    const router = useRouter();
    if(fromTablePage && href) {
        return (
            <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
                <Link href={href} style={{ textDecoration : "none"}}>
                    <Paper elevation={5} sx={{ opacity , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                        <Box>{icon}</Box>
                        <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                    </Paper>
                </Link>
                <Button variant="contained">Print QR-Code</Button>
            </Box>
        )
    } else if(href) {
        return (
            <Link href={href} style={{ textDecoration : "none"}}>
                <Paper elevation={5} sx={{ opacity , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                    <Box>{icon}</Box>
                    <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                </Paper>
            </Link>
        )
    } else if(fromLocationPage && locationId) {
        const handleChangeLocationId = () => {
            dispatch(changeSelectedLocationId(locationId));
            localStorage.setItem("selectedLocationId" , String(locationId));
        }
        
        return (
            <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
                <Box onClick={handleChangeLocationId}> 
                    <Paper elevation={5} sx={{ position : "relative" , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" , cursor : "pointer"}}>
                        {selectedLocationId === locationId && <CheckCircleIcon sx={{position : "absolute" , top : "10px" , right : "10px"}}/>}
                        <Box>{icon}</Box>
                        <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                    </Paper>
                </Box>
                <Button variant="contained" onClick={() => router.push(`/backoffice/location/${locationId}`)}>Edit Location</Button>
            </Box>
        )
    } else {
        return (
            <Paper elevation={5} sx={{ width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                <Box>{icon}</Box>
                <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
            </Paper>
        )
    }
}

export default ItemCart;