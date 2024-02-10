import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTable } from "@/store/slices/table";
import { UpdatedTableOptions } from "@/types/table";
import { Box, Button, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetailPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const allTables = useAppSelector(store => store.table.items);
    const tables = allTables.filter(item => !item.isArchived);
    const currentTable = tables.find(item => item.id === id );
    const locations = useAppSelector(store => store.location.items).filter(item => !item.isArchived );
    const [ updatedTable , setUpdatedTable ] = useState<UpdatedTableOptions>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(currentTable) {
            setUpdatedTable(currentTable);
        }
    } , [allTables])

    if(!currentTable || !updatedTable) return null;

    const handleUpdateTable = () => {
        dispatch(updateTable({...updatedTable , onSuccess : () => router.push("/backoffice/table")}))
    }

    return (
        <Box sx={{ display : "flex" , flexDirection : "column", gap : "20px"}}>
            <Box sx={{ display : "flex" , justifyContent : "space-between"}}>
                <Typography variant="h4">{currentTable.name}</Typography>
                <Button variant="outlined" color="error">Delete</Button>
            </Box>
            <TextField label="name" defaultValue={currentTable.name} onChange={(evt) => setUpdatedTable({...updatedTable , name : evt.target.value})} />
            <FormControl >
                <InputLabel sx={{ bgcolor : "white"}}> Related location </InputLabel>
                <Select
                  label=" Related location "
                  value={updatedTable.locationId}
                  onChange={(evt) => setUpdatedTable({...updatedTable , locationId : Number(evt.target.value)})}
                >
                  {locations.map(item => 
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  )}
                </Select>
            </FormControl>
            <Box sx={{ display : "flex" , gap : "20px" }}>
                <Button variant="contained" onClick={() => router.push("/backoffice/table")}>Cancel</Button>
                <Button variant="contained" disabled={!updatedTable.name || !updatedTable.locationId } onClick={handleUpdateTable}>Update</Button>
            </Box>
        </Box>
    )
}

export default TableDetailPage;