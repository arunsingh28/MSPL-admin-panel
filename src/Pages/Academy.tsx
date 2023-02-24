import React from 'react'
import { ParentCompProps } from './Dashboard'
import FileUploader from '../Components/FileUploader'
import { TextField, Button } from '@mui/material' 

const Academy = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [data, setData] = React.useState<any>({
        name: '',
        id: '',
        phone: '',
        email: '',
    })

    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Acadmey Register</p>
            <FileUploader type={"acd"} />
            <div className='flex justify-center'>
                <div className="mt-6 grid grid-cols-3 w-1/3 justify-center items-center text-gray-400">
                    <hr className='border-gray-400' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-gray-400' />
                </div>
            </div>
            <h1 className='text-gray-600 text-[18px] mt-10'>Personal Information</h1>
            <div className='mt-5 flex gap-4'>
                <TextField type="text"
                    label="Employe Full Name" variant="outlined"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder='Enter Employe Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="text"
                    label="Employe ID" variant="outlined"
                    value={data.id}
                    onChange={(e) => setData({ ...data, id: e.target.value })}
                    placeholder='Enter Employe office ID like MS0103' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            <div className='mt-8 flex gap-4'>
                <TextField type="text"
                    label="Employe Phone Number" variant="outlined"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    placeholder='Enter Employe Phone Number' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />

                <TextField type="email"
                    label="Employe Email" variant="outlined"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder='Enter Employe Email ID' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 6 }} size='large'>Create</Button>
        </div>
    )
}

export default Academy