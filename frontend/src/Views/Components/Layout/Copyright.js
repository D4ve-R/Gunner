import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

export default function Copyright({fixed}) {
	return (
	<Box sx={{position: 'fixed', bottom: 0, alignSelf: 'center', width:'100%', mb:1}}>
	  <Typography variant="body2" color="text.secondary" align="center">
		{'Copyright © '}
		<Link color="inherit" to="/">
		  Dingiverse
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	</Box>
	);
  }