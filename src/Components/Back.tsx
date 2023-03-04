import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        return navigate(-1)
    }
    return (
        <div className='pb-4'>
            <div className='bg-gray-200 w-24 py-3 flex items-center justify-center gap-2 rounded-md cursor-pointer hover:bg-gray-300 group' onClick={handleBack}>
                <div className='group-hover:-translate-x-1 transition'>
                    <KeyboardBackspaceIcon />
                </div>
                <span>Back</span>
            </div>
        </div>
    )
}

export default Back