import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2';
import Gun from 'gun';

import gun from '../Connection/P2P';
import { MainListItems } from './Components/Listitems';
import Copyright from './Components/Copyright';
import CardGrid from './Components/CardGrid';
import ItemList from './Components/ItemList';
import Input from './Components/Input';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const SEA = Gun.SEA;
const user = gun.user();
async function fetchData(){
	var blobs = [];
	gun.get('testdave').map().once(async (data,key)=>{
		if(data && data.what){
			var msg = {
				who: gun.get(data).get('alias'),
				what: (await SEA.decrypt(data.what, 'key'))+'',
				when: Gun.state.is(data, 'what')
			}
			if(msg.what)
				blobs.push(msg);
		}
	});
	return blobs;
}

function DashboardContent() {
  	const [open, setOpen] = React.useState(true);
  	const toggleDrawer = () => {
    	setOpen(!open);
  	};
	const [items, setItems] = React.useState([]);

  	React.useEffect(() => {
		fetchData().then(data => {
			setTimeout(()=>{setItems(data)}, 750);
			
		});
		  /*
	  	let messages=[];
		gun.get('testdave').map().on(async (data, key) => {
		  	if(data && data.what){
			  	var msg = {
				  	who: gun.get(data).get('alias'),
				  	what: (await SEA.decrypt(data.what, 'key'))+'',
				  	when: Gun.state.is(data, 'what')
			  	}
			  	if(msg.what){
					// [messages] = [...items, msg];
					return;
			  	}
		  	}
	  	}, true);*/
	  	//const [tmp] = [...items, messages];
	  	//setItems(messages);
	  	//console.log(messages);

	  	return () => {
		  	gun.get('testdave').map().off();
	  	}
  	},[]);

  	async function handleSubmit(event){
		event.preventDefault();
		if(!user.is){
			Swal.fire({
				title: 'Error!',
				text: 'Login!',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
			return; 
		}
		const data = new FormData(event.currentTarget);
		const secret = await SEA.encrypt(data.get('msg'), 'key');
		const msg = user.get('all').set({what: secret});
		const idx = new Date().toISOString();
		gun.get('testdave').get(idx).put(msg);
		console.log(items[0]);
	}

  	function handleAdd(){

  	}

	 // {items.map((item) => <Blob msg={item.what} key={item.when}/>)}

  // console.log(gun.user(user.pub));

  	return (
    	<ThemeProvider theme={mdTheme}>
      		<Box sx={{ display: 'flex' }}>
        		<CssBaseline />
        		<AppBar position="absolute" open={open}>
          			<Toolbar sx={{ pr: '24px', /* keep right padding when drawer closed */}}>
            			<IconButton
              				edge="start" color="inherit"
              				aria-label="open drawer" onClick={toggleDrawer}
              				sx={{
                				marginRight: '36px',
                				...(open && { display: 'none' }),
              				}}
            			>
              				<MenuIcon />
            			</IconButton>
            			<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              				Dashboard
            			</Typography>
						<IconButton color="inherit" onClick={handleAdd}>
			  				<AddCircleOutlineIcon/>
						</IconButton>
            			<IconButton color="inherit">
              				<Badge badgeContent={4} color="secondary">
                				<NotificationsIcon />
              				</Badge>
            			</IconButton>
          			</Toolbar>
        		</AppBar>
        		<Drawer variant="permanent" open={open}>
          			<Toolbar
            			sx={{
              			display: 'flex',
              			alignItems: 'center',
              			justifyContent: 'flex-end',
              			px: [1],
            			}}
          			>
            			<IconButton onClick={toggleDrawer}>
              				<ChevronLeftIcon />
            			</IconButton>
          			</Toolbar>
          			<Divider />
          			<List component="nav">
            			<MainListItems/>
          			</List>
        		</Drawer>
        		<Box component="main" sx={{ backgroundColor: (theme) =>
        	      		theme.palette.mode === 'light'
        	        	? theme.palette.grey[100]
        	        	: theme.palette.grey[900],
        	    	flexGrow: 1,
        	    	height: '100vh',
        	    	overflow: 'auto',
        	  		}}
        		>
        	  		<Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
		  				<Input handler={handleSubmit}/>
						<ItemList items={items}/>
            			<Grid container spacing={3}>
              				<Grid item xs={12} md={4} lg={3}>
                				<Paper
                	  				sx={{
                	    			p: 2,
                	    			display: 'flex',
                	    			flexDirection: 'column',
                	    			height: 240,
                	  			}}
                				>
									paper
                				</Paper>
              				</Grid>
              				<Grid item xs={12} md={2}>
                				<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
									le
                				</Paper>
              				</Grid>
            			</Grid>
            			<Copyright sx={{ pt: 4 }} />
        	  		</Container>
        		</Box>
      		</Box>
    	</ThemeProvider>
	);
}

export default function Dashboard() {
  return <DashboardContent />;
}