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
    type: 'emp' | 'school' | 'ingridienents' | 'academy'
}

const FileUploader = ({ type }: FileUploaderProps) => {

    const { token } = useAppSelector(state => state.auth)

    const [file, setFile] = React.useState<string>('')

    const fileEl = React.useRef<HTMLInputElement>(null)

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (type === 'emp') {
            setFile(empFile)
        }
        if (type === 'ingridienents') {
            setFile(ingridienentFile)
        }
        if (type === 'school') {
            setFile(schollFile)
        }
        if (type === 'academy') {
            setFile(empFile)
        }
    }, [type])

    const handleUpload = async () => {
        fileEl.current?.click()
    }

    const handleFile = async () => {
        setLoading(true)
        const file = fileEl.current?.files?.[0]
        // create blob of file


        if (file) {
            const data = new FormData()
            data.append('file', file)
            console.log('file data', data)

            if (type === 'emp') {
                try {
                    const res = await empWithFile(data, token)
                    if (res.data.success) {
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                } catch (err: any) {
                    console.log('ERROR1', err.response)
                    toast.error(err.response.data.message)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
            if (type === 'ingridienents') {
                try {
                    const res = await ingridientWithFile(data, token)
                    if (res.data.success) {
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                } catch (err: any) {
                    console.log('ERROR2', err.response)
                    toast.error(err.response.data.message)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
            if (type === 'school') {
                try {
                    const res = await schoolWithFile(data, token)
                    if (res.data.success) {
                        toast.success(res.data.message)
                        setLoading(false)
                    }
                } catch (err: any) {
                    console.log('ERROR3', err.response)
                    toast.error(err.response.data.message)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            }
            if (type === 'academy') {
                // for academy bulk upload function
                console.log('academy')
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
                            <p className='text-gray-600 text-[18px] text-center py-2'>Upload only .xlsx File Format</p>
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