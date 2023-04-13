import React from 'react'
import { ParentCompProps } from './Dashboard'
import { Button } from '@mui/material'
import CreateCourseForm from '../Components/LMS/CreateCourse'
import Back from '../Components/Back'

const CreateCourse = ({ content, title }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])



    return (
        <div className=''>
            <Back />
            <h1 className='text-gray-700 font-semibold text-2xl'>Enroll New Course</h1>
            <CreateCourseForm />
        </div>
    )
}

export default CreateCourse