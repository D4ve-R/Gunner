import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import {useGun} from '../../../hooks/useGun';

export default function Bar(props) {
  const gun = useGun();
  const user = gun.user();
	const navigate = useNavigate();
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
            { 'Dings'}
          </Typography>
          {user.is ? (<Button color="inherit" onClick={()=>{navigate('/dashboard')}}>Dashboard</Button>)
          :(<Button color="inherit" onClick={()=>{navigate('/signin')}}>Login</Button>)}
		  	 
        </Toolbar>
      </AppBar>
    </>
  );
}