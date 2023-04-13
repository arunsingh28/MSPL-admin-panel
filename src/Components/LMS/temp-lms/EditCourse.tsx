import React from 'react'
import { ParentCompProps } from '../../../Pages/Dashboard'
import Back from '../../Back'
import { useParams } from 'react-router-dom'
import { fetchCourseById } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'

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




    const handleViewPdf = (pdf: string) => {
        window.open(pdf)
    }


    return (
        <div className=''>
            <Back />
            {/* <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Edit Course</h1> */}
            <div className=''>
                <div className=''>
                    <div className='flex justify-end gap-5 flex-row-reverse'>
                        <div>
                            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>{course?.courseTitle}</h1>
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
                                            <button className='bg-blue-400 mt-3 px-5 py-2 rounded-sm text-gray-50 text-sm hover:shadow-md' onClick={() => handleViewPdf(item.pdf.location)}>View PDF</button>
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

