import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';

import DragDrop from './DragDrop';
import FileList from './FileList';
import Gun3d from '../Gun/Gun3d';

window.addEventListener('drop', (e) => {e.stopPropagation(); e.preventDefault();});
window.addEventListener('dragover', (e) => {e.stopPropagation(); e.preventDefault();});

const FileUpload = () => {
    const [file, setFile] = useState(null);
    function handleFile(file){
        console.log(file);
      setFile(file);
    }
    return (
      <Paper sx={{p:2}}>
          <Grid container spacing={2} >
              <Grid item xs={12} md={8} >
                <DragDrop width={'600px'} handleUpload={handleFile}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <FileList file={file} />
              </Grid>
              <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Gun3d url={file ? URL.createObjectURL(file) : ''} width={'1000px'} height={'500px'}/>
              </Grid>
          </Grid>
      </Paper>
    );
}

export default FileUpload;