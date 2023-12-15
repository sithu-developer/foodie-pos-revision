import { Box, Button, Typography } from "@mui/material"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const TopBar = () => {
    const {data : Session }  = useSession()

    return (
        <Box sx={{bgcolor : "secondary.main" , height : "80px" , display : "flex" , justifyContent : "space-between" , alignItems : "center" , px : "20px"}}>
            <Box>
                <Image alt="foodie-pos logo" src={"/foodiePosLogo.png"} height={130} width={130} />
            </Box>
            <Box>
                <Typography variant="h4" sx={{ color : "white"}}>Foodie Pos</Typography>
            </Box>
            {Session ?  <Box>
                <Button variant="contained" onClick={() => signOut({callbackUrl : "/backoffice"})} >Sign out</Button>
            </Box> 
             : <span></span> }
        </Box>
    )
}

export default TopBar;