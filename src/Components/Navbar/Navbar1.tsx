import React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
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
import { Outlet, Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SchoolIcon from '@mui/icons-material/School';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsIcon from '@mui/icons-material/Sports';
import SupportIcon from '@mui/icons-material/Support';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../../Assets/LOGO.png'
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import useSound from 'use-sound'
import logoutSound from '../../Assets/sounds/logout.mp3'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import UploadIcon from '@mui/icons-material/Upload';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CategoryIcon from '@mui/icons-material/Category';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ProfileModel from '../Settings/ProfileModel';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { logoutApi } from '../../http/api'

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



const Navbar1 = () => {

    const theme = useTheme();

    const [open, setOpen] = React.useState(true);

    const [openProfile, setOpenProfile] = React.useState(false);

    const [schoolMenu, setSchoolMenu] = React.useState(false);
    const [gymMenu, setGymMenu] = React.useState(false);
    const [sportsMenu, setSportsMenu] = React.useState(false);
    const [coreMenu, setCoreMenu] = React.useState(false);
    const [lms, setLms] = React.useState(false)
    const [blogMenu, setBlogMenu] = React.useState(false);
    const [nutritionMenu, setNutritionMenu] = React.useState(false);
    const [packageMenu, setPackageMenu] = React.useState(false);
    const [mobileMenu, setMobileMenu] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const auth = useSelector((state: any) => state.auth)

    const isMute = useSelector((state: any) => state.auth.user?.isMute.logoutNotification)


    React.useEffect(() => {
    }, [auth])

    const localUser = JSON.parse(localStorage.getItem('userState') || '{}')





    const firstInitial = auth.user?.name?.charAt(0) || localUser?.user?.name?.charAt(0)
    const lastInitial = auth.user?.name?.split(" ").pop().charAt(0) || localUser?.user?.name?.split(" ").pop().charAt(0)

    const intials = firstInitial + lastInitial


    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [playLogout] = useSound(logoutSound)


    const handleLogout = async () => {
        if (isMute) {
            playLogout()
        }
        logoutApi().then((res) => {
            if (res.data.success) {
                dispatch(logout())
                return navigate('/login')
            }
        }).catch((err) => {
            console.log(err)
        })
    }



    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ background: "#1a2f59" }}>
                <div className='flex items-center justify-between'>
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
                        </Typography>
                    </Toolbar>
                    {/* profile image and name */}
                    <div className='mr-5 px-2 py-1 rounded-md flex items-center justify-center gap-2 relative' onClick={() => setOpenProfile(!openProfile)}>
                        {
                            auth?.user?.profilePic ? <img src={auth?.user?.profilePic} alt="profile" className='w-10 h-10 rounded-full object-cover' /> :
                                <div className='bg-orange-300 border-orange-200 drop-shadow-md rounded-full px-[11px] py-[10px] tracking-wide pointer-events-none'>
                                    <p className='text-[18px]'>{intials}</p>
                                </div>
                        }
                        <p className='text-gray-50'>Hi, {auth?.user?.name || 'ERR'}</p>
                        {openProfile && <ProfileModel data={auth} setOpenProfile={setOpenProfile} profile={auth?.user?.profilePic} intials={intials} />}
                    </div>
                </div>
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
                    {
                        [999]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <Link to="/">
                                    <ListItem key="Dashboard" disablePadding sx={{ display: 'block' }}>
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
                                                <DashboardOutlinedIcon sx={{ color: '#2192FF' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </> : null
                    }
                    {/* nutrisit dashboard */}
                    {/* {
                        [91]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <Link to="/">
                                    <ListItem key="Dashboard" disablePadding sx={{ display: 'block' }}>
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
                                                }} >
                                                <DashboardIcon sx={{ color: '#2192FF' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </> : null
                    } */}
                    {
                        open ? [91]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* users */}
                    {
                        [91]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <Link to="/users">
                                    <ListItem key="users" disablePadding sx={{ display: 'block' }}>
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
                                                <ManageAccountsOutlinedIcon sx={{ color: '#1cbf2a' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </> : null
                    }
                    {
                        open ? [92]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {
                        [91]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <Link to="/my-client">
                                    <ListItem key="MY-Client" disablePadding sx={{ display: 'block' }}>
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
                                                <PeopleOutlineIcon sx={{ color: '#0b00a1' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="My Clients" sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </> : null

                    }
                    {
                        open ? [92]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* nutrition */}
                    {
                        [92]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Nutrition" onClick={() => setNutritionMenu(!nutritionMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <NoteAltOutlinedIcon sx={{ color: '#1bc5d1' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Nutrition" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? nutritionMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={nutritionMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [921]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="add-ingridienents">
                                                            <ListItem key="Create Employe" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: nutritionMenu ? 'initial' : 'center',
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
                                                                        <DonutSmallIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Add Ingridienents" sx={{ opacity: open ? nutritionMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* FilterListOutlinedIcon */}
                                            {
                                                [922]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="view-ingridienents">
                                                            <ListItem key="Create Employe" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: nutritionMenu ? 'initial' : 'center',
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
                                                                        <FilterListOutlinedIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="View Ingridienents" sx={{ opacity: open ? nutritionMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [923]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="recipie-categoies">
                                                            <ListItem key="Recipies" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: nutritionMenu ? 'initial' : 'center',
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
                                                                        <AutoAwesomeMosaicIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Recipies Categories" sx={{ opacity: open ? nutritionMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* meal frequency */}
                                            {
                                                [924]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="meal-frequency">
                                                            <ListItem key="frequency" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: nutritionMenu ? 'initial' : 'center',
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
                                                                        <RestaurantOutlinedIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Meal frequency" sx={{ opacity: open ? nutritionMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* Recipie */}
                                            {
                                                [925]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="create-new-recipie">
                                                            <ListItem key="frequency" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: nutritionMenu ? 'initial' : 'center',
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
                                                                        <LocalDiningOutlinedIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Recipies" sx={{ opacity: open ? nutritionMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [82]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {
                        [82]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="mobile" onClick={() => setMobileMenu(!mobileMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <MobileFriendlyIcon sx={{ color: '#323131' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Mobile" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? mobileMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={mobileMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [821]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="mobile-banner">
                                                            <ListItem key="banner" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: mobileMenu ? 'initial' : 'center',
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
                                                                        <ViewCarouselIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Banner" sx={{ opacity: open ? mobileMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [822]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="list-package">
                                                            <ListItem key="List Package" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: mobileMenu ? 'initial' : 'center',
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
                                                                        <CategoryIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>

                                                                    <ListItemText primary="List Package" sx={{ opacity: open ? mobileMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [93]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* package */}
                    {
                        [93]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Packges" onClick={() => setPackageMenu(!packageMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <LocalOfferOutlinedIcon sx={{ color: '#ef2926' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Packges" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? packageMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={packageMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [931]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="new-create-package">
                                                            <ListItem key="Create Package" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: packageMenu ? 'initial' : 'center',
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

                                                                        <BookmarkAddIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Create Package" sx={{ opacity: open ? packageMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [932]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="list-package">
                                                            <ListItem key="List Package" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: packageMenu ? 'initial' : 'center',
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
                                                                        <CategoryIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>

                                                                    <ListItemText primary="List Package" sx={{ opacity: open ? packageMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [94]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* core opration */}
                    {
                        [94]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Core Circle" onClick={() => setCoreMenu(!coreMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <AdminPanelSettingsOutlinedIcon sx={{ color: '#fd8a0f' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Core Operation" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? coreMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={coreMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [941]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="create-emp">
                                                            <ListItem key="Create Employe" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: coreMenu ? 'initial' : 'center',
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

                                                                        <GroupAddIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Create Employee" sx={{ opacity: open ? coreMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [942]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="emp-permission">
                                                            <ListItem key="Permission" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: coreMenu ? 'initial' : 'center',
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

                                                                    <ListItemText primary="Permission" sx={{ opacity: open ? coreMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [95]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* school */}
                    {
                        [95]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="School Circle" onClick={() => setSchoolMenu(!schoolMenu)} disablePadding sx={{ display: 'block', borderBottom: '2px' }}>
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
                                            <SchoolIcon sx={{ color: '#6cbde0' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="School Circle" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? schoolMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={schoolMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [951]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
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
                                                                    <ListItemText primary="Create School" sx={{ opacity: open ? schoolMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [952]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
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

                                                                    <ListItemText primary="Edit School" sx={{ opacity: open ? schoolMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [96]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* Linktree */}
                    {
                        [96]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <Link to="/">
                                    <ListItem key="linktree" disablePadding sx={{ display: 'block' }}>
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
                                                <AccountTreeIcon sx={{ color: '#d33bee' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Link Tree" sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            </> : null
                    }
                    {
                        open ? [97]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* fitness FitnessCenterIcon */}
                    {
                        [97]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Gym Circle" onClick={() => setGymMenu(!gymMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <FitnessCenterIcon sx={{ color: '#0e76de' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Gym Circle" sx={{ opacity: open ? 1 : 0 }} />
                                        {
                                            open ? gymMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={gymMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [971]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
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
                                                                    <ListItemText primary="Create Gym" sx={{ opacity: open ? gymMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [972]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
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
                                                                    <ListItemText primary="Edit Gym" sx={{ opacity: open ? gymMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </> : null
                    }
                    {
                        open ? [98]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* Academy */}
                    {
                        [98]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Academy Circle" onClick={() => setSportsMenu(!sportsMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <SportsVolleyballOutlinedIcon sx={{ color: '#C47AFF' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Academy Circle" sx={{ opacity: open ? 1 : 0 }} />
                                        {
                                            open ? sportsMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    {/* collapse menu */}
                                    <Collapse in={sportsMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [981]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="Create-academy">
                                                            <ListItem key="Create Academy" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: sportsMenu ? 'initial' : 'center',
                                                                        px: 2.5,
                                                                        background: false ? '#1d3d7d' : '#5581a8',
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
                                                                    <ListItemText primary="Create Academy" sx={{ opacity: open ? sportsMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }

                                            {/* second view */}
                                            {
                                                [982]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="/edit-gym">
                                                            <ListItem key="AcademyControl" disablePadding sx={{ display: 'block' }}>
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
                                                                    <ListItemText primary="Academy Control" sx={{ opacity: open ? sportsMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>  </> : null
                                            }
                                            {/* coache */}
                                            {
                                                [983]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="/create-coach">
                                                            <ListItem key="academy coach" disablePadding sx={{ display: 'block' }}>
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
                                                                        <SportsIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Create Coach" sx={{ opacity: open ? sportsMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>  </> : null
                                            }
                                        </List>

                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                    {
                        open ? [90]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* LMS */}
                    {
                        [90]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="LMS" onClick={() => setLms(!lms)} disablePadding sx={{ display: 'block' }}>
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
                                            <SchoolOutlinedIcon sx={{ color: '#6D67E4' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="LMS" sx={{ opacity: open ? 1 : 0 }} />
                                        {
                                            open ? lms ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={lms} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [901]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="new-course-enroll">
                                                            <ListItem key="Create Course" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: lms ? 'initial' : 'center',
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
                                                                        <NoteAddIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="Create Course" sx={{ opacity: open ? lms ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* edit view */}
                                            {
                                                [901]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="/view-course">
                                                            <ListItem key="view Course" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: lms ? 'initial' : 'center',
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
                                                                        <CastForEducationIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>
                                                                    <ListItemText primary="View Course" sx={{ opacity: open ? lms ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {
                                                [909]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="/edit-gym">
                                                            <ListItem key="Edit Course" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: lms ? 'initial' : 'center',
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
                                                                    <ListItemText primary="Edit Course" sx={{ opacity: open ? lms ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </> : null
                    }
                    {
                        open ? [81]?.find((role: any) => auth.user?.role?.includes(role)) ? <Divider /> : null : null
                    }
                    {/* Blog */}
                    {
                        [81]?.find((role: any) => auth.user?.role?.includes(role))
                            ?
                            <>
                                <ListItem key="Blog" onClick={() => setBlogMenu(!blogMenu)} disablePadding sx={{ display: 'block' }}>
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
                                            <RssFeedIcon sx={{ color: '#eb4646' }} />
                                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                        </ListItemIcon>
                                        <ListItemText primary="Blog" sx={{ opacity: open ? 1 : 0 }} />
                                        {/* down arrow */}
                                        {
                                            open ? blogMenu ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> : null
                                        }
                                    </ListItemButton>
                                    <Collapse in={blogMenu} timeout="auto" unmountOnExit sx={{ background: '#1d3d7d' }}>
                                        <List component="div" disablePadding>
                                            {
                                                [811]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="blog/new">
                                                            <ListItem key="create blog" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: blogMenu ? 'initial' : 'center',
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
                                                                    <ListItemText primary="Post New Blog" sx={{ opacity: open ? blogMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* second view */}
                                            {
                                                [812]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="blog/edit-blog">
                                                            <ListItem key="Edit Blog" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: blogMenu ? 'initial' : 'center',
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

                                                                    <ListItemText primary="Edit Blog" sx={{ opacity: open ? blogMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* third view */}
                                            {
                                                [813]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="blog/upload-banner">
                                                            <ListItem key="Upload Banner" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: blogMenu ? 'initial' : 'center',
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
                                                                        <UploadIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>

                                                                    <ListItemText primary="Upload Banner" sx={{ opacity: open ? blogMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* Edit banner */}
                                            {
                                                [814]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="blog/edit-banner">
                                                            <ListItem key="edit Banner" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: blogMenu ? 'initial' : 'center',
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
                                                                        <WallpaperIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>

                                                                    <ListItemText primary="Edit Banner" sx={{ opacity: open ? blogMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                            {/* StackedBarChartIcon */}
                                            {
                                                [815]?.find((role: any) => auth.user?.role?.includes(role))
                                                    ?
                                                    <>
                                                        <Link to="blog/statics">
                                                            <ListItem key="Blog Statics" disablePadding sx={{ display: 'block' }}>
                                                                {/* text with button */}
                                                                <ListItemButton
                                                                    sx={{
                                                                        minHeight: 48,
                                                                        justifyContent: blogMenu ? 'initial' : 'center',
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
                                                                        <StackedBarChartIcon sx={{ color: '#fff' }} />
                                                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                                                    </ListItemIcon>

                                                                    <ListItemText primary="Blog Statics" sx={{ opacity: open ? blogMenu ? 1 : 1 : 0, color: '#fff' }} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        </Link>
                                                    </> : null
                                            }
                                        </List>
                                    </Collapse>
                                </ListItem>
                            </>
                            : null
                    }
                </List>

                <Divider />
                <List>
                    {/* setting */}
                    <Link to="/settings">
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
                                    <SettingsOutlinedIcon color='info' />
                                </ListItemIcon>
                                <ListItemText primary="Setting" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    {/* support */}
                    <Link to="/support">
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
                                    <SupportIcon color='error' />
                                </ListItemIcon>
                                <ListItemText primary="Support" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
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
                                <ExitToAppIcon color='secondary' />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    )
}

export default Navbar1