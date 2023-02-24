import React, { useEffect } from 'react'
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

  React.useEffect(()=>{

  },[])

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
      <h1 className='text-xl font-semibold text-gray-700'>All Stats</h1>
    <div className='flex justify-between mt-5'>
      {
        isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount}/>
      }
       {
        isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount}/>
      }
       {
        isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount}/>
      }
    </div>
    </>
  )
}

export default Dashboard


const Card = ({count}:any) =>{
  return(
    <div className='flex flex-col justify-center items-center bg-blue-100 px-32 py-5 rounded-md'>
      <div className='text-4xl font-bold text-gray-700'>{count}</div>
      <div className='text-xl font-bold text-gray-700'>Schools</div>
    </div>
  )
}

