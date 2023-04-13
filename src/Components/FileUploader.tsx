import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import empFile from '../Assets/xlsx/account-format.xlsx'
import schollFile from '../Assets/xlsx/school-format.xlsx'
import ingridienentFile from '../Assets/xlsx/ingridienents-format.xlsx'
import { Link } from 'react-router-dom'
import { empWithFile, schoolWithFile, ingridientWithFile } from '../http/api'
import { toast } from 'react-toastify'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useAppSelector } from '../store/hook'

interface FileUploaderProps {
    type: string
}

const FileUploader = ({ type }: FileUploaderProps) => {

    const { token } = useAppSelector(state => state.auth)

    const [file, setFile] = React.useState<any>(null)
    const fileEl = React.useRef<HTMLInputElement>(null)

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (type === 'emp') {
            setFile(empFile)
        }
        if (type === 'ingridienents') {
            setFile(ingridienentFile)
        }
        else {
            setFile(schollFile)
        }
    }, [type, file, fileEl])

    const handleUpload = () => {
        fileEl.current?.click()
    }

    const handleFile = () => {
        setLoading(true)
        const file = fileEl.current?.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            // for emp bulk upload function
            if (type === 'emp') {
                // for academy bulk upload function
                empWithFile(formData, token).then((res: any) => {
                    if (res.data.success) {
                        console.log(res.data)
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                }).catch((err: any) => {
                    console.log('ERROR', err.response)
                    toast.error(err.response.message)
                    setLoading(false)
                }).finally(() => setLoading(false))
            }
            if (type === 'ingridienents') {
                // for academy bulk upload function
                ingridientWithFile(formData, token).then((res: any) => {
                    console.log('ingri', res)
                    if (res.data.success) {
                        console.log(res.data)
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                }).catch((err: any) => {
                    console.log('ERROR ing', err.response)
                    toast.error(err.response.message)
                    setLoading(false)
                }).finally(() => setLoading(false))
            }
            else {
                // for school bulk upload function
                schoolWithFile(formData, token).then((res: any) => {
                    if (res.data.success) {
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                }).catch((err: any) => {
                    console.log('ERROR1', err)
                    toast.error(err.response.data)
                    setLoading(false)
                }).finally(() => setLoading(false))
            }
        } else {
            toast.error('No File Selected')
            setLoading(false)
        }
    }

    return (
        <div className='border my-2 py-3 px-4 bg-[#f0f8ff] rounded-sm'>
            <div className='flex justify-center gap-5'>
                {
                    loading ?
                        <>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress color='primary' />
                            </Box>
                        </> :
                        <>
                            <p className='text-gray-600 text-[18px] text-center py-2'>Upload only .xlsx File Format </p>
                            <button className='flex items-center gap-2 bg-[#1b356b] px-5 py-2 rounded-md text-white hover:bg-[#11244e] hover:shadow-md uppercase' disabled={loading} onClick={handleUpload}>
                                <input type="file" ref={fileEl} onChange={handleFile} className='hidden' />
                                <FileUploadIcon /> Upload
                            </button>
                            <Link to={file} download target="_blank">
                                <button className='flex items-center gap-2 bg-[#1b356b] px-5 py-2 rounded-md text-white hover:bg-[#11244e] hover:shadow-md uppercase'>
                                    <FileDownloadIcon /> Download
                                </button>
                            </Link>
                            <p className='text-gray-600 text-[18px] text-center py-2'>Download the File Format</p>
                        </>
                }

            </div>
        </div>
    )
}

export default FileUploader