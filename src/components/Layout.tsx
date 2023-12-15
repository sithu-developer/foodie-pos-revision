import { Box } from "@mui/material"
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/hooks";
import { appFetch } from "@/store/slices/app";

interface Props {
    children : ReactNode
}

const Layout = ({children} : Props ) => {

    const router = useRouter();
    const isBackoffice = router.pathname.includes("/backoffice");
    const {data : session} = useSession();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(session) {
            dispatch(appFetch())
        }
    } , [session])
    

    if(isBackoffice) return (
        <Box >
            <TopBar/>
            <Box sx={{ display : "flex"}}>
                {session && <SideBar/>}
                <Box sx={{ padding : "10px"}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )

    return (
        <Box>
            {children}
        </Box>
    )
}

export default Layout;