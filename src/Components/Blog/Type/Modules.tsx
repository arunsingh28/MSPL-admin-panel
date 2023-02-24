import React from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createModulee } from '../../../store/slices/TutuorialSlice'


const Tab1 = () => {

    const dispatch = useDispatch()
    const { name, description } = useSelector((state: any) => state.tutorial)

    const inputEl = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        inputEl.current?.focus()
    }, [])

    const handleNext = () => {
        dispatch(createModulee({
            name: name,
            description: description,
            modules: parseInt(inputEl.current?.value as string)
        }))
    }

    return (
        <div className='px-2'>
            <div className='py-5'>
                <label htmlFor="module">How many modules are there ?</label><br />
                <input type="text" id='module' ref={inputEl} placeholder="0" className='border w-[42px] h-10 rounded-md text-xl mt-3 px-1' />
                <div className='mt-5'>
                    <span className='font-bold italic'>NOTE*</span>
                    <p className='text-sm'>You can not change the Modules after declaring the Number of modules so please do it carefully.</p>
                    <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' onClick={handleNext}>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default Tab1
