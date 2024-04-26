import ItemCart from "@/components/ItemCart";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import TableBarIcon from '@mui/icons-material/TableBar';
import { useEffect, useState } from "react";
import NewTable from "@/components/NewTable";
import { Table } from "@prisma/client";


const TablePage = () => {
    const allTables = useAppSelector(store => store.table.items);
    const tables = allTables.filter(item => !item.isArchived);
    const [ open , setOpen ] = useState<boolean>(false);
    const [ currentLocationTables , setCurrentLocationTables ] = useState<Table[]>([]);

    useEffect(() => {
        if(allTables.length ) {
            const selectedLocationId = localStorage.getItem("selectedLocationId");
            const currentLocationTables = tables.filter(item => item.locationId === Number(selectedLocationId));
            setCurrentLocationTables(currentLocationTables)
        }
    } , [allTables ])

    if(!currentLocationTables) return null;
    return (
        <Box>
            <Box sx={{ display : "flex" , justifyContent : "space-between" , mb : "20px"}}>
                <Typography variant="h4" >Tables</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>Create</Button>
            </Box>
            <Box sx={{display : "flex" , flexWrap : "wrap" , gap : "20px"}}>
                {currentLocationTables.map(item =>  <ItemCart key={item.id} fromTablePage name={item.name} icon={<TableBarIcon/>} href={`/backoffice/table/${item.id}`} />)}
            </Box>
            <NewTable open={open} setOpen={setOpen} />
        </Box>
    )
}

export default TablePage;