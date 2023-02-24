import React from 'react'
import { ParentCompProps } from './Dashboard'
import { Button } from '@mui/material'
import CreateCourseForm from '../Components/LMS/CreateCourse'

const CreateCourse = ({ content, title }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [showForm, setShowForm] = React.useState(false)

    const handleFormShow = () => {
        setShowForm(true)
    }

    return (
        <div className=''>
            <h1 className='text-2xl text-gray-800 font-semibold'>Enroll New Course</h1>
            {
                showForm ? <CreateCourseForm /> :
                    <div className='my-10 flex justify-center items-center'>
                        <Button variant='contained' onClick={handleFormShow} sx={
                            {
                                background: '#19356a',
                                paddingX: 5,
                                paddingY: 2,
                            }
                        }>Create Course</Button>
                    </div>
            }
        </div>
    )
}

export default CreateCourse