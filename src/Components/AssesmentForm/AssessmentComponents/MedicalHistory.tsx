import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '../../../store/hook';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { saveMedicalHistory, getAssessmentForm } from '../../../http/api'

interface FoodLifeStyleProps {
    FamilyHistory: string
    WeightHistory: string
    Diabetes: string
    PMS: string
    HeartHealth: string
    Thyroid: string
    GutHealth: string
    BowelMovement: string
    Other: string
    Gender: string
    OnMedications: [{
        medicationName: string,
        time: string,
        reason: string
    }]
    Client: string
}

const MedicalHistory = () => {

    const { token, user } = useAppSelector(state => state.auth)

    const client = user?._id



    const [gender, setGender] = React.useState<'Male' | 'Female'>()

    const [disableBtn, setDisableBtn] = React.useState(false)

    const [medicalHistory, setMedicalHistory] = React.useState<FoodLifeStyleProps>({
        FamilyHistory: '',
        WeightHistory: '',
        Diabetes: '',
        PMS: '',
        HeartHealth: '',
        Thyroid: '',
        GutHealth: '',
        BowelMovement: '',
        Other: '',
        Gender: '',
        OnMedications: [{
            medicationName: '',
            time: '',
            reason: ''
        }],
        Client: client
    })

    // React.useEffect(() => {
    //     getAssessmentForm(client, token).then(res => {
    //         console.log(res.data)
    //         setMedicalHistory(res.data.MEDICAL_HISTORY)
    //     })
    // }, [])

    // array for PMS symptoms
    const [PMS, setPMS] = React.useState<any>([])

    const [onMedication, setOnMedication] = React.useState<any>([{
        medicationName: '',
        time: '',
        reason: '',
        id: 1
    }])

    const addMoreMedication = () => {
        setOnMedication([...onMedication, {
            medicationName: '',
            time: '',
            reason: '',
            id: onMedication.length + 1
        }])
    }

    const handleAddPMS = async (value: string) => {
        // save only unique values
        if (PMS.includes(value)) {
            toast.error('Already added')
            return
        }
        setPMS([...PMS, value])
        // added to medical history array
        setMedicalHistory({
            ...medicalHistory, PMS: PMS
        })
    }

    const handleRemovePMS = (value: string) => {
        setPMS(PMS.filter((item: string) => item !== value))
        // remove from medical history array
        setMedicalHistory({ ...medicalHistory, PMS: PMS })
    }

    const handleMedicalChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setMedicalHistory({ ...medicalHistory, [name]: value })
    }

    // delte the medication field
    const handleDeleteMedication = (id: number) => {
        // dont remove the first field
        if (onMedication.length === 1) {
            toast.error('Cannot delete the first field')
            return
        }
        setOnMedication(onMedication.filter((item: any) => item.id !== id))
    }


    const handleChnageonMedication = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target
        setOnMedication(onMedication.map((item: any) => {
            if (item.id === id) {
                return { ...item, [name]: value }
            }
            return item
        }))
        setMedicalHistory({ ...medicalHistory, OnMedications: onMedication })
    }


    // handle check all field should not be empty
    const handleCheckAllField = () => {
        if (medicalHistory.FamilyHistory === '') {
            toast.error('Family History is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.Gender === '') {
            toast.error('Gender is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.Diabetes === '') {
            toast.error('Diabetes is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.PMS === '') {
            toast.error('PMS is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.HeartHealth === '') {
            toast.error('Heart Health is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.Thyroid === '') {
            toast.error('Thyroid is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.GutHealth === '') {
            toast.error('Gut Health is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.BowelMovement === '') {
            toast.error('Bowel Movement is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.OnMedications[0].medicationName === '') {
            toast.error('Medication Name is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.OnMedications[0].time === '') {
            toast.error('Time is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.OnMedications[0].reason === '') {
            toast.error('Reason is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.WeightHistory === '') {
            toast.error('Weight History is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.Other === '') {
            toast.error('Other is required')
            setDisableBtn(false)
            return false
        }
        if (medicalHistory.Client === '') {
            toast.error('Please login again there is some error')
            setDisableBtn(false)
            return false
        }
    }


    const handleSaveMedicalHistory = async () => {
        const check = await handleCheckAllField()
        if (check === false) {
            return
        } else {
            try {
                const res = await saveMedicalHistory(medicalHistory, token)
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error: any) {
                console.log(error)
                toast.error(error.response.data.message)
            }

        }
    }


    return (
        <div>
            <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>|||. MEDICAL HISTORY </h1>
            {/* Family History, if any */}
            <div className='flex mr-4 mt-4'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Family History, if any  </p>
                </div>
                <div className='w-full ml-20'>
                    <textarea className='w-full border border-blue-300 h-16 p-1 rounded-sm' name="FamilyHistory" value={medicalHistory?.FamilyHistory} onChange={handleMedicalChangeValue} placeholder='Write Family History...' />
                    {/* <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Contact Number' /> */}
                </div>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="gender" className='text-gray-600  text-[12px]'>Gender</label>
                <select className='w-52 border-2 border-gray-400 py-2 px-1' defaultValue={medicalHistory?.Gender} onChange={(e) => {
                    setMedicalHistory({ ...medicalHistory, Gender: e.target.value })
                    setGender(e.target.value === 'Female' ? 'Female' : 'Male')
                }}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

            </div>

            <div className='flex mr-4 mt-4'>
                <div className='flex w-full gap-2 justify-between'>
                    <div className='w-full'>
                        <label htmlFor="Diabetes" className='text-gray-600 text-[12px]'>Diabetes</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={medicalHistory?.Diabetes} onChange={(e) => {
                            setMedicalHistory({ ...medicalHistory, Diabetes: e.target.value })
                        }}>
                            <option value="Pre DM">Pre DM</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="Heart" className='text-gray-600 text-[12px]'>Heart Health</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={"Hypertension"} onChange={(e) => {
                            setMedicalHistory({ ...medicalHistory, HeartHealth: e.target.value })
                        }}>
                            <option value="Hypertension">Hypertension</option>
                            <option value="Hypotension">Hypotension</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="Thyroid" className='text-gray-600 text-[12px]'>Thyroid</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={"Hyper"} onChange={(e) => {
                            setMedicalHistory({ ...medicalHistory, Thyroid: e.target.value })
                        }}>
                            <option value="Hyper">Hyper</option>
                            <option value="Hypo">Hypo</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    {/* Gut Health */}
                    <div className='w-full'>
                        <label htmlFor="GutHealth" className='text-gray-600 text-[12px]'>Gut Health </label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={"Bloating"} onChange={(e) => {
                            setMedicalHistory({ ...medicalHistory, GutHealth: e.target.value })
                        }}>
                            <option value="Bloating">Bloating</option>
                            <option value="Heart Burn">Heart Burn</option>
                            <option value="Acidity">Acidity</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex mr-4 mt-4'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>History of Weight Gain / Weight Loss, if any </p>
                </div>
                <div className='w-full ml-20'>
                    <textarea className='w-full border border-blue-300 h-16 p-1 rounded-sm' value={medicalHistory.WeightHistory} onChange={(e) => setMedicalHistory({ ...medicalHistory, WeightHistory: e.target.value })} placeholder='Write History of Weight Gain / Weight Loss, if any ' />
                </div>
            </div>


            {/* Bowel Movement */}
            <div className='flex mr-4 mt-2'>
                <div className='flex w-full gap-2 justify-between'>
                    <div className='w-full'>
                        <label htmlFor="Bowel" className='text-gray-600 text-[12px]'>Bowel Movement</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={'Regular'} onChange={(e) => {
                            setMedicalHistory({ ...medicalHistory, BowelMovement: e.target.value })
                        }}>
                            <option value="Regular">Regular</option>
                            <option value="Irregular">Irregular</option>
                        </select>
                    </div>
                    {
                        gender === 'Female' ? <>
                            <div className='w-full'>
                                <label htmlFor="BMI" className='text-gray-600 text-[12px]'>Gynec Health</label>
                                <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={'Irregular menstruation'} onChange={(e) => {
                                    setMedicalHistory({ ...medicalHistory, GutHealth: e.target.value })
                                }}>
                                    <option value="Irregular menstruation">Irregular menstruation</option>
                                    <option value="PCOD">PCOD</option>
                                    <option value="PCOS">PCOS</option>
                                    <option value="Menopause">Menopause</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                            <div className='w-full'>
                                <label htmlFor="PMS" className='text-gray-600 text-[12px]'>PMS symptoms</label>
                                <select className='w-full border-2 border-gray-300 rounded-sm p-2' defaultValue={"Bloating"} onChange={(e) => handleAddPMS(e.target.value)}>
                                    <option value="Bloating">Bloating</option>
                                    <option value="Hypo">Mood swings</option>
                                    <option value="Nocturnal cramps">Nocturnal cramps</option>
                                    <option value="Cravings / Hunger">Cravings / Hunger </option>
                                    <option value="Muscle sorenesess">Muscle sorenesess</option>
                                    <option value="Back pain">Back pain</option>
                                    <option value="Giddiness">Giddiness</option>
                                    <option value="Motion sickness">Motion sickness</option>
                                    <option value="Loss of Appetite">Loss of Appetite</option>
                                    <option value="None">None</option>
                                </select>
                            </div></> : null
                    }
                </div>
            </div>

            {/* PMS Symptoms */}
            {
                gender === 'Female' ? <div className='flex mr-4 my-4 flex-col'>
                    <h5 className='text-gray-600 text-sm'>Added PMS Symptoms</h5>
                    <div className='flex flex-wrap gap-4 mt-2'>
                        {
                            PMS && PMS.length === 0 ? <p className='text-red-500 text-center border-2 px-10 py-2 border-red-100'>No PMS Symptoms Added</p> : PMS.map((item: any, index: number) => {
                                return (
                                    <div className='relative'>
                                        <h6 className='px-3 py-1 bg-gray-100 rounded-sm'>{item}</h6>
                                        <CloseOutlinedIcon className='absolute -top-2 -right-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-200' onClick={() => handleRemovePMS(item)} fontSize='small' />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> : null
            }

            <div className='flex mr-4 mt-4'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Others / Remarks</p>
                </div>
                <div className='w-full ml-20'>
                    <textarea className='w-full border border-blue-300 h-16 p-1 rounded-sm' value={medicalHistory.Other} onChange={(e) => setMedicalHistory({ ...medicalHistory, Other: e.target.value })} placeholder='Write Remarks' />
                    {/* <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Contact Number' /> */}
                </div>
            </div>

            {/* On medications / Supplements / Energy Drinks, if any :  */}

            <div>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gray-300'>
                            <TableCell align="left">Medicine / Supplement / Energy drink</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Reason for Taking</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='border'>
                        {
                            onMedication.map((item: any, index: number) => {
                                return (
                                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <input type="text" className='border rounded-sm border-gray-400 h-10 px-1 w-full' name='medicationName' value={item.medicationName} onChange={(e) => handleChnageonMedication(e, item.id)} placeholder='Medicine name' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="Date" className='border rounded-sm border-gray-400 h-10 px-1 w-full' name='time' value={item.time} onChange={(e) => handleChnageonMedication(e, item.id)} placeholder='Time ' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <textarea className='border rounded-sm border-gray-400 h-10 px-1 w-full' name="reason" value={item.reason} onChange={(e: any) => handleChnageonMedication(e, item.id)} placeholder='Reason' />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer hover:text-red-600 ' onClick={() => handleDeleteMedication(item.id)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        <button className='px-4 py-2 bg-indigo-500 text-gray-50 rounded-sm ml-3' onClick={addMoreMedication}>Add More</button>
                    </TableBody>
                </Table>
            </div>

            <button className={!disableBtn ? 'bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-3 hover:shadow-md hover:bg-blue-600 cursor-pointer' : 'bg-gray-500 cursor-pointer text-gray-100 px-10 py-3 rounded-sm mt-3 hover:shadow-md hover:bg-gray-600'} disabled={disableBtn} onClick={handleSaveMedicalHistory}>Save Medical History</button>
        </div>
    )
}

export default MedicalHistory