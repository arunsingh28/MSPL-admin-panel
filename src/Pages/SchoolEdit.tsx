import React from 'react'
import { ParentCompProps } from './Dashboard'
import Notification from '../Components/Notification'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { schoolGetAll,schoolSearch } from '../http/api'
import EditSchoolTable from '../Components/EditSchoolTable'
import LinearProgress from '@mui/material/LinearProgress';
import NoData from '../Assets/icons/no-data.png'

const SchoolEdit = ({ content, title }: ParentCompProps) => {

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [notification, setNotification] = React.useState({
        message: '',
        visible: false,
        type: 'success'
    })
    const [allSchool, setAllSchool] = React.useState([])
    const [isLoading,setIsLoading] = React.useState(false)

    const [search, setSearch] = React.useState({
        city: '',
        schoolName: ''
    })

    React.useEffect(() => {
        setIsLoading(true)
        schoolGetAll().then(res => {
            setIsLoading(false)
            setAllSchool(res.data.school)
        }).catch(err => {
            setIsLoading(false)
            console.log('err', err)
        })
    }, [])

    // handle search school
    const handleSearch = () => {
        setIsLoading(true)
        schoolSearch(search).then(res => {
            setIsLoading(false)
            console.log('res', res)
            setAllSchool(res.data.school)
        }).catch(err => {
            setIsLoading(false)
            console.log('err', err)
        })
    }

    return (
        <div>
            <Notification setting={notification} />
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Edit School</h1>
            <div className='flex gap-5 bg-white px-10 py-5 shadow-md rou'>
                <TextField
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    value={search.city}
                    onChange={(e) => setSearch({ ...search, city: e.target.value })}
                    label="School's City" variant="outlined"
                    type='text'
                />
                <TextField
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    value={search.schoolName}
                    onChange={(e) => setSearch({ ...search, schoolName: e.target.value })}
                    label="School's Name" variant="outlined"
                    type='text'
                />
                <Button size='medium'
                    sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b' }}
                    variant="contained" onClick={handleSearch}>Search</Button>
            </div>
            <div className='mt-5'>
                {
                    isLoading ?  <LinearProgress />: allSchool?.length > 0 ? <EditSchoolTable allSchool={allSchool} /> : <NoDataFound/>
                }
            </div>
        </div>
    )
}

export default SchoolEdit

const NoDataFound = ()=>{
    return(
        <div className='flex justify-center items-center h-96 flex-col'>
            <img src={NoData} alt="No Data Found" className='w-40'/>
            <h1 className='text-2xl text-gray-800 mt-5'>No Data Found</h1>
        </div>
    )
}