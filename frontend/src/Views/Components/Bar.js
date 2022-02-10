import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import gun from '../../Connection/P2P';

export default function Bar(props) {
	const navigate = useNavigate();

	function handleLogout(){
		gun.user.leave();
		navigate('/');
		return;
	}

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { props.user != '' ? 'Hi, ' + props.user : 'Dings'}
          </Typography>
          { props.user != '' ? 
		  	(<Button color="inherit" onClick={()=>{navigate('/dashboard')}}>Dashboard</Button>) 
		  	: (<Button color="inherit" onClick={()=>{navigate('/signin')}}>Login</Button>)
		  }
        </Toolbar>
      </AppBar>
    </>
  );
}