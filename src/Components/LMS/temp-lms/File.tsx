import React from 'react'
import { fetchModules, updateModuleContent } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

const File = () => {
    const { token } = useAppSelector(state => state.auth)

    const fileRef = React.useRef<HTMLInputElement | any>(null)

    const { id } = useParams<{ id: any }>()

    const [file, setFile] = React.useState<any>(null)
    const [fileLink, setFileLink] = React.useState<any>(null)

    const [state, setState] = React.useState<boolean>(false)

    // render file in the browser

    const handleFile = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    const handleChangeFile = () => {
        if (fileRef.current) {
            // check file type
            const fileType = fileRef.current.files[0].type
            if (fileType !== 'application/pdf') {
                toast.error('Only pdf file is allowed')
                return
            }
            setFile(fileRef.current.files)
            const url = URL.createObjectURL(fileRef.current.files[0])
            setState(true)
            setFileLink(url)
        }
    }

    return (
        <div>
            <h4 className='py-3 px-3 font-semibold text-gray-700 uppercase'>File</h4>
            <hr />
            {
                file && (
                    <div className='px-3 py-3'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                                <PictureAsPdfOutlinedIcon className='text-gray-600'/>
                            </div>
                            <div className='ml-3'>
                                <p className='text-gray-700 font-semibold'>{file[0].name}</p>
                                <p className='text-gray-500 text-sm'>{(file[0].size / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>
                        <div className='border shadow-sm my-2'>
                            <iframe src={fileLink} title='ppt' className='w-full object-contain h-[500px]' />
                        </div>
                    </div>
                )
            }
            <div className='px-3 py-3 flex gap-3'>
                <input type="file" ref={fileRef} className='hidden' onChange={handleChangeFile} />
                <button className='px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-sm text-gray-50 flex items-center gap-1' onClick={handleFile}>
                   {
                    state && <RestartAltOutlinedIcon />
                   }
                    LOAD PDF</button>
                {
                    state && <button className='px-7 py-2 bg-indigo-600 rounded-sm text-gray-50 hover:bg-indigo-700 flex items-center gap-2'>
                        <DriveFolderUploadOutlinedIcon />
                        UPLOAD FILE</button>
                }
            </div>
        </div>
    )
}

export default File