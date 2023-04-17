import React from 'react'
import { ParentCompProps } from './Dashboard'
import { getAllUsers, filterUser } from '../http/api'
import UserTable from '../Components/UserView/UserTable'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../store/hook'

const Users = ({ title, content }: ParentCompProps) => {

    const { token } = useAppSelector(state => state.auth)

    const { id } = useAppSelector(state => state.deleteClient)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allUser, setAllUser] = React.useState<any>()

    const [isLoading, setIsLoading] = React.useState(false)

    const [diableInput, setDiableInput] = React.useState(false)


    const [filter, setFilter] = React.useState({
        name: '',
        status: 'all'
    })

    React.useEffect(() => {
        getAllUsers(token).then(res => {
            setAllUser(res.data)
            setIsLoading(true)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoading(true)
        })
    }, [id])

    const handleFilter = () => {
        console.log({ filter })
        filterUser(filter, token).then(res => {
            console.log(res.data)
            setAllUser(res.data.filterData)
        }).catch((err) => {
            console.log(err)
        }).finally(() => { })
    }

    React.useEffect(() => {
        if (filter.status === 'init') {
            setDiableInput(true)
        } else {
            setDiableInput(false)
        }
    }, [filter])

    return (
        <div>
            <h1 className='text-gray-700 font-semibold text-2xl'>All Users</h1>
            {/* table */}
            {
                diableInput ? <div className="border-orange-100 border bg-orange-300 text-gray-700 py-2 px-2 rounded-sm text-sm w-72">Hot download does't support name filter.</div> : null
            }
            <div className='flex items-center gap-5 my-3'>
                <input type="text" className={diableInput ? 'border h-10 rounded-sm w-1/2 px-2 cursor-not-allowed' : 'border h-10 rounded-sm w-1/2 px-2'} disabled={diableInput} onChange={(e) => setFilter({ ...filter, name: e.target.value })} placeholder='Enter Name' />
                <select className='border h-10 rounded-sm px-8' defaultValue={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                    <option value="all">All</option>
                    <option value="attached">Assigned</option>
                    <option value="free">Unassigned</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="init">Hot download</option>
                </select>
                <button className='px-8 py-2 bg-blue-500 text-gray-50 rounded-sm' onClick={handleFilter}>Search</button>
            </div>
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