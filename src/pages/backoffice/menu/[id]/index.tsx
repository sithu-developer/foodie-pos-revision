import { Box } from "@mui/material"
import { useRouter } from "next/router";

const MenuDetailPage = () => {
    const router = useRouter();
    return (
        <Box>
            {router.query.id}
        </Box>
    )
};

export default MenuDetailPage;