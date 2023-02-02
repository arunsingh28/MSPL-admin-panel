import React from 'react'
import {schoolCount} from '../http/api'
import Skeleton from '@mui/material/Skeleton';

export interface ParentCompProps {
  title: string
  content: string
}

const Dashboard = ({title,content}:ParentCompProps) => {
  React.useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content',content)
  },[content, title])

  const [schoolcount,setSchoolCount] = React.useState(0)
  const [isLoading,setIsLoading] = React.useState(true)

  React.useEffect(()=>{
    setIsLoading(true)
    schoolCount().then((res)=>{
      setIsLoading(false)
      setSchoolCount(res.data.schoolCount)
    })
  },[])
  return (
    <>

    <div className='flex justify-between'>
      {/* For variant="text", adjust the height via font-size */}
      {/* <Skeleton variant="circular" width={40} height={40} /> */}
      {/* <Skeleton variant="rectangular" width={210} height={60} /> */}
      {
        isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount}/>
      }
      {/* <Skeleton variant="rounded" width={310} height={180}  /> */}
      {/* <Skeleton variant="rounded" width={310} height={180}  /> */}
    </div>
    </>
  )
}

export default Dashboard


const Card = ({count}:any) =>{
  return(
    <div className='flex flex-col justify-center items-center'>
      <div className='text-4xl font-bold text-gray-700'>{count}</div>
      <div className='text-xl font-bold text-gray-700'>Schools</div>
    </div>
  )
}