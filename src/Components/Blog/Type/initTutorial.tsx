import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { initTutorial } from '../../../store/slices/TutuorialSlice'

const InitTutorial = () => {

    const dispatch = useDispatch()

    const nameEl = React.useRef<HTMLInputElement>(null)
    const [btnDis,setBtnDis] = React.useState<any>(true)

    const [data, setData] = React.useState({
        name: '',
        description: ''
    })

    React.useEffect(()=>{
        nameEl.current?.focus()
    },[])

    React.useEffect(() => {
        if(data.name && data.description){
            setBtnDis(false)
        }
    }, [data])

    const handleNext = ()=>{
        dispatch(initTutorial({
            name: data.name,
            description: data.description,
        }))
    }

    return (
        <div className='my-5 px-2'>
            <div className='flex flex-col justify-start gap-2'>
                <label className='text-gray-700'>Name of the Tutorial</label>
                <input type="text" ref={nameEl} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder='Enter Name of Tutorial' className='border h-14 w-1/2 rounded-md px-2' />
            </div>
            <div className='flex flex-col justify-start mt-5 gap-2'>
                <label className='text-gray-700'>Describe the Tutorial</label>
                <input type="text" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} placeholder='Enter Name of Tutorial' className='border h-14 w-full rounded-md px-2' />
            </div>

            <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' disabled={btnDis} onClick={handleNext}>Next</Button>
        </div>
    )
}

export default InitTutorial