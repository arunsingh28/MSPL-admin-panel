import React from 'react'
import { Button, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import RuleIcon from '@mui/icons-material/Rule';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FeedbackIcon from '@mui/icons-material/Feedback';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import { Outlet, Link } from 'react-router-dom'
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { initLMS } from '../../http/api'
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from 'react-toastify'
import { useAppSelector } from '../../store/hook'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

import Activity from './Activity';

const CreateCourse = () => {
    const { token, user } = useAppSelector(state => state.auth)
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const [disableButton, setDisableButton] = React.useState(true)

    const [loading, setLoading] = React.useState(false)

    const [courseData, setCourseData] = React.useState({
        courseTitle: '',
        courseDescription: '',
        courseId: '',
        creator: user.name
    })

    const [showActivity, setShowActivity] = React.useState(false)


    const handleInit = () => {
        setLoading(true)
        if (thumbnail === null) return toast.error('Please select a thumbnail')
        const form = new FormData()
        form.append('data', JSON.stringify(courseData))
        form.append('file', fileRef.current?.files![0])

        initLMS(form, token).then((res) => {
            if (res.data.success) {
                setShowActivity(true)
                console.log(res.data)
                setReplaceImage(true)
                toast.success('Course Init Successfully')
                setLoading(false)
                setCourseData({
                    ...courseData,
                    courseId: res.data.data._id
                })
                localStorage.setItem('courseId', res.data.data._id)
            }
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })
    };

    const [replaceImage, setReplaceImage] = React.useState(false)


    React.useEffect(() => {
        if (courseData.courseTitle !== '' && courseData.courseDescription !== '' && thumbnail) setDisableButton(false)
        else setDisableButton(true)
    }, [courseData])

    const [thumbnail, setThumbnail] = React.useState<any>(null)

    const handleCopyCourseID = () => {
        navigator.clipboard.writeText(courseData.courseId)
        toast.success(`${courseData.courseId} Copied`)
    }

    const fileRef = React.useRef<HTMLInputElement | any>(null)

    const handleClickFile = () => {
        fileRef.current?.click()
    }



    const handleChangeFile = () => {
        // create url for image
        if (fileRef.current?.files![0].size > 10000000) return toast.error('File size is too large')
        const url = URL.createObjectURL(fileRef.current?.files![0])
        setThumbnail(url)
    }

    // find the size of the file
    function formatBytes(bytes: number, decimals = 2) {
        if (!+bytes) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }


    return (
        <div className='w-full'>
            <div className='gap-4 py-4 rounded-md'>
                <div className='flex items-center pb-3 justify-between'>
                    <h4 className='text-gray-600 font-semibold text-xl'>Course Info</h4>
                    {
                        courseData.courseId !== '' && (
                            <div className='bg-gray-300 rounded-sm flex items-center gap-2'>
                                <p className='text-gray-700 px-2'>Coruse ID</p>
                                <p className='text-gray-800 bg-gray-400 px-3 py-2 flex items-center gap-2 rounded-t-sm rounded-b-sm'>
                                    {courseData.courseId}
                                    <CopyAllOutlinedIcon onClick={handleCopyCourseID} className='cursor-pointer text-white' />
                                </p>
                            </div>
                        )
                    }
                </div>
                <div className='w-full'>
                    <TextField value={courseData.courseTitle} disabled={courseData.courseId !== '' ? true : false} onChange={(e) => setCourseData({
                        ...courseData,
                        courseTitle: e.target.value
                    })} label="Course title" placeholder='Enter Course Title' className='w-full' />
                    <div className='mt-5'>
                        <TextField
                            disabled={courseData.courseId !== '' ? true : false}
                            value={courseData.courseDescription}
                            onChange={(e) => setCourseData({
                                ...courseData,
                                courseDescription: e.target.value
                            })}
                            label="Course Description"
                            placeholder="Descripe the course in short"
                            multiline
                            className='w-full mt-4'
                            rows={4}
                            maxRows={4}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="thumbnail" className='text-[12px] text-gray-600'>Course Thumbnail</label>
                        <div className='flex items-start gap-0 justify-start'>
                            <div>
                                {
                                    thumbnail && (
                                        <div className='flex items-start gap-2'>
                                            <img src={thumbnail} className='w-52 h-36 object-cover rounded-sm shadow-sm' alt='thumbnail' />
                                            <div>
                                                {/* thumbnail info */}
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-[12px] text-gray-500'>File Name</p>
                                                    <p className='text-[12px] text-gray-600'>{fileRef.current?.files![0]?.name}</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-[12px] text-gray-500'>File Type</p>
                                                    <p className='text-[12px] text-gray-600 ml-[7px]'>{fileRef.current?.files![0]?.type}</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-[12px] text-gray-500'>Size</p>
                                                    <p className='text-[12px] text-gray-600 ml-[30px]'>{formatBytes(fileRef.current?.files![0]?.size)}</p>
                                                </div>
                                                {/* <div className='flex items-center gap-2'>
                                                    <p className='text-[12px] text-gray-500'>Height</p>
                                                    <p className='text-[12px] text-gray-600'>{imageResolution.height}</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                !replaceImage && (
                                    <div className={replaceImage ? '' : 'ml-4 cursor-pointer'}>
                                        <div className='border border-gray-400 w-32 h-28 px-10 flex items-center justify-center rounded-sm' onClick={handleClickFile}>
                                            <input type="file" ref={fileRef} className='hidden' onChange={handleChangeFile} />

                                            <AddPhotoAlternateOutlinedIcon className='text-gray-600' />
                                        </div>
                                        <p className='text-[12px] text-gray-500'>upload 400 x 400</p>
                                    </div>)
                            }

                        </div>
                    </div>
                    {
                        !showActivity ? <button onClick={handleInit} disabled={disableButton} className={!disableButton ? 'px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-sm text-gray-50 mt-3 flex items-center gap-2 border hover:shadow-md border-blue-500' : 'px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-sm text-gray-50 mt-3 flex items-center gap-2 border hover:shadow-md border-gray-500'}><NoteAddOutlinedIcon fontSize='small' />Create</button> : <Activity courseID={courseData.courseId} />
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCourse

