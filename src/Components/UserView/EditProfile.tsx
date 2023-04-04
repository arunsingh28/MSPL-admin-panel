import React from 'react'
import { getUserById } from '../../http/api'
import { Iuser } from './UserTable'
import { TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../store/hook'

interface Iprops {
    id: string
    setVisiable: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfile = ({ id, setVisiable }: Iprops) => {
    const { token } = useAppSelector(state => state.auth)
    // stop scrolling
    React.useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const [loading, setLoading] = React.useState(false)

    const [user, setUser] = React.useState<Iuser>()

    React.useEffect(() => {
        setLoading(true)
        getUserById(id, token)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])


    const getAge = (age: any) => {
        const today = new Date();
        const birthDate = new Date(age);
        let age1 = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age1--;
        }
        return age1
    }


    return (
        <div className='absolute top-0 left-0 bg-[#4444445e] h-screen w-screen' style={{ zIndex: 9999 }}>
            <div className='bg-white w-1/3 m-auto mt-20 rounded-md'>
                <div className='flex justify-between px-2 items-center py-2 rounded-md border-b'>
                    <h1 className='text-xl font-bold text-gray-600'>Edit Profile</h1>
                    <button className='text-2xl text-gray-600' onClick={() => setVisiable(false)}>x</button>
                </div>
                {
                    loading ? <div className='w-full py-5 flex items-center justify-center'>
                        <CircularProgress size={22} color="primary" />
                    </div> : <div className='py-2 mx-2 flex gap-4'>
                        <div className='w-full'>
                            {/* <h4 className='text-gray-600 font-semibold'>Edit Deatils</h4> */}

                            <div className='flex flex-col'>
                                <label className='text-gray-600 text-sm mb-2'>Update hight</label>
                                <TextField label={user?.measurement.height + ' cm'} variant='outlined' />
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label className='text-gray-600 text-sm mb-2'>Update weight</label>
                                <TextField label={user?.measurement.weight + ' kg'} variant='outlined' />
                            </div>
                            <div className='flex flex-col mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text-gray-600 text-sm mb-2'>Update age</label>
                                    <label className='text-gray-600 text-sm mr-1 bg-green-400 rounded-md px-2'>Current Age {getAge(user?.dob)} Year</label>
                                </div>
                                <TextField type="date" variant='outlined' />
                            </div>
                            <Button variant='contained' fullWidth sx={{ marginTop: 1, backgroundColor: '#1b356b', color: 'white', height: 50, '&:hover': { backgroundColor: '#11244e' } }}>Save</Button>
                        </div>
                    </div>
                }

            </div>


        </div>
    )
}

export default EditProfile