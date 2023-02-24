import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';

const Layout = () => {
  
  return (
    <Box>
     <Grid container component={'div'} sx={{display: {xs: 'none', md: 'flex'}}} >
       <Grid xs={2} md={2}>
        <Navbar/>
        </Grid>
        <Grid xs={10} md={10}>
        <Outlet />
        </Grid>
     </Grid>
      {/* for small screen message */}
      <div className='sm-message hidden px-5 py-10 z-40'>
        <h1 className='font-mono mt-10'>Error Code:<span className='font-semibold'>sm-scr</span></h1>
        <p className='mt-10 text-xl font-light bg-red-500 px-2 py-3 rounded-sm shadow-lg text-gray-200'>It seems that you are using Mobile phone or tablet.</p>
        <h1 className='mt-5 underline'>Solution : </h1>
        <p className='mt-2'>Use Desktop or laptop (support only screen which have more then 700px)</p>
      </div>
    </Box>
  )
}

export default Layout



// {/* <div className='flex dkt'>
// <div className='flex-1 w-[210px] fixed top-0 left-0'>
//   <Navbar />
// </div>
// <div className='flex-1 fixed top-0 w-full left-32'>
// <div className='container mx-auto'>        
//   <Outlet />
//   </div>
// </div>
// </div> */}