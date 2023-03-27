import React from 'react'
import { ParentCompProps } from './Dashboard'
import { TextField, Button } from '@mui/material';
import { getEmp } from '../http/api'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';


interface IUser {
    empId: string,
    email: string,
    name: string,
    role: number[],
    phone: string,
    status: boolean,
    otp: string,
    oldOtp: string,
    _id: string,
    isMute: {
        deleteNotification: boolean,
        loginNotification: boolean,
        logoutNotification: boolean,
    }
    referral_code: string,
}

const Permission = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const [emp, setEmp] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState<string>('')
    const [show, setShow] = React.useState<boolean>(false)

    const [showData, setShowData] = React.useState<boolean>(false)



    const [empData, setEmpData] = React.useState<IUser>({
        empId: '',
        email: '',
        name: '',
        role: [],
        phone: '',
        status: true,
        otp: '',
        oldOtp: '',
        _id: '',
        isMute: {
            deleteNotification: false,
            loginNotification: false,
            logoutNotification: false,
        },
        referral_code: '',
    })

    const handleFindEmp = async () => {
        setIsLoading(true)
        const res = await getEmp({ emp })
        if (res.data.success) {
            setIsLoading(false)
            setShow(false)
            setShowData(true)
            setEmpData(res.data.data)
        } else {
            setIsLoading(false)
            setShow(true)
            setErrorMsg(res.data.message)
        }
    }

    return (
        <div>
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Reconfigure Permissions</h1>
            {
                show ? <p className='text-red-500 rounded-md text-sm border py-3 px-3 my-2 bg-red-300' dangerouslySetInnerHTML={{ __html: errorMsg }} /> : null
            }
            <div className='mt-5'>
                <div className='flex gap-3 items-center'>
                    <TextField label="Employe ID" value={emp} onChange={(e) => setEmp(e.target.value)} sx={{ marginTop: 1, width: '30%' }} variant='outlined' />
                    <Button onClick={handleFindEmp} variant='contained' sx={{ marginTop: 1, backgroundColor: '#1b356b', color: 'white', height: 55, '&:hover': { backgroundColor: '#11244e' } }}>
                        {
                            isLoading ? <CircularProgress size={20} color="inherit" /> : 'Search'
                        }
                    </Button>
                </div>
            </div>
            {/* display emp data */}
            {
                showData ? <>
                    <div className='mt-5'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-700 font-semibold'>Employee ID</p>
                                <p className='text-gray-700'>{empData.empId}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-700 font-semibold'>Name</p>
                                <p className='text-gray-700'>{empData.name}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-gray-700 font-semibold'>Email</p>
                                <p className='text-gray-700'>{empData.email}</p>
                            </div>
                        </div>
                    </div>
                </> : null
            }
        </div>
    )
}

export default Permission