import React from 'react'
import { ParentCompProps } from './Dashboard'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'
import PermissionTable from '../Components/PermissionTable';
import { empCreate } from '../http/api'
import FileUploader from '../Components/FileUploader'
import {toast} from 'react-toastify'

const CreateEmp = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [category, setCategory] = React.useState('')
    const [role, setRoleArray] = React.useState<any>([])


    const handleEnterKey = (e: any) => {
        if (e.code === 'Enter') {
            setRoleArray((categoryArray: any) => categoryArray?.concat(e.target.value))
            setCategory('')
        }
    }

    const [data, setData] = React.useState<any>({
        name: '',
        id: '',
        phone: '',
        email: '',
        role: []
    })

    const handleRemove = (key: any) => {
        setRoleArray(role.filter((_: string, index: number) => index !== key))
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // change str to number
    const changeRole = (role: any) => {
        return role.map((r: any) => parseInt(r))
    }

    React.useEffect(() => {
        setData({ ...data, role: [changeRole(role)] })
    }, [role])

    const handleRegister = async () => {
        setData({ ...data, role: [changeRole(role)] })
        console.log(data)
        try {
            const { data: res } = await empCreate(data)
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
            <FileUploader type={"emp"}/>
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
                    <label htmlFor="category" className='text-gray-700 font-normal'>Enter The Permission Codes </label>
                    <p>For help <span className='text-blue-800 underline cursor-pointer' onClick={handleOpen}>click here</span></p>
                </div>
                <input
                    placeholder='Enter Blog Category'
                    value={category}
                    autoComplete="off"
                    onKeyDown={handleEnterKey}
                    onChange={(e) => setCategory(e.target.value)}
                    className='h-14 border w-full px-2 mt-3 rounded-md' type="number"
                />
                <div className='flex flex-wrap gap-2 mt-4'>
                    {
                        role && role?.map((i: any, index: number) => {
                            return (
                                <p key={index} className="px-2 py-1 bg-red-400 text-white capitalize rounded-md relative">
                                    <CloseIcon
                                        fontSize='small'
                                        onClick={() => handleRemove(index)}
                                        className='absolute -top-2 h-5 rounded-full -right-2 bg-red-800 w-5 cursor-pointer
                                                hover:bg-red-500 transition' />
                                    {i}
                                </p>)
                        })
                    }
                </div>
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