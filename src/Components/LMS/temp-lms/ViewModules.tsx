import React from 'react'
import { ParentCompProps } from '../../../Pages/Dashboard'
import { fetchAllCourse } from '../../../http/api'
import Back from '../../Back'
import { useAppSelector } from '../../../store/hook'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlightLandIcon from '@mui/icons-material/FlightLand';


const ViewModules = ({ title, content }: ParentCompProps) => {

    const navigate = useNavigate()
    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allCourse, setAllCourse] = React.useState([])

    React.useEffect(() => {
        fetchAllCourse(token).then((res: any) => {
            console.log(res)
            setAllCourse(res.data.data)
        }).catch((err: any) => {
            console.log(err)
        })
    }, [token])

    return (
        <div className=''>
            <Back />
            <h1 className='text-gray-700 font-semibold text-2xl'>All Modules</h1>
            <div className='flex flex-col gap-3 mt-5'>
                {
                    allCourse?.map((course: any) => {
                        return (
                            <div key={course._id} className='border px-2 py-1 rounded-sm'>
                                <h1>{course.courseTitle}</h1>
                                <p>{course.courseDescription}</p>
                                {/* <span>{course._id}</span> */}
                                <div className='flex my-2 gap-3'>
                                    <div className='flex gap-2'>
                                        <button className='px-4 py-1 bg-blue-500 rounded-sm text-gray-50' onClick={() => {
                                            console.log(course._id)
                                            navigate(`/lms/${course._id}`)
                                        }}>Edit</button>
                                        <button className='px-4 py-1 border border-blue-500 rounded-sm text-blue-500'>
                                            <FlightTakeoffIcon className='mr-2' />
                                            On Air
                                        </button>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button className='px-4 py-1 border border-red-500 rounded-sm text-red-500'>
                                            <DeleteOutlineIcon className='mr-2' />
                                            Delete
                                        </button>
                                        <button className='px-4 py-1 border border-green-500 rounded-sm text-green-500'>
                                            <FlightLandIcon className='mr-2' />
                                            Park Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewModules