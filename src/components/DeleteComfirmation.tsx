import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

interface Props {
    open : boolean;
    setOpen : (value : boolean) => void;
    itemName : string;
    handleDeleteFunction : () => void;
}

const DeleteComfirmation = ({open , setOpen , itemName , handleDeleteFunction } : Props) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure that you want to delete this <span style={{ color : "red"}}>{itemName}</span></Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={() => handleDeleteFunction()}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteComfirmation;