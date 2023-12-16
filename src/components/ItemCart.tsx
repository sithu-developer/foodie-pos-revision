import { Box, Paper, Typography } from "@mui/material"
import { ReactNode } from "react";
import Link from "next/link";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changeSelectedLocationId } from "@/store/slices/location";

interface Props {
    id ?: number;
    name : string;
    icon : ReactNode;
    href ?: string;
    fromLocationPage ?: boolean;
}

const ItemCart = ({ id , icon , name , href , fromLocationPage } : Props) => {
    const selectedLocationId = useAppSelector(state => state.location.selectedLocationId);
    const dispatch = useAppDispatch();

    if(href) {
        return (
            <Link href={href} style={{ textDecoration : "none"}}>
                <Paper elevation={5} sx={{ width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                    <Box>{icon}</Box>
                    <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                </Paper>
            </Link>
        )
    } else if(fromLocationPage && id) {
        const handleChangeLocationId = () => {
            console.log("e")
            dispatch(changeSelectedLocationId(id))
        }
        // should add to localStorage
        return (
            <Box onClick={handleChangeLocationId}> 
                <Paper elevation={5} sx={{ position : "relative" , width : "200px" , height : "200px" , display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center" , cursor : "pointer"}}>
                    {selectedLocationId === id && <CheckCircleIcon sx={{position : "absolute" , top : "10px" , right : "10px"}}/>}
                    <Box>{icon}</Box>
                    <Typography variant="h6" sx={{ textAlign : "center"}}>{name}</Typography>
                </Paper>
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