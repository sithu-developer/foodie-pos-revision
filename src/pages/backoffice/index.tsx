import { Box, Button } from "@mui/material"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const BackofficePage = () => {
    const { data : session} = useSession();
    const router = useRouter()

    if(session) router.push("/backoffice/order");
    
    return (
        <Box sx={{ width : "100vw" , height : "80vh" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>
            <Button variant="contained" onClick={() => signIn("google" , { callbackUrl : "/backoffice/order"})}>Sign In</Button>
        </Box>
    )
}

export default BackofficePage;