import { Box, Button, Paper, Typography } from "@mui/material"
import { ReactNode } from "react";
import Link from "next/link";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeSelectedLocationId } from "@/store/slices/location";
import { useRouter } from "next/router";

interface Props {
    id ?: number;
    name : string;
    icon : ReactNode;
    href ?: string;
    fromLocationPage ?: boolean;
    opacity ?: number;
}

const ItemCart = ({ id , icon , name , href , fromLocationPage , opacity = 1 } : Props) => {
    const selectedLocationId = useAppSelector(state => state.location.selectedLocationId);
    const dispatch = useAppDispatch();
    const router = useRouter();

    if(href) {
        return (
            <Link href={href} style={{ textDecoration : "none"}}>
                <Paper elevation={5} sx={{ opacity , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                    <Box>{icon}</Box>
                    <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                </Paper>
            </Link>
        )
    } else if(fromLocationPage && id) {
        const handleChangeLocationId = () => {
            dispatch(changeSelectedLocationId(id));
            localStorage.setItem("selectedLocationId" , String(id));
        }
        
        return (
            <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px"}}>
                <Box onClick={handleChangeLocationId}> 
                    <Paper elevation={5} sx={{ position : "relative" , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" , cursor : "pointer"}}>
                        {selectedLocationId === id && <CheckCircleIcon sx={{position : "absolute" , top : "10px" , right : "10px"}}/>}
                        <Box>{icon}</Box>
                        <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                    </Paper>
                </Box>
                <Button variant="contained" onClick={() => router.push(`/backoffice/location/${id}`)}>Edit Location</Button>
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