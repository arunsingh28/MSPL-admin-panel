import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../http/api'
import { MarkEmailRead, PhoneAndroid, Transgender, Female, Male } from '@mui/icons-material';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Back from '../Back';
import chart from '../../Assets/download.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



// import CircularProgress from '@mui/material/CircularProgress';

import ProfileSkeleton from '../Skeleton/ProfileSkeleton';

interface Iuser {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    dob: Date;
    sex: string;
    referal_code: string;
    planType: string;
    measurement: {
        height: number;
        weight: number;
    };
    // bca: mongoose.Schema.Types.ObjectId;
    isPaid: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: Number
    oldOtp: Number
}

const Profile = () => {
    const { id }: any = useParams()
    const [user, setUser] = React.useState<Iuser>()

    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        getUserById(id).then(res => {
            setIsLoading(false)
            setUser(res.data)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    const getAge = (dateString: any) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <>
            {/* back module */}
            <Back />

            <div className='flex gap-3 flex-wrap justify-between'>
                {/* personal info */}
                <div className='pr-5 pl-5 py-4 border rounded-md bg-blue-50 hover:shadow-lg'>
                    {
                        isLoading ?
                            <ProfileSkeleton /> : <>
                                <div className='flex gap-2 items-center justify-center'>
                                    <div className=''>
                                        <h1 className='text-2xl text-gray-700 font-semibold w-full'>{user?.name}</h1>
                                        <div className='mt-5 flex gap-2'>
                                            <MarkEmailRead color='success' />
                                            <p className='text-gray-700'>{user?.email}</p>
                                        </div>
                                        <div className='mt-5 flex gap-2'>
                                            <PhoneAndroid color='info' />
                                            <p className='text-gray-700'>{(user as any)?.phone}</p>
                                        </div>
                                    </div>
                                    {
                                        user?.sex === 'Male' ? <img src="https://sportylife.in/public/uploads/images/vtv2Op53eFyqtVsdS9ELPKZFifM2eEnDDc5VqFp1.png" alt="img" className='w-20 h-20 flex-1 rounded-md drop-shadow-md ml-4' /> : <img src="https://sportylife.in/public/uploads/images/dummy_female.png" alt="img" className='w-20 h-20 flex-1 rounded-md drop-shadow-md ml-4' />
                                    }
                                </div>
                            </>
                    }
                </div>
                {/* measurement */}
                <div className='py-4 px-4 border rounded-md bg-red-50 hover:shadow-lg'>
                    <h2 className='font-semibold text-gray-600'>Measurments</h2>
                    {
                        isLoading ? <ProfileSkeleton /> : <>
                            <div className='flex gap-4 mt-5'>
                                <div className='rounded-md py-2 px-5 flex flex-col items-center justify-center'>
                                    <SettingsAccessibilityIcon fontSize='large' sx={{ color: '#444', fontSize: 50 }} />
                                    <span className='text-gray-700 mt-2'>{user?.measurement.height} CM</span>
                                </div>
                                <div className=' rounded-md flex flex-col items-center justify-center py-2 px-5'>
                                    <MonitorWeightIcon fontSize='large' sx={{ color: '#444', fontSize: 50 }} />
                                    <span className='text-gray-700 mt-2'>{user?.measurement.weight} KG</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
                {/* body info */}
                <div className='py-4 pl-5 pr-14 border rounded-md bg-green-50 hover:shadow-lg'>
                    <h2 className='font-semibold text-gray-600'>Body Info</h2>
                    {
                        isLoading ? <ProfileSkeleton /> : <>
                            <div className='mt-7 flex gap-2'>
                                {
                                    user?.sex === 'Male' ? <Male /> : <Female />
                                }
                                <p className='text-gray-700'>{user?.sex}</p>
                            </div>
                            <div className='mt-5 flex gap-2'>
                                <CalendarMonthIcon color='error' />
                                <p className='text-gray-700'>{getAge((user as any)?.dob)} Year</p>
                            </div>
                        </>
                    }
                </div>
                {/* account info */}
                <div className='py-4 pr-14 pl-5 border rounded-md bg-orange-50 hover:shadow-lg'>
                    <h2 className='font-semibold text-gray-600'>Account Info</h2>
                    {
                        isLoading ? <ProfileSkeleton /> :
                            <>
                                <div className='mt-2 flex gap-2 items-center'>
                                    {user?.isPaid ? <div className='w-2 h-2 bg-green-500 rounded-full' /> : <div className='w-2 h-2 bg-red-500 rounded-full' />}
                                    <p className='text-gray-700'>{user?.isPaid ? 'Paid' : 'Not Paid'}</p>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    {!user?.isBlocked ? <div className='w-2 h-2 bg-green-500 rounded-full' /> : <div className='w-2 h-2 bg-red-500 rounded-full' />}
                                    <p className='text-gray-700'>{!user?.isBlocked ? 'Not Block' : 'Blocked'}</p>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    {user?.isVerified ? <div className='w-2 h-2 bg-green-500 rounded-full' /> : <div className='w-2 h-2 bg-red-500 rounded-full' />}
                                    <p className='text-gray-700'>{user?.isVerified ? 'Verified' : 'Not Verified'}</p>
                                </div>
                                <div className='mt-1 flex gap-2 items-center'>
                                    {!user?.isDeleted ? <div className='w-2 h-2 bg-green-500 rounded-full' /> : <div className='w-2 h-2 bg-red-500 rounded-full' />}
                                    <p className='text-gray-700'>{!user?.isDeleted ? 'Not Archive' : 'Archive'}</p>
                                </div>
                            </>
                    }
                </div>
                {/* package detail */}
                <div className='py-4 px-5 border rounded-md bg-pink-50 hover:shadow-lg'>
                    <h2 className='font-semibold text-gray-600'>Package Detail</h2>
                    {
                        isLoading ? <ProfileSkeleton /> : <>
                            <div className='mt-5 flex gap-2 px-10'>
                                <LocalOfferIcon color='primary' />
                                <p className='text-gray-700'>Not Found</p>
                            </div>
                        </>
                    }
                </div>
            </div>

            {/* chat plan */}
            <div className='py-5'>
                <h2 className='text-2xl text-gray-700 font-semibold'>Reports</h2>
                <div className='flex gap-4 mt-5'>
                    <div className='border h-96 w-1/2 bg-cyan-50'>
                        <h1 className='ml-1 mt-1 text-gray-600 font-semibold'>Prgress Report</h1>
                        <img src={chart} alt="" className='mt-2 mx-1' />
                    </div>
                    <div className='border h-96 w-1/2 bg-yellow-50'>
                        <h1 className='ml-1 mt-1 text-gray-600 font-semibold'>Clories Report</h1>
                        <img src={chart} alt="" className='mt-2 mx-1' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile

