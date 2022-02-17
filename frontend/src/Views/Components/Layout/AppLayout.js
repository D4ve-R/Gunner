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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { MainListItems } from '../Listitems';


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

export const NotifyContext = React.createContext();
  
const Notify = () => {
  const noteCount = React.useContext(NotifyContext);
    return (
        <>
          <IconButton color="inherit">
            <Badge badgeContent={noteCount.count} color="secondary">
              <NotificationsIcon />
              </Badge>
          </IconButton>
        </>
  
    );
}
  
const mdTheme = createTheme();
  
function AppContent({children}) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [notes , setNotes] = React.useState(0);
    function handleNotifications(notes){
        setNotes(notes);
    }
  
    return (
        <ThemeProvider theme={mdTheme}>
          <NotifyContext.Provider value={{count: notes,setCount: handleNotifications}}>
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
                          <IconButton color="inherit" onClick={(e)=>{}}>
                                <AddCircleOutlineIcon/>
                          </IconButton>
                          <Notify />
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
                        {children}
                  </Box>
                </Box>
              </NotifyContext.Provider>
          </ThemeProvider>
      );
  }
  
export default function AppLayout({children}) {
    return <AppContent children={children} />;
}