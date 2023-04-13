import React from 'react'
import { ParentCompProps } from '../../../Pages/Dashboard'
import { fetchAllCourse, deleteCourse } from '../../../http/api'
import Back from '../../Back'
import { useAppSelector } from '../../../store/hook'
import { useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify'
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import DoNotTouchOutlinedIcon from '@mui/icons-material/DoNotTouchOutlined';

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
    }, [])

    const handleDeleteCourse = (id: string) => {
        const prompt = window.confirm('Are you sure you want to delete this course?')
        if (prompt) {
            deleteCourse(id, token).then((res: any) => {
                if (res.data.success === false) return toast.error(res.data.message)
                toast.success('Course deleted successfully')
                setAllCourse(allCourse.filter((course: any) => course._id !== id))
            }).catch((err: any) => {
                toast.error(err.response.data.message)
            })
        } else return
    }

    return (
        <div className=''>
            <Back />
            <h1 className='text-gray-700 font-semibold text-2xl'>All Modules</h1>
            <div className='flex flex-col gap-3 mt-5'>
                {
                    allCourse && allCourse.length === 0 ? <p className='mx-auto text-gray-600'>No Course Found</p> : allCourse?.map((course: any) => {
                        return (
                            <div key={course._id} className='border px-2 py-1 rounded-sm relative'>
                                <div className='bg-gray-300 absolute top-2 right-2 rounded-sm flex items-center gap-2'>
                                    <p className='text-gray-700 px-2'>Coruse ID</p>
                                    <p className='text-gray-800 bg-gray-400 px-3 py-2 flex items-center gap-2 rounded-t-sm rounded-b-sm'>
                                        {course._id}
                                        {/* <CopyAllOutlinedIcon onClick={handleCopyCourseID} className='cursor-pointer text-white' /> */}
                                    </p>
                                </div>
                                <div className='flex justify-end flex-row-reverse'>
                                    <div className='w-full -ml-20'>
                                        <h1 className='text-2xl text-gray-800 font-semibold pb-2'>{course?.courseTitle}</h1>
                                        <div className=''>
                                            <h1 className='font-semibold text-gray-700'>Course Description</h1>
                                            <p className='pb-2 text-sm text-gray-700'>{course?.courseDescription}</p>
                                            <div className='flex my-2 gap-3'>
                                                <div className='flex gap-2'>
                                                    <button className='px-4 py-1 bg-blue-500 rounded-sm text-gray-50 flex items-center gap-1' onClick={() => {
                                                        console.log(course._id)
                                                        navigate(`/lms/${course._id}`)
                                                    }}>
                                                        <ViewInArOutlinedIcon />
                                                        View</button>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <button className='px-4 py-1 border border-red-500 rounded-sm text-red-500 hover:bg-red-500 hover:text-gray-50 flex items-center gap-1' onClick={() => handleDeleteCourse(course._id)}>
                                                        <DeleteOutlineIcon />
                                                        Delete
                                                    </button>
                                                    <button className='px-4 py-1 border border-indigo-600 rounded-sm text-indigo-600 flex items-center gap-1'>
                                                        <DoNotTouchOutlinedIcon />
                                                        Disable
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-96'>
                                        <img src={course?.thumbnail.location} alt="thumnail" className='object-cover rounded-sm w-52 h-52' />
                                    </div>
                                </div>
                                {/* <span>{course._id}</span> */}

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ViewModules