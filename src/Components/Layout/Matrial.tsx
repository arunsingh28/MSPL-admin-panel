import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, Link,useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsIcon from '@mui/icons-material/Sports';
import SupportIcon from '@mui/icons-material/Support';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../../Assets/LOGO.png'
import { Collapse, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PencilIcon from '../../Assets/icons/icons8-pencil-16.png'
import useSound from 'use-sound'
import logoutSound from '../../Assets/sounds/logout.mp3'

import {authContext} from '../../Pages/Login'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [schoolMenu, setSchoolMenu] = React.useState(false);
  const [gymMenu, setGymMenu] = React.useState(false);
  const [sportsMenu, setSportsMenu] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isAuth = React.useContext(authContext);

  const [playLogout] = useSound(logoutSound)

  React.useEffect(()=>{
  },[isAuth.isLoggedIn])


  const navigate = useNavigate();


  const handleLogout = ()=>{
    playLogout()
    console.log('Logout',isAuth.isLoggedIn)
    isAuth.isLoggedIn = false
    navigate('/login')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{background:"#1a2f59"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            <img src={Logo} className="w-32 h-16" alt='logo' />
            {/* <div className='font-semibold'> SportyLife (CRM)</div> */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Home */}
          <Link to="/">
            <ListItem key="Home" disablePadding sx={{ display: 'block' }}>
              {/* text with button */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                {/* icons here */}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }} >
                  <HomeIcon sx={{ color: '#444' }} />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* school */}
            <ListItem key="School Opration" onClick={()=>setSchoolMenu(!schoolMenu)} disablePadding sx={{ display: 'block' }}>
              {/* text with button */}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                {/* icons here */}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }} >
                  <SchoolIcon />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary="School Opration" sx={{ opacity: open ? 1 : 0 }} />
                {/* down arrow */}
                {
                  open ? schoolMenu ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon /> : null
                }
              </ListItemButton>
              <Collapse in={schoolMenu} timeout="auto" unmountOnExit sx={{background: '#1d3d7d'}}>
                <List component="div" disablePadding>
                <Link to="create-school">
                  <ListItem key="Create School" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: schoolMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                          
                        <AddIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary="Create School" sx={{ opacity: open ? schoolMenu ? 1 : 1 : 0, color: '#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                  {/* second view */}
                  <Link to="/edit-school">
                  <ListItem key="Edit School" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: schoolMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                        <EditIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                     </ListItemIcon>
                    
                      <ListItemText primary="Edit School" sx={{ opacity: open ? schoolMenu ? 1 : 1 : 0,color: '#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                </List>
              </Collapse>
            </ListItem>
          {/* fitness FitnessCenterIcon */}
          <ListItem key="Gym Opration" onClick={()=>setGymMenu(!gymMenu)} disablePadding sx={{ display: 'block'}}>
            {/* text with button */}
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              {/* icons here */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }} >
                <FitnessCenterIcon />
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary="Gym Opration" sx={{ opacity: open ? 1 : 0 }} />
              {
                  open ? gymMenu ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon /> : null
              }
            </ListItemButton>
            <Collapse in={gymMenu} timeout="auto" unmountOnExit sx={{background: '#1d3d7d'}}>
                <List component="div" disablePadding>
                <Link to="create-school">
                  <ListItem key="Create Gym" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: gymMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                          
                        <AddIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary="Create Gym" sx={{ opacity: open ? gymMenu ? 1 : 1 : 0,color:'#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                  {/* second view */}
                  <Link to="/edit-gym">
                  <ListItem key="Edit Gym" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: gymMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                        <EditIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary="Edit Gym" sx={{ opacity: open ? gymMenu ? 1 : 1 : 0,color:'#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                </List>
              </Collapse>
          </ListItem>
          {/* Academy */}
          <ListItem key="Academy Opration" onClick={()=>setSportsMenu(!sportsMenu)} disablePadding sx={{ display: 'block' }}>
            {/* text with button */}
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              {/* icons here */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }} >
                <SportsIcon />
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary="Academy Opra.." sx={{ opacity: open ? 1 : 0 }} />
              {
                  open ? sportsMenu ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon /> : null
              }
            </ListItemButton>
            {/* collapse menu */}
            <Collapse in={sportsMenu} timeout="auto" unmountOnExit sx={{background: '#1d3d7d'}}>
                <List component="div" disablePadding>
                <Link to="create-school">
                  <ListItem key="Create Gym" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: sportsMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                          
                        <AddIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary="Create Gym" sx={{ opacity: open ? sportsMenu ? 1 : 1 : 0,color:'#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                  {/* second view */}
                  <Link to="/edit-gym">
                  <ListItem key="Edit Gym" disablePadding sx={{ display: 'block' }}>
                    {/* text with button */}
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: sportsMenu ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      {/* icons here */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }} >
                        <EditIcon sx={{ color: '#fff' }} />
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      </ListItemIcon>
                      <ListItemText primary="Edit Gym" sx={{ opacity: open ? sportsMenu ? 1 : 1 : 0, color:'#fff'}} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                </List>
              </Collapse>
          </ListItem>
        </List>

        <Divider />
        <List>
          {/* setting */}
          <ListItem key="Setting" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* support */}
          <ListItem key="Support" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SupportIcon />
              </ListItemIcon>
              <ListItemText primary="Support" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* logout ExitToAppIcon */}
          <ListItem key="Logout" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* all component display here */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}