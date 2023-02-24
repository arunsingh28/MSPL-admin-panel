import React from 'react'
import { Navigate } from 'react-router-dom'


const NotAllowed = () => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            return <Navigate to="/login" />
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <>
            <div className='bg-[#fb7a4fc2] px-6 py-10 rounded-md shadow-md'>
                <h1 className='text-xl font-bold text-[#b43636]'>Opration Not Allowed</h1>
                <p className='mt-5 text-[#923333]'>You are not allowed to perform this Opration.</p>
                <p className='text-[#923333]'>If this issue is not resolving then contact to Amit Kumar (IT) </p>
                <p className='mt-5 text-gray-700 font-semibold'>Please logout and then login again. Otherwise System will throw you out in 5 seconds. </p>
            </div>
        </>
    )
}

export default NotAllowed