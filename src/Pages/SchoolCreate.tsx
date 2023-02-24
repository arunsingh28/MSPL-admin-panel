import React from 'react'
import { ParentCompProps } from './Dashboard'
import { schoolCreate } from '../http/api'
import Button from '@mui/material/Button';
import Notification from '../Components/Notification';
import TextField from '@mui/material/TextField';
import { AxiosError } from 'axios'
import FileUploader from '../Components/FileUploader';

interface SchoolCreateProps {
    schoolName: string
    schoolCity: string
    pinCode: number
    schoolArea: string
    contactName: string
    contactPhone: number
    contactEmail: string
    cricket: boolean
    football: boolean
    badminton: boolean
    basketball: boolean
    tennis: boolean
    otherSport: string
}

const SchoolCreate = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [schoolForm, setSchoolForm] = React.useState<SchoolCreateProps>({
        schoolName: '',
        schoolCity: '',
        pinCode: 0,
        schoolArea: '',
        contactName: '',
        contactPhone: 0,
        contactEmail: '',
        cricket: false,
        football: false,
        badminton: false,
        basketball: false,
        tennis: false,
        otherSport: ''
    })

    const [notification, setNotification] = React.useState({
        message: '',
        visible: false,
        type: 'success'
    })

    React.useEffect(() => {
        if (notification.visible) {
            setTimeout(() => {
                setNotification({
                    message: '',
                    visible: false,
                    type: 'success'
                })
            }, 3000)
        }
    }, [schoolForm, notification])


    const handleCreateSchool = async (e: any) => {
        e.preventDefault()
        // form validation
        if (schoolForm.schoolName === '') {
            setNotification({
                message: 'School Name is required',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.schoolCity === '') {
            setNotification({
                message: 'School City is required',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.pinCode === 0) {
            setNotification({
                message: 'Pin Code is required',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.schoolArea === '') {
            setNotification({
                message: 'School Address is required',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.contactName === '') {
            setNotification({
                message: 'Contact Name is required',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.contactPhone === 0 || schoolForm.contactPhone.toString().length !== 10) {
            setNotification({
                message: 'Please enter valid phone number',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.contactEmail === '' || !schoolForm.contactEmail.includes('@')) {
            setNotification({
                message: 'Please enter valid email',
                visible: true,
                type: 'error'
            })
            return
        }
        if (schoolForm.cricket === false && schoolForm.football === false && schoolForm.badminton === false && schoolForm.basketball === false && schoolForm.tennis === false && schoolForm.otherSport === '') {
            setNotification({
                message: 'Please select atleast one sport',
                visible: true,
                type: 'error'
            })
            return
        }

        // send data to server
        await schoolCreate(schoolForm).then(async (res) => {
            console.log('res', await res.data)
            setNotification({
                message: 'School Created Successfully',
                visible: true,
                type: 'success'
            })
            //    reset form
            setSchoolForm({
                schoolName: '',
                schoolCity: '',
                pinCode: 0,
                schoolArea: '',
                contactName: '',
                contactPhone: 0,
                contactEmail: '',
                cricket: false,
                football: false,
                badminton: false,
                basketball: false,
                tennis: false,
                otherSport: ''
            })
        }).catch((err: AxiosError | any) => {
            setNotification({
                message: err.response?.data?.message,
                visible: true,
                type: 'error'
            })
        })

    }

    const handleReset = () => {
        setNotification({
            message: 'Form Reset Successfully',
            visible: true,
            type: 'warning'
        })
        setSchoolForm({
            schoolName: '',
            schoolCity: '',
            pinCode: 0,
            schoolArea: '',
            contactName: '',
            contactPhone: 0,
            contactEmail: '',
            cricket: false,
            football: false,
            badminton: false,
            basketball: false,
            tennis: false,
            otherSport: ''
        })
    }

    return (
        <div className='contianer w-full px-4'>
            <Notification setting={notification} />
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>Create New School</h1>
            <FileUploader type={"school"}/>
            <div className='flex justify-center'>
                <div className="mt-6 grid grid-cols-3 w-1/3 justify-center items-center text-gray-400">
                    <hr className='border-gray-400' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-gray-400' />
                </div>
            </div>
            <div className='border my-8 w-full mr-5 px-4 py-7 shadow-lg'>
                <form className='' onSubmit={handleCreateSchool}>
                    <div className='flex flex-col gap-2'>
                        {/* <label htmlFor="school-name" className='text-gray-700 font-sans font-semibold text-[17px]'>School Full Name *</label> */}
                        <TextField type="text" id='school-name'
                            label="School Full Name" variant="outlined"
                            value={schoolForm.schoolName}
                            onChange={(e) => setSchoolForm({
                                ...schoolForm,
                                schoolName: e.target.value
                            })}
                            className='w-full border h-12 rounded-md px-2 text-gray-700' />
                    </div>
                    <div className='flex gap-2 mt-10 justify-between items-center'>
                        <div>
                            {/* <label htmlFor="school-city" className='text-gray-700 font-sans font-semibold text-[17px]'>City *</label> */}
                            <TextField type="text" id='school-city'
                                label="School's City" variant="outlined"
                                value={schoolForm.schoolCity}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    schoolCity: e.target.value
                                })}
                                className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                        <div>
                            {/* <label htmlFor="school-pincode" className='text-gray-700 font-sans font-semibold text-[17px]'>Pincode *</label> */}
                            <TextField type="number" id='school-pincode'
                                label="School's Pinode" variant="outlined"
                                value={schoolForm.pinCode}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    pinCode: Number(e.target.value)
                                })}
                                placeholder='Enter School Pincode' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                        <div className='w-[50%]'>
                            {/* <label htmlFor="school-address" className='text-gray-700 font-sans font-semibold text-[17px]'>School Address *</label> */}
                            <TextField type="text" id='school-address'
                                label="School's Address" variant="outlined"
                                value={schoolForm.schoolArea}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    schoolArea: e.target.value
                                })}
                                placeholder='Enter School Address' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                    </div>
                    <h3 className='text-gray-800 pt-8 underline text-[17px] font-semibold'>School's Contact Person</h3>
                    <div className='flex gap-2 mt-4 justify-between items-center'>
                        <div className='w-[40%]'>
                            {/* <label htmlFor="contact-name" className='text-gray-700 font-sans font-semibold text-[17px]'>Name *</label> */}
                            <TextField type="text" id='contact-name'
                                label="Name" variant="outlined"
                                value={schoolForm.contactName}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    contactName: e.target.value
                                })}
                                placeholder='Contact Person Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                        <div className='w-[30%]'>
                            {/* <label htmlFor="phone" className='text-gray-700 font-sans font-semibold text-[17px]'>Phone (with country code) *</label> */}
                            <TextField type="number" id='phone'
                                label="Phone" variant="outlined"
                                value={schoolForm.contactPhone}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    contactPhone: Number(e.target.value)
                                })}
                                placeholder='Contact Person Phone' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                        <div className='w-[40%]'>
                            {/* <label htmlFor="school-email" className='text-gray-700 font-sans font-semibold text-[17px]'>Email  *</label> */}
                            <TextField type="text" id='school-email'
                                label="Email" variant="outlined"
                                value={schoolForm.contactEmail}
                                onChange={(e) => setSchoolForm({
                                    ...schoolForm,
                                    contactEmail: e.target.value
                                })}
                                placeholder='Enter School Email' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                        </div>
                    </div>
                    <h3 className='text-gray-800 pt-8 underline text-[17px] font-semibold'>Available Sports in School</h3>
                    <div className='flex mt-3'>
                        <div className='w-[20%] border px-5 flex items-center'>
                            <label htmlFor="cricket" className='text-gray-700 font-sans font-semibold text-[17px]'>Cricket</label>
                            <input type="checkbox" id='cricket' defaultChecked={schoolForm.cricket}
                                onChange={(e) => setSchoolForm({ ...schoolForm, cricket: e.target.checked })}
                                className='m-3 h-4 w-4' />
                        </div>
                        <div className='w-[20%] border px-5 flex items-center'>
                            <label htmlFor="football" className='text-gray-700 font-sans font-semibold text-[17px]'>Football</label>
                            <input type="checkbox" id='football' defaultChecked={schoolForm.football}
                                onChange={(e) => setSchoolForm({ ...schoolForm, football: e.target.checked })}
                                className='m-3 h-4 w-4' />
                        </div>
                        <div className='w-[20%] border px-5 flex items-center'>
                            <label htmlFor="Badminton" className='text-gray-700 font-sans font-semibold text-[17px]'>Badminton</label>
                            <input type="checkbox" id='Badminton' defaultChecked={schoolForm.badminton}
                                onChange={(e) => setSchoolForm({ ...schoolForm, badminton: e.target.checked })}
                                className='m-3 h-4 w-4' />
                        </div>
                        <div className='w-[20%] border px-5 flex items-center'>
                            <label htmlFor="Basketball" className='text-gray-700 font-sans font-semibold text-[17px]'>Basketball</label>
                            <input type="checkbox" id='Basketball'
                                defaultChecked={schoolForm.basketball}
                                onChange={(e) => setSchoolForm({ ...schoolForm, basketball: e.target.checked })}
                                className='m-3 h-4 w-4' />
                        </div>
                        <div className='w-[20%] border px-5 flex items-center'>
                            <label htmlFor="Tennis" className='text-gray-700 font-sans font-semibold text-[17px]'>Tennis</label>
                            <input type="checkbox" id='Tennis'
                                defaultChecked={schoolForm.tennis}
                                onChange={(e) => setSchoolForm({ ...schoolForm, tennis: e.target.checked })}
                                className='m-3 h-4 w-4' />
                        </div>
                    </div>
                    <h3 className='text-gray-800 pt-8 underline text-[17px] font-semibold'>If Any Other Sports</h3>
                    <div className='w-[50%] flex items-center mt-3'>
                        {/* <label htmlFor="Other" className='text-gray-700 font-sans font-semibold text-[17px]'>Other Sports</label> */}
                        <TextField type="text" id='Other'
                            label="Other Sports" variant="outlined"
                            value={schoolForm.otherSport}
                            onChange={(e) => setSchoolForm({ ...schoolForm, otherSport: e.target.value })}
                            className='border ml-3 h-12 rounded-md w-1/2 px-2' />
                    </div>
                    <div className='flex gap-5 mt-10'>
                        <Button type='submit' sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b' }} size='large' variant="contained">Save</Button>
                        <Button type='reset' sx={{ paddingX: 7, paddingY: 1.6 }} size='large' color='error' variant="outlined" onClick={handleReset}>Clear</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SchoolCreate