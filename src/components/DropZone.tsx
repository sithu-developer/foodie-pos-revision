import { Box } from "@mui/material"
import { useDropzone } from "react-dropzone"

interface Props {
    setSelectedImages : (value : File[]) => void;
}

const DropZone = ( {setSelectedImages} : Props) => {
    const onDrop = ( acceptedFiles : File[]) => {
        setSelectedImages(acceptedFiles);
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <Box {...getRootProps()} sx={{ display : "flex" , justifyContent : "center" , border : "dotted" , borderRadius : "10px" , cursor : "pointer"}}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the file here ...</p> :
            <p>Drop some file here, or click to select file</p>
        }
      </Box>
    )
}

export default DropZone;