import React from 'react'
import { ParentCompProps } from '../../../Pages/Dashboard'
import Back from '../../Back'
import { useParams } from 'react-router-dom'
import { fetchCourseById } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const EditCourse = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const { id } = useParams<{ id: any }>()

    const [course, setCourse] = React.useState<any>()

    React.useEffect(() => {
        fetchCourseById(id, token).then((res) => {
            setCourse(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [token, id])


    const [urlPdf, setUrlPdf] = React.useState<any>('')



    const handleViewPdf = async (pdf: string) => {
        // download the file internally 
        await fetch(pdf)
            .then(response => {
                // Convert the response to a Blob
                return response.blob();
            })
            .then(blob => {
                console.log(blob)
                // Create a URL object from the Blob
                const url = URL.createObjectURL(blob);
                // Open the URL in a new window
                window.open(url);
            })





        // const blob = new Blob([pdf], { type: 'application/pdf' })
        // const url = URL.createObjectURL(blob)
        // // open pdf in new tab
        // // setUrlPdf('https://sg3storage.sgp1.cdn.digitaloceanspaces.com/test/1681465316925.a2606ad9-0198-4f6c-a2ff-5ec5d08f6bdb.pdf')
        // window.open(url)
    }

    const [editName, setEditName] = React.useState(false)

    const handleEditName = () => {
        setEditName(!editName)
    }

    return (
        <div className=''>
            <Back />
            {/* <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Edit Course</h1> */}
            <div className=''>
                <div className=''>
                    <div className='flex justify-end gap-5 flex-row-reverse relative'>
                        <div>
                            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>{course?.courseTitle} <ModeEditOutlinedIcon className='-mt-6 text-blue-600 border rounded-full p-0.5 border-blue-600 cursor-pointer' onClick={handleEditName} fontSize='small' /></h1>
                            <div className='text-sm text-gray-700 flex gap-2'>
                                <span className='italic text-gray-700'>Design by</span>
                                <h5 className='underline'>{course?.creator}</h5>
                            </div>
                            <div className='mt-2'>
                                <h1 className='font-semibold text-gray-700'>Course Description</h1>
                                <p className='pb-2 text-sm text-gray-700'>{course?.courseDescription}</p>
                            </div>
                        </div>
                        <img src={course?.thumbnail.location} alt="thumnail" className='w-52 h-48 object-cover rounded-sm' />
                        <div className='bg-gray-300 rounded-sm flex items-center gap-2 absolute top-2 right-2'>
                            <p className='text-gray-700 px-2'>Coruse ID</p>
                            <p className='text-gray-800 bg-gray-400 px-3 py-2 flex items-center gap-2 rounded-t-sm rounded-b-sm'>
                                {localStorage.getItem('courseId')}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 my-2'>
                        {
                            course?.lessons.map((item: any, index: number) => {
                                return (
                                    <div key={index} className='flex flex-col gap-2' >
                                        <div className='bg-gray-100 py-2 rounded-sm px-2'>
                                            <div className='flex flex-col gap-0 items-baseline'>
                                                <span className='font-semibold text-gray-700'>Chapter {index}</span>
                                                <p className='text-sm text-gray-800 underline'>{item.lessonName}</p>
                                            </div>
                                            <div className='flex flex-col gap-0 items-baseline mt-2'>
                                                <span className='font-semibold text-gray-700'>Chapter Description</span>
                                                <p className='text-sm text-gray-800'>{item.lessonContent}</p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <button className='bg-blue-400 mt-3 px-5 py-2 rounded-sm text-gray-50 text-sm hover:shadow-md flex items-center gap-1' onClick={() => handleViewPdf(item.pdf.location)}>
                                                        <VisibilityOutlinedIcon />
                                                        View PDF</button>
                                                    <button className='bg-indigo-400 mt-3 px-5 py-2 rounded-sm text-gray-50 text-sm hover:shadow-md flex items-center gap-1'>
                                                        <PublishedWithChangesOutlinedIcon />
                                                        Replace PDF</button>
                                                    <button className='bg-orange-400 mt-3 px-5 py-2 rounded-sm text-gray-50 text-sm hover:shadow-md flex items-center gap-1'>
                                                        <AutoFixHighOutlinedIcon />
                                                        Edit Chapter</button>
                                                </div>
                                                <div>
                                                    <button className='bg-red-400 mt-3 px-5 py-2 rounded-sm text-gray-50 text-sm hover:shadow-md flex items-center gap-1'>
                                                        <DeleteOutlinedIcon />
                                                        Delete Chapter</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }).slice(1)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse

