import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import FileUpload from './Components/FileUpload/FileUpload';
import Gun3d from './Components/Gun/Gun3d';
import Copyright from './Components/Layout/Copyright';

const Viewer = () => {
    const [url, setUrl] = React.useState('');
    function handleFile(file){
      setUrl(URL.createObjectURL(file));
    }
    return (
      <Paper sx={{p:1, display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        <FileUpload onChange={handleFile}/>
        <Gun3d url={url} width={'400px'} height={'200px'}/>
      </Paper>
    );
}

const Upload = () => {
    window.addEventListener('drop', (e) => {e.stopPropagation(); e.preventDefault();});
    window.addEventListener('dragover', (e) => {e.stopPropagation(); e.preventDefault();});
    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Viewer/>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    );
}

export default Upload