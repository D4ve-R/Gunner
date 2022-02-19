import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ListItem = ({item, id}) => {
    return (
        <Paper sx={{display: 'flex', pl:1, m:1}} elevation={4}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                {item.name ? item.name : 'No Name'}
            </Typography>
            <IconButton>
                <AddCircleOutlineIcon/>
            </IconButton>
            <IconButton >
                <DeleteForeverIcon/>
            </IconButton>
        </Paper>
    );
}

const FileList = ({file, height=200}) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log("Adding file ", file);
        const reader = new FileReader();

        if(file !== null){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                console.log(reader.result);
            }
            setFiles(prev => [file, ...prev]);
        }
    }, [file]);

    

    return (
        <>
        <Box>
            <Paper sx={{p:1, overflow: 'auto', maxHeight: height, height: '100vh'}}>
                Files
                {files.map((f, id) => (<ListItem key={id} id={id} item={f}/>))}
            </Paper>
        </Box>
        </>
    );
}

export default FileList;