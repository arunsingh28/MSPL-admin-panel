import React from 'react'
import { saveIntroduction, saveSummary, getAssessmentForm } from '../../http/api'
import { useAppSelector } from '../../store/hook';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';


import FoodLifeStyle from './AssessmentComponents/FoodLifeStyle';
import MedicalHistory from './AssessmentComponents/MedicalHistory';
import FoodRecall from './AssessmentComponents/FoodRecall';
import Measurement from './AssessmentComponents/Measurement';

interface IntrodutionProps {
    Name: string
    Age: number
    PreferredLanguage: string
    Email: string
    Phone: string
    Client: string
    Package: string
    SportsProfile: {
        SportName: string
        Position: string
    }
}

interface MeasurementProps {
    Height: string
    Weight: string
    BMI: string
    Client: string
}

interface medicalHistroyProps {
    FamilyHistory: string
    WeightHistory: string
    Diabetes: string
    HeartHealth: string
    Thyroid: string
    GutHealth: string
    BowelMovement: string
    Other: string
    OnMedications: [{
        medicationName: string,
        time: string,
        reason: string
    }],
    Client: string
}

const Athlete = () => {

    const { token, user } = useAppSelector(state => state.auth)

    const client = user?._id

    console.log({ client })



    const [introduction, setIntrodution] = React.useState<IntrodutionProps>({
        Name: '',
        Age: 0,
        PreferredLanguage: '',
        Email: '',
        Phone: '',
        Client: client,
        Package: '',
        SportsProfile: {
            SportName: '',
            Position: ''
        }
    })

    const [measurement, setMeasurement] = React.useState<MeasurementProps>({
        Height: '',
        Weight: '',
        BMI: '',
        Client: client
    })

    const [medicalHistory, setMedicalHistory] = React.useState<medicalHistroyProps>({
        FamilyHistory: '',
        WeightHistory: '',
        Diabetes: '',
        HeartHealth: '',
        Thyroid: '',
        GutHealth: '',
        BowelMovement: '',
        Other: '',
        OnMedications: [{
            medicationName: '',
            time: '',
            reason: ''
        }],
        Client: client
    })

    React.useEffect(() => {
        getAssessmentForm(client, token).then((res: any) => {
            if (res.data.success) {
                setIntrodution(res.data.assessmentForm.INTRODUCTION)
                setMeasurement({
                    ...res.data.assessmentForm.ANTHROPOMETRY,
                    Client: client
                })
            }

        }).catch((err: any) => {
            console.log({ err })
        })
    }, [])



    const handleChangeVlue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setIntrodution({ ...introduction, [name]: value })
    }

    const handleNestedChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setIntrodution({ ...introduction, SportsProfile: { ...introduction.SportsProfile, [name]: value } })
    }

    const [isLoading, setIsLoading] = React.useState({
        INTRODUCTION: false,
        ANTHROPOMETRIC: false,
        LIFESTYLE: false,
        MEDICAL: false,
        RECALL: false
    })

    const [isDisable, setIsDisable] = React.useState({
        INTRODUCTION: false,
        ANTHROPOMETRIC: false,
        LIFESTYLE: false,
        MEDICAL: false,
        RECALL: false
    })

    // save introduction data
    const handleSaveIntroduction = () => {
        setIsLoading({ ...isLoading, INTRODUCTION: true })
        saveIntroduction(introduction, token).then((res: any) => {
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading({ ...isLoading, INTRODUCTION: false })
                setIsDisable({ ...isDisable, INTRODUCTION: true })
            } else {
                toast.error(res.data.message)
                setIsLoading({ ...isLoading, INTRODUCTION: false })
            }
        }).catch((err: any) => {
            console.log({ err })
            toast.error(err.response.data.message)
            setIsLoading({ ...isLoading, INTRODUCTION: false })
        })
    }

    // run whehn introduction state change
    React.useEffect(() => {
        // null check on introduction
        if (introduction.Age && introduction.Name && introduction.Package && introduction.Email && introduction.Phone && introduction.PreferredLanguage && introduction.SportsProfile.Position && introduction.SportsProfile.SportName) {
            setIsDisable({ ...isDisable, INTRODUCTION: false })
        } else {
            setIsDisable({ ...isDisable, INTRODUCTION: true })
        }
    }, [introduction.Age, introduction.Name, introduction.Package, introduction.Phone, introduction.Email, introduction.PreferredLanguage, introduction.SportsProfile.Position, introduction.SportsProfile.SportName])


    const [summary, setSummary] = React.useState<string>('')

    const handleSaveSummary = async () => {
        try {
            const { data } = await saveSummary({ Summary: summary, Client: client }, token)
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error: any) {
            console.log({ error })
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <h1 className='text-start text-gray-600 border-b-2 border-green-500 font-semibold text-xl'>Assessment Form</h1>
            <div>
                <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>|. INTRODUCTION</h1>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Name</p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Name" value={introduction?.Name} onChange={handleChangeVlue} placeholder='Enter Client Name' />
                    </div>
                </div>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Age</p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Age" value={introduction?.Age} onChange={handleChangeVlue} placeholder='Enter Client Age' />
                    </div>
                </div>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Email ID</p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Email" value={introduction?.Email} onChange={handleChangeVlue} placeholder='Enter Client Email' />
                    </div>
                </div>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Contact No. </p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Phone" value={introduction?.Phone} onChange={handleChangeVlue} placeholder='Enter Client Contact Number' />
                    </div>
                </div>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Prefered Language </p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="PreferredLanguage" value={introduction?.PreferredLanguage} onChange={handleChangeVlue} placeholder='Enter Client Prefered Language' />
                    </div>
                </div>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Package Chosen </p>
                    </div>
                    <div className='w-1/2 mr-20'>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Package" value={introduction?.Package} onChange={handleChangeVlue} placeholder='Enter Client Package Name' />
                    </div>
                </div>
                <div>
                    <div className='flex mr-4 mt-4'>
                        <div className='w-96'>
                            <p className='text-[17px] text-gray-600'>Sports profile if any*</p>
                        </div>
                        <div className='w-1/2 mr-20 flex gap-2'>
                            <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="SportName" value={introduction?.SportsProfile.SportName} onChange={handleNestedChangeValue} placeholder='Enter Sports Name' />
                            <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name="Position" value={introduction?.SportsProfile.Position} onChange={handleNestedChangeValue} placeholder='Enter Highest Position' />
                        </div>
                    </div>
                </div>
                <button className={!isDisable.INTRODUCTION ? 'bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-2 ml-96 hover:shadow-md hover:bg-blue-600' : 'bg-gray-500 text-gray-100 px-10 py-3 rounded-sm mt-2 ml-96 hover:shadow-md hover:bg-gray-600'} disabled={isDisable.INTRODUCTION} onClick={handleSaveIntroduction}>
                    {
                        isLoading.INTRODUCTION ? <div className='flex justify-center items-center'><CircularProgress color='inherit' /></div> : 'Save Introduction'
                    }
                </button>

                {/* anthro */}
                <Measurement />
                {/* . MEDICAL HISTORY */}
                <MedicalHistory />
                {/* . FOOD & LIFESTYLE HABITS   */}
                <FoodLifeStyle />
                {/* 24HR FOOD RECALL :   */}
                <FoodRecall />
                <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>V|. SUMMARY / BRIEF </h1>
                <div className='flex mr-4 mt-4'>
                    <div className='w-96'>
                        <p className='text-[17px] text-gray-600'>Others / Remarks</p>
                    </div>
                    <div className='w-full ml-20'>
                        <textarea value={summary} className='w-full border border-blue-300 h-16 p-1 rounded-sm' onChange={(e) => {
                            setSummary(e.target.value)
                        }} placeholder='Write Family History...' />
                    </div>
                </div>
                {/* save btn */}
                <button className='bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-3 hover:shadow-md hover:bg-blue-600 cursor-pointer' onClick={handleSaveSummary}>Save Summary</button>
            </div>
        </div >
    )
}

export default Athlete