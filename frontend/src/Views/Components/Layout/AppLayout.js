import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
//import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Badge, IconButton, Divider, Typography, List, Toolbar, Box, CssBaseline } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { lightMode, darkMode } from './modes';


import DrawerList from './DrawerList';


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

function modeReducer(mode){
  switch(mode){
    case 'light':
      return lightMode;
    case 'dark':
      return darkMode;
    default:
      return lightMode;
  }
}
  
function AppContent({children}) {
    const location = useLocation();
    const here = location.pathname.replace('/', '');
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [mode, setMode] = React.useState('light');
    const theme = React.useMemo(() => createTheme(modeReducer(mode)), [mode]);
    function toggleMode(){
      setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    const [notes , setNotes] = React.useState(0);
    function handleNotifications(notes){
        setNotes(notes);
    }
  
    return (
        <ThemeProvider theme={theme}>
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
                                {here.charAt(0).toUpperCase() + here.slice(1)}
                          </Typography>
                          <IconButton color="inherit" onClick={toggleMode}>
                                {theme.palette.mode === 'dark ' ? <Brightness7Icon/> : <Brightness4Icon/>}
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
                          <DrawerList/>
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