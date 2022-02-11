import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Input = (props) => {
  return (<>
        <Box component="form" noValidate onSubmit={props.handler} sx={{ mt: 6, mb: 1 }}>
		  			<Paper
                  		sx={{
                    		p: 2,
							maxWidth: "sm",
                    		display: 'flex',
                    		flexDirection: 'column',
                    		height: 200,
                  		}}
                	>
              			<TextField
                			margin="normal"	required
                			fullWidth id="msg"
                			label="In" name="msg"
							autoFocus
              			/>
			  			<Button
                			type="submit" fullWidth
                			variant="contained" sx={{ mt: 3, mb: 2 }}
            			>
                			Submit
              			</Button>
			  		</Paper>
				</Box>
  </>);
};

export default Input;
