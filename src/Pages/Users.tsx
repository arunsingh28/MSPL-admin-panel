import React from 'react'
import { ParentCompProps } from './Dashboard'
import { getAllUsers } from '../http/api'
import UserTable from '../Components/UserView/UserTable'
import CircularProgress from '@mui/material/CircularProgress';


const Users = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allUser, setAllUser] = React.useState<any>()

    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        getAllUsers().then(res => {
            console.log(res.data)
            setAllUser(res.data)
            setIsLoading(true)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoading(true)
        })
    }, [])

    return (
        <div>
            <h1 className='text-gray-700 font-semibold text-2xl'>All Users</h1>
            {/* table */}
            <div className='mt-5'>
                {
                    isLoading ? <UserTable allUser={allUser} /> :
                        <div className='flex flex-col justify-center items-center py-2 mt-10'>
                            <p className='text-gray-700 text-sm mr-2 mb-2'>Please wait while we fetching all the users.</p>
                            <CircularProgress size={20} color="inherit" />
                        </div>
                }
            </div>
        </div>
    )
}

export default Users