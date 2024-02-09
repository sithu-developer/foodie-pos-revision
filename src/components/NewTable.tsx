import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTable } from "@/store/slices/table";
import { NewTableOptions } from "@/types/table";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react";

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
}

const defaultTable : NewTableOptions = {
    name : "" , locationId : ""  // this is very good idea
}

const NewTable = ({ open , setOpen} : Props ) => {
    const locations = useAppSelector(store => store.location.items).filter(item => !item.isArchived);
    const [ newTable , setNewTable ] = useState<NewTableOptions>(defaultTable)
    const dispatch = useAppDispatch();
    const handleCreateTable = () => {
        dispatch(createTable({...newTable , onSuccess : () => {
            setOpen(false);
            setNewTable(defaultTable);
        }}))
    }
    return (
        <Dialog open={open} onClose={() => {
            setOpen(false);
            setNewTable(defaultTable);
        }}>
            <DialogTitle>New Table</DialogTitle>
            <DialogContent sx={{ display : "flex" , flexDirection : "column" , gap : "20px" , width : "300px"}}>
                <TextField label="name" autoFocus sx={{ mt : "10px"}} onChange={(evt) => setNewTable({...newTable , name : evt.target.value })} />
                <FormControl >
                    <InputLabel sx={{ bgcolor : "white"}}> Related Menus </InputLabel>
                    <Select
                      label=" Related location "
                      value={newTable.locationId}
                      onChange={(evt) => setNewTable({...newTable , locationId : Number(evt.target.value)})}
                    >
                      {locations.map(item => 
                        <MenuItem key={item.id} value={item.id}>
                          <ListItemText primary={item.name} />
                        </MenuItem>
                      )}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => {
                    setOpen(false);
                    setNewTable(defaultTable);
                }}>Cancel</Button>
                <Button variant="contained" disabled={!newTable.name || !newTable.locationId} onClick={handleCreateTable}>Comfirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewTable;