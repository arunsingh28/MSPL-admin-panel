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

    const [showForm, setShowForm] = React.useState(false)

    const handleFormShow = () => {
        setShowForm(true)
    }

    return (
        <div className=''>
            <Back/>
            <h1 className='text-gray-700 font-semibold text-2xl'>Enroll New Course</h1>
            {
                showForm ? <CreateCourseForm /> :
                    <div className='my-5 flex justify-center items-center'>
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