import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import bg from '../../Assets/bg.svg'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import morningGif from '../../Assets/cool.gif'

const ProfileModel = ({ data, setOpenProfile, intials, profile }: any) => {

    // change time with second and update the time
    const [time, setTime] = React.useState(new Date().toLocaleTimeString())


    const timeClock = () => {
        const currentTime = new Date().toLocaleTimeString()
        // convert time to 12 hour format
        const time = currentTime.split(':')
        const hour = time[0]
        const min = time[1]
        const sec = time[2].split(' ')[0]
        let newHour = ''
        if (hour === '00') {
            newHour = '12'
        } else if (hour > '12') {
            newHour = (parseInt(hour) - 12).toString()
        } else {
            newHour = hour
        }
        const newTime = `${newHour}:${min}:${sec}`
        setTime(newTime)
    }

    React.useEffect(() => {
        setInterval(timeClock, 1000)
    }, [time])



    return (
        <div className='absolute top-[66px] right-0 h-auto w-[270px] border rounded-md shadow-lg bg-image' style={{ backgroundImage: `url(${bg})` }}>
            <ArrowDropUpIcon color='inherit' fontSize='large' className='absolute -top-[20px] mx-auto left-[60px]' />
            {/* <div className='bg-blue-400'>
            </div> */}
            <div className='text-gray-700 py-2 px-1'>
                <div className='flex justify-start gap-4 ml-2 items-center'>
                    {
                        profile ?
                            <img src={profile} alt="profile" className='w-16 h-16 rounded-full border border-gray-200' /> :
                            <div className='bg-orange-300 border-orange-200 drop-shadow-md rounded-full px-[11px] py-[10px] tracking-wide pointer-events-none'>
                                <p className='text-[25px]'>{intials}</p>
                            </div>
                    }
                    <div className='mr-2'>
                        <p className='text-sm ml-1'>
                            <img src={morningGif} className="w-8 h-8 bg-transparent pointer-events-none" alt="" />
                            {new Date().getHours() < 12 ? 'Good Morning' : 'Good Afternoon'} {data.user.name.split(' ')[0]}
                        </p>
                        <p className='text-2xl text-gray-600 font-semibold'>{time} {new Date().getHours() < 12 ? 'AM' : 'PM'}</p>
                    </div>
                </div>
                <div className='mt-2 px-2'>
                    <p className='text-sm text-gray-600 flex items-center gap-2'>
                        <SendIcon fontSize='small' />
                        {data.user.email}
                    </p>
                    <div className='flex gap-2 text-sm text-gray-600 items-center mt-1'>
                        <AdminPanelSettingsIcon fontSize='small' />
                        <p>Admin</p>
                    </div>
                    <div className='flex gap-2 text-sm text-gray-600 items-center mt-1.5'>
                        <PhoneAndroidIcon fontSize='small' />
                        <p>7983613144</p>
                    </div>

                </div>
                <div className='flex gap-3 mt-3 items-center justify-start ml-2'>
                    <button className='text-gray-50 bg-blue-400 rounded-sm px-4 py-1 border-blue-400 cursor-pointer hover:bg-transparent hover:border-blue-500 border hover:text-blue-500'>
                        <LogoutIcon fontSize='small' className='mr-1' />
                        logout</button>
                    <button className='border-blue-500 border text-blue-400 rounded-sm px-4 py-1'>
                        <AutoAwesomeIcon fontSize='small' className='mr-1' />
                        Edit</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileModel