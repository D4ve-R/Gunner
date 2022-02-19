import React from 'react';
import Container from '@mui/material/Container';

import FileUpload from './Components/FileUpload/FileUpload';


const Upload = () => {
    window.addEventListener('drop', (e) => {e.stopPropagation(); e.preventDefault();});
    window.addEventListener('dragover', (e) => {e.stopPropagation(); e.preventDefault();});
    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <FileUpload/>
        </Container>
    );
}

export default Upload