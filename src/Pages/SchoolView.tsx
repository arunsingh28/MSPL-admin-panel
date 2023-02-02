import React from 'react'
import { schoolGetById, Ischool } from '../http/api'
import { ParentCompProps } from './Dashboard'
import { useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BadgeIcon from '@mui/icons-material/Badge';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const SchoolView = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    let { id }: any = useParams<{ id: string }>()

    const [school, setSchool] = React.useState<Ischool>()
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setLoading(true)
        const fetchSchool = async () => {
            try {
                const response = await schoolGetById(id)
                setSchool(response.data.school)
                setLoading(false)
            } catch (error) {
                console.log('ERROR', error)
                setLoading(false)
            }
        }
        fetchSchool()
    }, [id])


    return (
        <div>
            {
                loading ? <LinearProgress /> : (
                    <>
                        <h1 className='text-3xl font-semibold text-gray-700 '>{school?.schoolName}</h1>
                        <div className='mt-5 shadow-lg px-5 py-5'>
                            <h2 className='font-semibold text-blue-900 text-xl'>Address</h2>
                            <div className='mt-3'>
                                <p>{school?.schoolAddress.schoolArea}</p>
                                <p>{school?.schoolAddress.schoolCity}</p>
                                <p>{school?.schoolAddress.pinCode}</p>
                            </div>
                        </div>
                        {/* contact person */}
                        <div className='mt-5 shadow-md px-5 py-5 hover:shadow-xl'>
                            <h2 className='font-semibold text-blue-900 text-xl'>Contact Person</h2>
                            <div className='my-5 flex gap-4'>
                                <div className='flex flex-col justify-center items-center border px-10 py-3 rounded-md bg-[#3da2541f] border-[#3da2541f] shadow-md'>
                                    <BadgeIcon fontSize='large' sx={{color: '#3da252'}}/>
                                    <p className=''>{school?.contestPerson.contactName}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center border px-10 py-3 rounded-md bg-[#3da2541f] border-[#3da2541f] shadow-md'>
                                    <AlternateEmailIcon fontSize='large'  sx={{color: '#3da252'}}/> 
                                    <p>{school?.contestPerson.contactEmail}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center border px-10 py-3 rounded-md bg-[#3da2541f] border-[#3da2541f] shadow-md'>
                                    <LocalPhoneIcon fontSize='large'  sx={{color: '#3da252'}}/>
                                    <p>{school?.contestPerson.contactPhone}</p>
                                </div>
                            </div>
                        </div>
                        {/* sports */}
                        <div className='mt-5 shadow-md px-5 py-5 hover:shadow-xl'>
                            <h2 className='font-semibold text-blue-900 text-xl'>Sports</h2>
                            <div className='flex my-5 items-center gap-5'>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#699cb52e] shadow-md'>
                                    <h2>Badminton</h2>
                                    {school?.sports.isBadminton ? <DoneIcon color='success'/> : <ClearIcon color='error'/>}
                                </div>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#c1f8a940] shadow-md'>
                                    <h2>Football</h2>
                                    {school?.sports.isFootball ? <DoneIcon color='success'/> : <ClearIcon color='error'/>}
                                </div>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#6550ff24] shadow-md'>
                                    <h2>Cricket</h2>
                                    {school?.sports.isCricket ? <DoneIcon color='success'/> : <ClearIcon color='error'/>}
                                </div>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#4bedce2b] shadow-md'>
                                    <h2>Tennis</h2>
                                    {school?.sports.isTennis ? <DoneIcon color='success'/> : <ClearIcon color='error' />}
                                </div>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#f6be4636] shadow-md'>
                                    <h2>Baskitball</h2>
                                    {school?.sports.isBasketball ? <DoneIcon color='success'/> : <ClearIcon color='error'/>}
                                </div>
                                <div className='px-10 py-3 border flex flex-col items-center justify-center gap-2 rounded-md bg-[#5b5d5e26] shadow-md'>
                                    <h2>Other</h2>
                                    {school?.sports.other}
                                </div>
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SchoolView