import React from 'react'
import { schoolCount, refreshToken } from '../http/api'
import Skeleton from '@mui/material/Skeleton';
import bg from '../Assets/bg.svg'
import { useAppSelector } from '../store/hook';

export interface ParentCompProps {
  title: string
  content: string
}

const Dashboard = ({ title, content }: ParentCompProps) => {

  const { token } = useAppSelector(state => state.auth)


  React.useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content)
  }, [content, title])

  React.useEffect(() => {

  }, [])

  const [schoolcount, setSchoolCount] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    schoolCount(token).then((res) => {
      setIsLoading(false)
      setSchoolCount(res.data.schoolCount)
    })
  }, [])


  // clear all the cookie and local storage



  const handleRefreh = async () => {
    refreshToken().then((data: any) => {
      console.log(data)
    }
    ).catch((err: any) => {
      console.log(err)

    })
  }

  return (
    <>
      <h1 className='text-gray-700 font-semibold text-2xl'>All Stats</h1>
      <button className='px-10 py-2 bg-red-400 mt-3 rounded-md text-gray-50' onClick={handleRefreh} type="button">Refresh Tkn</button>
      <div className='flex justify-between mt-5'>
        {
          isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount} />
        }
        {
          isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount} />
        }
        {
          isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount} />
        }
        {
          isLoading ? <Skeleton variant="text" width={310} height={180} /> : <Card count={schoolcount} />
        }
      </div>
    </>
  )
}

export default Dashboard


const Card = ({ count }: any) => {
  return (
    <div className='w-72 px-10 flex items-center gap-3 py-10 rounded-md shadow-md bg-image' style={{ backgroundImage: `url(${bg})` }}>
      <div className='text-4xl font-bold text-gray-600'>{count}</div>
      <div className='text-xl font-bold text-gray-500 uppercase'>Schools</div>
    </div>
  )
}

