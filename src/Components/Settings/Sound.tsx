import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import { sound, getSoundInfo } from '../../http/api'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';

const label = { inputProps: { 'aria-label': 'Checkbox' } };


const Sound = () => {

    const _id = useSelector((state: any) => state.auth.user._id)
    const { token } = useSelector((state: any) => state.auth)


    const [isLoading, setIsLoading] = React.useState(false)

    const [disable, setDisable] = React.useState({
        loginNotification: false,
        logoutNotification: false,
        deleteNotification: false,
    })

    const [loading, setLoading] = React.useState(false)

    // fetching the sound settings
    React.useEffect(() => {
        const fetch = async () => {
            getSoundInfo(_id, token).then((res) => {
                setIsLoading(true)
                setDisable({
                    loginNotification: res.data.data.loginNotification,
                    logoutNotification: res.data.data.logoutNotification,
                    deleteNotification: res.data.data.deleteNotification,
                })
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }
        fetch()
    }, [])


    // updating the sound settings
    const updateSoundSettings = async () => {
        setLoading(true)
        sound(disable, _id, token).then((res) => {
            setLoading(false)
            toast.success(res.data.message)
        }).catch((err) => {
            setLoading(false)
            toast.error(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })
    }



    return (
        <div className='bg-gray-50 py-5 px-5'>
            {
                isLoading ?
                    <>
                        <table className='ml-16'>
                            <tbody>
                                <tr>
                                    <td className='text-gray-700'>Enable the login notification sound when logedin.</td>
                                    <td>
                                        <Checkbox {...label} name="login" checked={disable.loginNotification} defaultChecked={disable.loginNotification} onChange={(e) => {
                                            setDisable({
                                                ...disable,
                                                loginNotification: e.target.checked
                                            })
                                        }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-gray-700'>Enable the logout notification sound when loged out.</td>
                                    <td>
                                        <Checkbox {...label} name="logout" checked={disable.logoutNotification} defaultChecked={disable.logoutNotification} onChange={(e => {
                                            setDisable({
                                                ...disable,
                                                logoutNotification: e.target.checked
                                            })
                                        })} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-gray-700'>Enable the Delete notification sound when deleting something crtical.</td>
                                    <td>
                                        <Checkbox {...label} name="delete" checked={disable.deleteNotification} defaultChecked={disable.deleteNotification} onChange={(e) => {
                                            setDisable({
                                                ...disable,
                                                deleteNotification: e.target.checked
                                            })
                                        }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='ml-16 mt-4'>
                            <button className='bg-blue-500 text-white px-5 py-2 rounded-sm' onClick={updateSoundSettings}>
                                {
                                    loading ? <CircularProgress color='inherit' size={20} /> : 'Save'
                                }
                            </button>
                        </div>
                    </> : <div className='flex flex-col justify-center items-center py-10'>
                        <p className='text-gray-500 text-sm'>Please wait while we are fetching your sound settings.</p>
                        <CircularProgress className='mt-5' color='inherit' size={20} />
                    </div>
            }
        </div>
    )
}

export default Sound
