import React from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { createModulee } from '../../../store/slices/TutuorialSlice'
import { toast } from 'react-toastify'
import { initModule, getTut } from '../../../http/api'
import CircularProgress from '@mui/material/CircularProgress';

const Tab1 = () => {

    const dispatch = useDispatch()
    const { name, description } = useSelector((state: any) => state.tutorial)

    const [pageLoading, setPageLoading] = React.useState(false)

    const inputEl = React.useRef<HTMLInputElement>(null)

    const [disabled, setDisabled] = React.useState<any>(false)

    React.useEffect(() => {
        inputEl.current?.focus()
        if (inputEl.current?.value) return setDisabled(false)
    }, [inputEl.current?.value])

    React.useEffect(() => {
        setPageLoading(false)
        getTut().then(res => {
            if (res.data.info.initTutorial === false) {
                setDisabled(true)
                setPageLoading(true)
                dispatch(createModulee({
                    name: res.data.tutorial.TutorialTitle,
                    description: res.data.tutorial.TutorialDescription,
                    modules: res.data.tutorial.moduleNumber
                }))
            }
        }).catch(err => {
            setPageLoading(true)
            console.log(err)
        })
    }, [])

    const handleNext = async () => {
        if (!inputEl.current?.value) return toast.error('Please enter the number of modules')
        // api call
        initModule({
            name,
            modules: parseInt(inputEl.current?.value as string),
        }).then(res => {
            toast.success(res.data.message)
            // dispatch action
            dispatch(createModulee({
                name: name,
                description: description,
                modules: parseInt(inputEl.current?.value as string)
            }))
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <>
            {
                pageLoading ?
                    <>
                        <div className='px-2'>
                            <div className='py-5'>
                                <label htmlFor="module">How many modules are there ?</label><br />
                                <input type="text" id='module' ref={inputEl} placeholder="0" className='border w-[42px] h-10 rounded-md text-xl mt-3 px-1' />
                                <div className='mt-5'>
                                    <span className='font-bold italic'>NOTE*</span>
                                    <p className='text-sm'>You can not change the Modules after declaring the Number of modules so please do it carefully.</p>
                                    <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} disabled={disabled} size='large' onClick={handleNext}>Next</Button>
                                </div>
                            </div>
                        </div>
                    </> : <CircularProgress size={20} color="primary" />
            }
        </>
    )
}

export default Tab1
