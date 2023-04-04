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
            console.log(res.data)
            setCourse(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [token, id])



    return (
        <div className=''>
            <Back />
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Edit Course</h1>

            <div className=''>
                <h1 className='font-semibold'> {course?.courseTitle}</h1>
                <p className='text-sm'>{course?.courseDescription}</p>
                {
                    course?.lessons?.map((module: any, index: number) => {
                        return (
                            <div key={index} className='mt-3'>
                                <p>LessonName: {module?.lessonName}</p>
                                <p>Content:  {module?.lessonContent}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditCourse