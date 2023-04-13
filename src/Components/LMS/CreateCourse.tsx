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

const CreateCourse = () => {
    const { token } = useAppSelector(state => state.auth)
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const [disableButton, setDisableButton] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const [courseData, setCourseData] = React.useState({
        courseTitle: '',
        courseDescription: '',
        courseId: ''
    })

    const handleOpen = () => {
        setLoading(true)
        initLMS(courseData, token).then((res) => {
            if (res.data.success) {
                setOpen(true)
                toast.success(res.data.data.message)
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

    React.useEffect(() => {
        if (courseData.courseTitle !== '' && courseData.courseDescription !== '') {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [courseData])

    return (
        <div className=''>
            <div className='w-[600px] gap-4 py-4 rounded-md'>
                <h4 className='mb-5 text-gray-600 font-semibold text-xl'>Course Info</h4>
                <TextField value={courseData.courseTitle} onChange={(e) => setCourseData({
                    ...courseData,
                    courseTitle: e.target.value
                })} label="Course title" placeholder='Enter Course Title' className='w-full' />
                <div className='mt-5'>
                    <TextField
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
                <div className='mt-5'>
                    {/* <h4 className='mb-5 text-gray-700 font-semibold text-xl'>Course Type</h4> */}
                    {
                        loading ? <LinearProgress /> : <Button variant="contained"
                            sx={{ background: '#1b356b' }} onClick={handleOpen} disabled={disableButton}>Design Course</Button>
                    }
                    {
                        open ? <Model handleClose={handleClose} courseData={courseData} /> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCourse




const Model = ({ handleClose, courseData }: any) => {

    console.log(courseData)

    const LinkRef = React.useRef<HTMLAnchorElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const [checked, setChecked] = React.useState({
        quiz: false,
        feedback: false,
        choice: false,
        checklist: false,
        chapter: false,
        lesson: false,
        file: false
    })


    React.useEffect(() => {
        LinkRef.current?.click()
        setChecked({
            ...checked,
            chapter: true,
        })
    }, [])


    return (
        <div className='h-screen w-screen absolute top-0 left-0 bg-[#3d3d3d72] flex justify-center items-center' style={{ zIndex: '9991' }}>
            <div className='bg-white py-4 w-[900px] rounded-md shadow-lg'>
                {/* header */}
                <div className='flex justify-between items-center px-3 py-2'>
                    <h2 className='text-lg font-semibold text-gray-600'>Add an activity or resource</h2>
                    <CloseIcon onClick={handleClose} sx={{ color: '#4b5563', cursor: 'pointer' }} />
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
                            <Link to={`/new-course-enroll/modules/${courseData.courseId}`} ref={LinkRef} onClick={() => {
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
                            <Link to={`/new-course-enroll/lesson/${courseData.courseId}`} onClick={() => {
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
                            <Link to={`/new-course-enroll/file/${courseData.courseId}`} onClick={() => {
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
                            </Link>
                            {/* <Link to="/new-course-enroll/quiz" onClick={() => {
                                setChecked({
                                    chapter: false,
                                    choice: false,
                                    feedback: false,
                                    checklist: false,
                                    quiz: true,
                                    lesson: false
                                })
                            }} className={checked.quiz ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.quiz} />
                                <QuizIcon />
                                <span>Quiz</span>
                            </Link> */}
                            {/* <Link to="/new-course-enroll/choice" onClick={() => {
                                setChecked({
                                    chapter: false,
                                    quiz: false,
                                    feedback: false,
                                    checklist: false,
                                    choice: true,
                                    lesson: false
                                })
                            }} className={checked.choice ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.choice} />
                                <PlaylistAddCheckIcon />
                                <span>Choice</span>
                            </Link> */}
                            {/* <Link to="/new-course-enroll/checklist" onClick={() => {
                                setChecked({
                                    chapter: false,
                                    quiz: false,
                                    feedback: false,
                                    choice: false,
                                    checklist: true,
                                    lesson: false
                                })
                            }} className={checked.checklist ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.checklist} />
                                <RuleIcon />
                                <span>Checklist</span>
                            </Link> */}
                            {/* <Link to="/new-course-enroll/feedback" onClick={() => {
                                setChecked({
                                    chapter: false,
                                    quiz: false,
                                    choice: false,
                                    checklist: false,
                                    feedback: true,
                                    lesson: false
                                })
                            }} className={checked.feedback ? "flex justify-start gap-4 items-center py-2 bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700" : "flex justify-start gap-4 items-center py-2 hover:bg-blue-200 rounded-tl-3xl rounded-bl-3xl px-2 cursor-pointer text-gray-700"}>
                                <input type="radio" checked={checked.feedback} />
                                <FeedbackIcon />
                                <span>Feedback</span>
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
                        <Button variant="contained" sx={{ background: '#3c6bee' }} onClick={handleClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}