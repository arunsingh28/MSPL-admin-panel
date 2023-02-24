import React from 'react'
import { ParentCompProps } from './Dashboard'
import { TextField, Button } from '@mui/material';
const Permission = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])
    return (
        <div>
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Reconfigure Permissions</h1>
            <div className='my-10'>
                <div className='flex gap-3 items-center'>
                    <TextField label="Employe ID" sx={{ marginTop: 1,width: '30%' }} variant='outlined' />
                    <Button variant='contained' sx={{ marginTop: 1, backgroundColor: '#1b356b', color: 'white', height: 55, '&:hover': { backgroundColor: '#11244e' } }}>Search</Button>
                </div>
            </div>
        </div>
    )
}

export default Permission