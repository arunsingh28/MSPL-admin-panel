import React from 'react'
import { ParentCompProps } from './Dashboard'
import { getAllUsers } from '../http/api'
import UserTable from '../Components/UserView/UserTable'




const Users = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allUser, setAllUser] = React.useState<any>()

    React.useEffect(() => {
        getAllUsers().then(res => {
            setAllUser(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <h1 className='text-gray-700 font-semibold text-2xl'>Users</h1>
            {/* table */}
            <div className='mt-5'> <UserTable allUser={allUser} /></div>
        </div>
    )
}

export default Users