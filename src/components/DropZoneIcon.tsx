import { Box } from "@mui/material"
import { useDropzone } from "react-dropzone"
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
    setSelectedImage : (value : File) => void;
}

const DropZoneIcon = ( {setSelectedImage} : Props) => {
    const onDrop = ( acceptedFiles : File[]) => {
        setSelectedImage(acceptedFiles[0]);
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <Box {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? <ArrowDownwardIcon sx={{ fontSize : "50px" }} /> 
        : <WifiProtectedSetupIcon sx={{ fontSize : "50px" , cursor : "pointer" }} titleAccess="Change Photo" />
        }
      </Box>
    )
}

export default DropZoneIcon;