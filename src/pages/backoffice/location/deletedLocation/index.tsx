import DeleteComfirmation from "@/components/DeleteComfirmation";
import DeletedItemFrame from "@/components/DeletedItemFrame";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Chip, Typography } from "@mui/material"
import Link from "next/link";


const DeletedLocation = () => {
    const allLocations = useAppSelector(state => state.location.items);
    const deletedLocations = allLocations.filter(item => item.isArchived === true);
    return (
        <Box sx={{ display : "flex" , flexDirection : "column" , gap : "20px" }}>
            <Box sx={{ display : "flex", justifyContent : "space-between"}}>
                <Typography variant="h5">Deleted Locations</Typography>
                <Link href={"/backoffice/location"} style={{ textDecoration : "none"}}>
                    <Button variant="contained" >Back</Button>
                </Link>
            </Box>
            {deletedLocations.length ? deletedLocations.map(item => <DeletedItemFrame key={item.id} deletedAt={item.updatedAt} id={item.id} name={item.name} />)
            : <Chip sx={{ margin : "0 auto" , p : "20px" , bgcolor : "secondary.main" , color : "white" , fontSize : "20px" }} label="There is no deleted location." />}
        </Box>
    )
}

export default DeletedLocation;