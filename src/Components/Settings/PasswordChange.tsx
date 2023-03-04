import React from 'react'
import PasswordImage from '../../Assets/password.svg'
import { changePassword } from '../../http/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
// not visiable
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PasswordChange = () => {

    const _id = useSelector((state: any) => state.auth.user._id)


    const [loading, setLoading] = React.useState(false)

    const [errorMsg, setErrorMsg] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [disable, setDisable] = React.useState(true)

    const [visible, setVisible] = React.useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const [data, setData] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    React.useEffect(() => {
        if (data.oldPassword.length > 0 && data.newPassword.length > 0 && data.confirmPassword.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [data])

    const handleChange = (e: any) => {
        e.preventDefault()
        setLoading(true)
        if (data.newPassword !== data.confirmPassword) {
            setLoading(false)
            setErrorMsg({
                ...errorMsg,
                confirmPassword: 'Password does not match'
            })
        }
        if (data.confirmPassword !== data.newPassword) {
            setLoading(false)
            setErrorMsg({
                ...errorMsg,
                newPassword: 'Password does not match'
            })
        }
        if (data.newPassword === data.confirmPassword) {
            changePassword(data, _id).then((res: any) => {
                setLoading(false)
                if (res.data.success === false) {
                    toast.error(res.data.message)
                } else {
                    toast.success(res.data.message)
                }
            }).catch((err: any) => {
                setLoading(false)
                toast.error(err.response.data.message)
            })
        }
    }


    return (
        <div className='bg-gray-50 py-5 px-5'>
            <div className='mx-16'>
                <div className='flex gap-6'>
                    <div className='flex-1'>
                        <div className='flex flex-col gap-2 mt-5'>
                            <div className='flex justify-between'>
                                <label htmlFor="oldPassword" className='text-gray-700'>Old Password</label>
                                {
                                    visible.oldPassword ? <VisibilityIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            oldPassword: !visible.oldPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} /> : <VisibilityOffIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            oldPassword: !visible.oldPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} />
                                }
                            </div>
                            <input type={visible.oldPassword ? 'text' : 'password'} value={data.oldPassword} onChange={(e) => {
                                setData({
                                    ...data,
                                    oldPassword: e.target.value
                                })
                            }} name="oldPassword" id="oldPassword" className='border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-blue-500' />
                            <span className='text-sm text-red-500 font-sans'>{errorMsg.oldPassword}</span>
                        </div>
                        <div className='flex flex-col gap-2 mt-5'>
                            <div className='flex justify-between'>
                                <label htmlFor="newPassword" className='text-gray-700'>New Password</label>
                                {
                                    visible.newPassword ? <VisibilityIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            newPassword: !visible.newPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} /> : <VisibilityOffIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            newPassword: !visible.newPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} />
                                }
                            </div>
                            <input type={visible.newPassword ? 'text' : 'password'} value={data.newPassword} onChange={(e) => {
                                setData({
                                    ...data,
                                    newPassword: e.target.value
                                })
                            }} name="newPassword" id="newPassword" className='border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-blue-500' />
                            <span className='text-sm text-red-500 font-sans'>{errorMsg.newPassword}</span>
                        </div>
                        <div className='flex flex-col gap-2 mt-5 '>
                            <div className='flex justify-between'>
                                <label htmlFor="confirmPassword" className='text-gray-700'>Confirm Password</label>
                                {
                                    visible.confirmPassword ? <VisibilityIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            confirmPassword: !visible.confirmPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} /> : <VisibilityOffIcon onClick={() => {
                                        setVisible({
                                            ...visible,
                                            confirmPassword: !visible.confirmPassword
                                        })
                                    }} sx={{
                                        color: '#444', '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }} />
                                }
                            </div>
                            <input type={visible.confirmPassword ? 'text' : 'password'} value={data.confirmPassword} onChange={(e) => {
                                setData({
                                    ...data,
                                    confirmPassword: e.target.value
                                })
                            }} name="confirmPassword" id="confirmPassword" className='border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-blue-500' />
                            <span className='text-sm text-red-500 font-sans'>{errorMsg.confirmPassword}</span>
                        </div>
                        <div className='mt-4'>
                            <button className={disable ? 'bg-gray-400 text-white px-5 py-2 rounded-sm' : 'bg-blue-500 text-white px-5 py-2 rounded-sm hover:bg-blue-600'} onClick={handleChange} disabled={disable}>
                                {
                                    loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Change Password'
                                }
                            </button>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <div className='justify-center items-center h-full flex'>
                            <img src={PasswordImage} alt="poster" className="drop-shadow-2xl pointer-events-none w-1/2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange