import React from 'react'
import { ParentCompProps } from './Dashboard'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'
import PermissionTable from '../Components/PermissionTable';
import { empCreate } from '../http/api'
import FileUploader from '../Components/FileUploader'
import { toast } from 'react-toastify'
import { useAppSelector } from '../store/hook';

const CreateEmp = ({ title, content }: ParentCompProps) => {

    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const [data, setData] = React.useState<any>({
        name: '',
        id: '',
        phone: '',
        email: '',
        role: ''
    })


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleRegister = async () => {
        try {
            const { data: res } = await empCreate(data, token)
            if (res.success) {
                console.log(res)
                toast.success(res.message)
            } else {
                console.log(res)
                toast.error(res.message)
            }
        } catch (error) {
            console.log('error', error)
            toast.error('Email or Phone Number already exists')
        }
    }

    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Create Employee Account</p>
            <FileUploader type={"emp"} />
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
            <h1 className='text-gray-600 text-[18px] mt-10 font-semibold'>Configure Account Permission</h1>
            <div className='py-2 my-4'>
                <div className='flex justify-between'>
                    <label htmlFor="category" className='text-gray-700 font-normal'>Enter The Role</label>
                    <p>For help <span className='text-blue-800 underline cursor-pointer' onClick={handleOpen}>click here</span></p>
                </div>
                <input
                    placeholder='Enter Role'
                    value={data.role}
                    autoComplete="off"
                    onChange={(e) => setData(e.target.value)}
                    className='h-14 border w-full px-2 mt-3 rounded-md' type="text"
                />
            </div>
            <div>
                <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 2 }} size='large' onClick={handleRegister}>Create</Button>
            </div>
            {
                open ? <PermissionTable openState={open} handleState={handleClose} /> : null
            }
        </div>
    )
}

export default CreateEmp