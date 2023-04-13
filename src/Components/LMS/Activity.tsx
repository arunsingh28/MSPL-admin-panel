import React from 'react'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import { Outlet, Link } from 'react-router-dom'
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import { initLMS } from '../../http/api'
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from 'react-toastify'
import { useAppSelector } from '../../store/hook'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Activity = (props: any) => {

    const { token } = useAppSelector(state => state.auth)

    console.log('asdf',props)


    const [checked, setChecked] = React.useState({
        quiz: false,
        feedback: false,
        choice: false,
        checklist: false,
        chapter: false,
        lesson: false,
        file: false
    })
    const LinkRef = React.useRef<HTMLAnchorElement>(null)

    React.useEffect(()=>{
        console.log('init')
        LinkRef.current?.click()
    },[])


    return (
        <div className=''>
            <div className=' w-full rounded-md'>
                {/* header */}
                <div className='flex justify-between items-center py-3'>
                    <h2 className='text-lg font-semibold text-gray-600'>Add an activity or resource</h2>
                    {/* <CloseIcon onClick={handleClose} sx={{ color: '#4b5563', cursor: 'pointer' }} /> */}
                </div>
                <hr />
                {/* workspace */}
                <div className='flex justify-between border-b-2'>
                    <div className='bg-[#90a4b62e] flex-2 w-[200px]'>
                        <h5 className='px-2 py-3 border-b-2 text-gray-700 font-semibold'>ACTIVITES</h5>
                        <div className='pl-4 mb-3 mt-3'>
                            {/* <div className='flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700'>
                                        <input type="radio" name="" id="" />
                                        <AssignmentTurnedInIcon/>
                                        <span>Assignment</span>
                                    </div> */}
                            <Link state={{ id: props.courseID }} to={`/new-course-enroll/modules`} ref={LinkRef} onClick={() => {
                                setChecked({
                                    chapter: true,
                                    quiz: false,
                                    feedback: false,
                                    checklist: false,
                                    choice: false,
                                    lesson: false,
                                    file: false
                                })
                            }} className={checked.chapter ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.chapter} />
                                <PlayLessonIcon />
                                <span>Modules</span>
                            </Link>
                            <Link state={{ id: props.courseID }} to={`/new-course-enroll/lesson`} onClick={() => {
                                setChecked({
                                    chapter: false,
                                    quiz: false,
                                    feedback: false,
                                    checklist: false,
                                    choice: false,
                                    lesson: true,
                                    file: false
                                })
                            }} className={checked.lesson ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.lesson} />
                                <CastForEducationIcon />
                                <span>Lessons</span>
                            </Link>
                            {/* <Link state={{ id: props.courseID }} to={`/new-course-enroll/file`} onClick={() => {
                                setChecked({
                                    chapter: false,
                                    quiz: false,
                                    feedback: false,
                                    checklist: false,
                                    choice: false,
                                    lesson: false,
                                    file: true
                                })
                            }} className={checked.file ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.file} />
                                <PlayLessonIcon />
                                <span>File</span>
                            </Link> */}
                        </div>
                    </div>

                    {/* show content */}
                    <div className='flex-1 overflow-scroll'>
                        <Outlet />
                    </div>
                </div>
                {/* footer */}
                <div className='flex justify-between items-center gap-6 mr-5 mt-3'>
                    <p className='text-sm text-gray-600 ml-2'>Don't deploy the cousre without completing the course**</p>
                    <div className='flex gap-6'>
                        <Button variant="contained" sx={{ background: '#07226d' }} >
                            <FlightTakeoffIcon className='mr-2' />
                            Deploy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Activity