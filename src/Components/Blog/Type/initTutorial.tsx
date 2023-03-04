import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { initTutorial } from '../../../store/slices/TutuorialSlice'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { initTut, getTut } from '../../../http/api'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';


const InitTutorial = () => {

    const dispatch = useDispatch()
    const fileEl = React.useRef<HTMLInputElement>(null)


    const [loading, setLoading] = React.useState(false)
    const [preview, setPreview] = React.useState<any>(null)

    const [pageLoading, setPageLoading] = React.useState(false)

    const nameEl = React.useRef<HTMLInputElement>(null)

    const [btnDis, setBtnDis] = React.useState<any>(true)

    React.useEffect(() => {
        setPageLoading(false)
        getTut().then(res => {
            if (res.data.info.initTutorial === false) {
                setPageLoading(true)
                dispatch(initTutorial({
                    name: res.data.tutorial.TutorialTitle,
                    description: res.data.tutorial.TutorialDescription
                }))
            }
        }).catch(err => {
            setPageLoading(true)
            console.log(err)
        })
    }, [])

    const [data, setData] = React.useState({
        name: '',
        description: ''
    })

    React.useEffect(() => {
        nameEl.current?.focus()
    }, [])

    React.useEffect(() => {
        if (data.name && data.description && preview) {
            setBtnDis(false)
        }
    }, [data, preview])

    const handleUpload = () => {
        fileEl.current?.click()
    }

    const handleNext = () => {
        setLoading(true)
        // api call
        initTut({
            name: data.name,
            description: data.description,
        }).then(res => {
            setLoading(false)
            dispatch(initTutorial({
                name: data.name,
                description: data.description,
            }))
            toast.success(res.data.message)
        }).catch(err => {
            setLoading(false)
            toast.error(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleFile = () => {
        const file = fileEl.current?.files?.[0]
        if (file) {
            // get the image url
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setPreview(reader.result)
            }
        }
    }

    return (
        <>
            {
                pageLoading ?
                    <>
                        <div className='my-5 px-2'>
                            <div className='flex flex-col justify-start gap-2'>
                                <label className='text-gray-700' htmlFor='tut'>Name of the Tutorial</label>
                                <input type="text" ref={nameEl} id="tut" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder='Enter Name of Tutorial' className='border h-14 w-1/2 rounded-md px-2' />
                            </div>
                            <div className='flex flex-col justify-start mt-5 gap-2'>
                                <label className='text-gray-700' htmlFor='desc'>Describe the Tutorial</label>
                                <input type="text" value={data.description} id="desc" onChange={(e) => setData({ ...data, description: e.target.value })} placeholder='Enter Name of Tutorial' className='border h-14 w-full rounded-md px-2' />
                            </div>
                            {/* thumbnail */}
                            <div className='mt-4 flex relative justify-between'>
                                <div>
                                    <label htmlFor="thumb">Thumbnail</label>
                                    <button className='flex items-center gap-2 bg-blue-600 py-3 px-7 mt-4 rounded-sm text-white hover:bg-blue-900 hover:shadow-md uppercase' onClick={handleUpload}>
                                        <input type="file" id='thumb' ref={fileEl} onChange={handleFile} className='hidden' />
                                        <FileUploadIcon /> Upload
                                    </button>
                                </div>
                                {
                                    preview ?
                                        <div className='p-2 mr-56 w-[300px] h-[200px]'>
                                            <p className=''>Thumbnail Preview</p>
                                            {
                                                preview && <img src={preview} alt="thumbnail" className='mt-4 object-contain' />
                                            }
                                        </div>
                                        : null
                                }
                            </div>
                            <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 3 }} size='large' disabled={btnDis} onClick={handleNext}>
                                {
                                    loading ? <CircularProgress size={20} color="inherit" /> : 'Next'
                                }
                            </Button>
                        </div>
                    </> : <CircularProgress size={20} color="inherit" />
            }

        </>
    )
}

export default InitTutorial