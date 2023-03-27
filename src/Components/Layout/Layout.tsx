import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Navbar1 from '../Navbar/Navbar1';




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function MiniDrawer() {


  const location = useLocation()


  const getUser = localStorage.getItem('user')
  const user = JSON.parse(getUser || '{}')
  console.log(user)
  const getAuth = localStorage.getItem('isAuth')
  const isAuth = JSON.parse(getAuth || '{}')
  console.log(isAuth)

  const from = location.state?.from?.pathname || '/'




  return (
    <>
      {
        true ? <Box sx={{ display: 'flex' }}>
          <Navbar1 />
          {/* all component display here */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {/* workpsace outlet app.tsx */}
            <Outlet />
          </Box>
        </Box> : <Navigate to="/login" state={{ from: location }} replace />
      }
    </>
  );
}