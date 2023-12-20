import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { useAppDispatch } from "@/store/hooks";
import { deleteLocationPermanently, restoreLocation } from "@/store/slices/location";
import { useState } from "react";
import DeleteComfirmation from "./DeleteComfirmation";

interface Props {
    name : string;
    id : number;
    deletedAt : Date;
}

const DeletedItemFrame = ({ name , id , deletedAt  } : Props ) => {
    const index = String(deletedAt).indexOf("T");
    const date = String(deletedAt).substring( 0 , index);
    const dispatch = useAppDispatch();
    const [ open , setOpen ] = useState<boolean>(false)

    const handleOnRestore = () => {
        dispatch(restoreLocation({id , isRestore : true }))
    }

    const handleDeleteLocationPermanently = () => {
        dispatch(deleteLocationPermanently({ id , isPermanent : true }))
    }

    return (
        <Box sx={{ display : "flex" , justifyContent : "space-between" , bgcolor : "info.main" , p : "20px" , borderRadius : "5px"}}>
            <Typography>{name}</Typography>
            <Typography>Deleted At {date}</Typography>
            <Box sx={{ display : "flex" , gap : "20px" }}>
                <RestoreIcon sx={{ cursor : "pointer"}} onClick={handleOnRestore}/>
                <DeleteIcon sx={{cursor : "pointer"}} onClick={() => setOpen(true)}/>
            </Box>
            <DeleteComfirmation itemName="Location Permanently !" open={open} setOpen={setOpen} handleDeleteFunction={handleDeleteLocationPermanently} />
        </Box>
    )
}

export default DeletedItemFrame;