import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import TableBarIcon from '@mui/icons-material/TableBar';
import { useState } from "react";
import NewTable from "@/components/NewTable";


const TablePage = () => {
    const allTables = useAppSelector(store => store.table.items);
    const tables = allTables.filter(item => !item.isArchived);
    const [ open , setOpen ] = useState<boolean>(false);
    const selectedLocationId = Number(localStorage.getItem("selectedLocationId"));
    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4" >Tables</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
                {tables.map(item => <ItemCart key={item.id} opacity={selectedLocationId === item.locationId ? 1 : 0.5} name={item.name} icon={<TableBarIcon/>} href={`/backoffice/table/${item.id}`} />)}
            </Box>
            <NewTable open={open} setOpen={setOpen} />
        </Box>
    )
}

export default TablePage;