import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

interface Props {
    openWarningLocation : boolean;
    setOpenWarningLocation : (value : boolean) => void;
}

const WarningLocation = ( {openWarningLocation , setOpenWarningLocation } : Props) => {
    return (
            <Dialog open={openWarningLocation} >
                <DialogTitle>
                    <Typography variant="h5">Warning</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>You are deleting the selected location ! Please , <span style={{color : "red"}}>select the other location</span>  and try again !</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenWarningLocation(false)} >Ok</Button>
                </DialogActions>
            </Dialog>
    )
}

export default WarningLocation;