import React from 'react'
import { useAppSelector } from '../../../store/hook';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import { saveMeasurement, getAssessmentForm } from '../../../http/api'

interface MeasurementProps {
    Height: string
    Weight: string
    BMI: string
    Client: string
}


const Measurement = () => {


    const { token, user } = useAppSelector(state => state.auth)

    const client = user?._id



    const [measurement, setMeasurement] = React.useState<MeasurementProps>({
        Height: '',
        Weight: '',
        BMI: '',
        Client: client
    })

    React.useEffect(() => {
        getAssessmentForm(client, token).then((res: any) => {
            if (res.data.success) {
                setMeasurement({
                    ...res.data.assessmentForm.ANTHROPOMETRY,
                    Client: client
                })
            }

        }).catch((err: any) => {
            console.log({ err })
        })
    }, [])

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [disableBtn, setDisableBtn] = React.useState<boolean>(false)

    const handleChangeMeasurement = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setMeasurement({ ...measurement, [name]: value })
    }

    // save measurement data
    const handleSaveMeasurement = () => {
        setIsLoading(true)
        saveMeasurement(measurement, token).then((res: any) => {
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
                setDisableBtn(true)
            } else {
                toast.error(res.data.message)
                setIsLoading(false)
            }
        }).catch((err: any) => {
            console.log({ err })
            toast.error(err.response.data.message)
            setIsLoading(false)
        })
    }

    React.useEffect(() => {
        if (measurement.Height && measurement.Weight && measurement.BMI) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [measurement.Height, measurement.Weight, measurement.BMI])


    return (
        <div>
            <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>||. ANTHROPOMETRIC MEASUREMENTS</h1>
            <div className='flex mr-4 mt-4'>
                <div className='flex w-full gap-2 justify-between'>
                    <div className='w-full'>
                        <label htmlFor="BMI" className='text-gray-600 text-[12px]'>Height</label>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name='Height' value={measurement.Height} onChange={handleChangeMeasurement} placeholder='Enter Client Height' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="BMI" className='text-gray-600 text-[12px]'>Weight</label>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name='Weight' value={measurement.Weight} onChange={handleChangeMeasurement} placeholder='Enter Client Weight' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="BMI" className='text-gray-600 text-[12px]'>BMI</label>
                        <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' name='BMI' value={measurement.BMI} onChange={handleChangeMeasurement} placeholder='Enter Client BMI' />
                    </div>
                </div>
            </div>
            <button className={!disableBtn ? 'bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-2 hover:shadow-md hover:bg-blue-600' : 'bg-gray-500 text-gray-100 px-10 py-3 rounded-sm mt-2 hover:shadow-md hover:bg-gray-600'} disabled={disableBtn} onClick={handleSaveMeasurement}>
                {
                    isLoading ? <CircularProgress /> : 'Save Measurement'
                }
            </button>
        </div>
    )
}

export default Measurement