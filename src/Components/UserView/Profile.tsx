import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserById, attachUserToNutritionist } from '../../http/api'
import { MarkEmailRead, PhoneAndroid, Female, Male } from '@mui/icons-material';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Back from '../Back';
import chart from '../../Assets/download.png'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GaugeChart from 'react-gauge-chart'
import { useAppSelector } from '../../store/hook';
import { toast } from 'react-toastify'


// import CircularProgress from '@mui/material/CircularProgress';

import ProfileSkeleton from '../Skeleton/ProfileSkeleton';

interface Iuser {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    dob: Date;
    BMI: number;
    BMR: number;
    gender: string;
    referal_code: string;
    planType: string;
    nutritionist: string
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

    const { user: currentUser, token } = useAppSelector(state => state.auth)


    const { id }: any = useParams()
    const [user, setUser] = React.useState<Iuser>()

    const [isLoading, setIsLoading] = React.useState(false)

    const [BMI, setBMI] = React.useState(0.0)

    const convertToDouble = (num: any) => {
        const newFraction = 0 + '.' + num
        return setBMI(parseFloat(newFraction))
    }

    React.useEffect(() => {
        setIsLoading(true)
        getUserById(id, token).then(res => {
            setIsLoading(false)
            setUser(res.data)
            convertToDouble(res.data?.BMI)
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


    const converToPercent = (num: any, howMuch: number) => {
        return num / howMuch
    }

    const handleBook = (e: any) => {
        const nutritionist = currentUser._id
        attachUserToNutritionist(id, nutritionist, { nutritionist: currentUser._id }, token).then(res => {
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            {/* back module */}
            <Back />
            <div className='flex gap-6 flex-wrap'>
                {/* personal info */}
                <div className='pr-5 pl-5 py-4 border rounded-md bg-blue-50 hover:shadow-lg'>
                    {
                        isLoading ?
                            <ProfileSkeleton /> : <>
                                <div className='flex gap-2 items-center justify-center'>
                                    <div className=''>
                                        <h1 className='text-2xl text-gray-700 font-semibold w-full'>{user?.name || 'Null'}</h1>
                                        <div className='mt-5 flex gap-2'>
                                            <MarkEmailRead color='success' />
                                            <p className='text-gray-700'>{user?.email || 'Null'}</p>
                                        </div>
                                        <div className='mt-5 flex gap-2'>
                                            <PhoneAndroid color='info' />
                                            <p className='text-gray-700'>{(user as any)?.phone || 'Not found'}</p>
                                        </div>
                                    </div>
                                    {
                                        user?.gender === 'Male' ? <img src="https://sportylife.in/public/uploads/images/vtv2Op53eFyqtVsdS9ELPKZFifM2eEnDDc5VqFp1.png" alt="img" className='w-20 h-20 flex-1 rounded-md drop-shadow-md ml-4' /> : <img src="https://sportylife.in/public/uploads/images/dummy_female.png" alt="img" className='w-20 h-20 flex-1 rounded-md drop-shadow-md ml-4' />
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
                                    <span className='text-gray-700 mt-2'>{user?.measurement?.height || 0} CM</span>
                                </div>
                                <div className=' rounded-md flex flex-col items-center justify-center py-2 px-5'>
                                    <MonitorWeightIcon fontSize='large' sx={{ color: '#444', fontSize: 50 }} />
                                    <span className='text-gray-700 mt-2'>{user?.measurement?.weight || 0} KG</span>
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
                                    user?.gender === 'Male' ? <Male /> : <Female />
                                }
                                <p className='text-gray-700'>{user?.gender || 'Null'}</p>
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
                {/* BMI */}
                <div className='py-4 px-5 border rounded-md bg-black hover:shadow-lg'>
                    <h2 className='font-semibold text-gray-200'>BMI : {user?.BMI?.toFixed(2) || 0}</h2>
                    {
                        isLoading ? <ProfileSkeleton /> : <GaugeChart id="gauge-chart"
                            nrOfLevels={30}
                            // marginInPercent={10}
                            cornerRadius={2}
                            arcsLength={[0.3, 0.3, 0.3, 0.3, 0.3]}
                            formatTextValue={value => `${value} kg/m2`}
                            // arcsLength={[0.3, 0.1, 0.2]}
                            colors={["#4ee333", "#f0ce22", "#ff9f0f", "#fc4857", "#ff061a"]}
                            arcWidth={0.1}
                            percent={BMI}
                        />
                    }
                </div>
                <div className='py-4 flex-col flex items-center px-5 border rounded-md bg-green-200 hover:shadow-lg'>
                    {/* <h2 className='font-semibold text-gray-700'>BMR : {user?.BMR.toFixed(2)} Cal</h2> */}
                    <h2 className='font-semibold text-gray-600'>BMR : {user?.BMR?.toFixed(2) || 0} Cal</h2>
                    <div>
                        {/* carb */}
                        <div className='mt-2 flex gap-2 items-center'>
                            <div className='w-2 h-2 bg-red-500 rounded-full' />
                            <p className='text-gray-700'>Carb : {converToPercent(user?.BMR?.toFixed(2), 50) || 0} Gram</p>
                        </div>
                        {/* fat */}
                        <div className='mt-2 flex gap-2 items-center'>
                            <div className='w-2 h-2 bg-yellow-500 rounded-full' />
                            <p className='text-gray-700'>Fat : {converToPercent(user?.BMR?.toFixed(2), 20) || 0} Gram</p>
                        </div>
                        {/* protein */}
                        <div className='mt-2 flex gap-2 items-center'>
                            <div className='w-2 h-2 bg-green-500 rounded-full' />
                            <p className='text-gray-700'>Protein : {converToPercent(user?.BMR?.toFixed(2), 30) || 0} Gram</p>
                        </div>
                    </div>
                </div>
                <button className={user?.nutritionist ? 'bg-gray-600 px-10 h-10 cursor-not-allowed text-gray-100 rounded-sm' : 'bg-indigo-600 px-10 h-10 text-gray-100 rounded-sm'} disabled={user?.nutritionist ? true : false} onChange={(e)=> e.currentTarget.disabled} onClick={handleBook}>Take</button>
            </div>
            {/* BMI */}




            {/* chat plan */}
            {/* <div className='py-5'>
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
            </div> */}
        </>
    )
}

export default Profile

