import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function handleDefaults(event){
    event.preventDefault();
    event.stopPropagation();
}

const DragDrop = ({handleUpload, onDrop, width = '400px', height = '200px', bgColor='#bababa', labelText = 'Click or Drag&drop file here'}) => {
    //window.addEventListener('drop', handleDefaults);
    //window.addEventListener('dragover', handleDefaults);
    const [label, setLabel] = useState(labelText);
    
    function handleDragEnter(e){
        handleDefaults(e);
        setLabel('Drop file here');
    }

    function handleDragLeave(e){
        handleDefaults(e);
        setLabel(labelText);
    }

    function handleChange(e){
        handleUpload(e.target.files[0]);
        setLabel(labelText);
    }

    function handleDrop(e){
        handleDefaults(e);
        handleUpload(e.dataTransfer.files[0]);
        setLabel(labelText);
    }

  return (
    <>
    <Box width={width} height={height}>
        <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={handleChange}
            hidden
        />
        <label htmlFor="fileUpload" onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={e => handleDefaults} sx={{pointerEvents: 'none'}}>
            <Box 
                width={width} height={height} bgcolor={bgColor}
                style={{pointerEvents: 'none'}}
                sx={{borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
            >
                <CloudUploadIcon fontSize="large" sx={{ mb: 1, color: 'primary'}}/>
                <Typography variant="h6">
                    {label}
                </Typography>
            </Box>
        </label>
    </Box>
    </>
  )
}

export default DragDrop;