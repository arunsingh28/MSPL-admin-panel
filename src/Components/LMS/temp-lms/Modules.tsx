import React from 'react'
import { ParentCompProps } from '../../../Pages/Dashboard'
import { updateModuleName, fetchCourseById } from '../../../http/api'
import { useAppSelector } from '../../../store/hook'
import { useParams } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';


const Modules = ({ title, content }: ParentCompProps) => {


    const { id } = useParams<{ id: any }>()
    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [savedName, setSavedName] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        fetchCourseById(id, token).then((res: any) => {
            setIsLoading(false)
            setSavedName(res.data.data.moduleNames)
        })
    }, [id, token])



    // const [disable, setDisable] = React.useState<boolean>(true)

    const handleNextModule = () => {
        setSavedName((prev: any) => [...prev, { id: prev.length + 1, moduleName: '' }])
        console.log(savedName)
    }

    const handleDeleteModuleName = (index: number) => {
        if (savedName.length === 1) return toast.info('You can not delete the last module', {
            style: {
                zIndex: 99999,
                alignTracks: 'center',
            }
        })
        setSavedName((prev: any) => prev.filter((item: any, i: number) => i !== index))
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target
        setSavedName((prev: any) => {
            const newArr = [...prev]
            newArr[index].moduleName = value
            return newArr
        })
    }

    const handleSave = () => {
        updateModuleName(id, { name: savedName }, token).then((res: any) => {
            console.log(res.data)
            toast.success('Modules Name Updated Successfully', {
                style: {
                    zIndex: 99999,
                    alignTracks: 'center',
                }
            })
        })
    }

    return (
        <div className='overflow-scroll'>
            <div className='text-gray-700 border-b py-1'>
                <h1 className='px-2 text-gray-600 font-semibold'>Modules</h1>
                <p className='text-[11px] px-2 text-red-600'>Don't change the activites without saving the changes. It will create issue while creating the course.</p>
            </div>
            <div className='px-4 py-2 w-full h-[500px] overflow-scroll'>
                {
                    isLoading ?
                        <div className='mt-3'>
                            <CircularProgress size={20} />
                        </div>
                        : savedName?.map((item: any, index: number) => {
                            return (
                                <div key={index} className='flex flex-col text-gray-600 mb-2'>
                                    <label htmlFor="moduleNmae" className='text-sm'>{item.id}. Name of Module</label>
                                    <div className='flex items-center w-full gap-2'>
                                        <input type="text" value={item.moduleName} className='border h-10 rounded-sm px-2 w-full' onChange={(e) => handleChangeInput(e, index)} placeholder='Enter Modules Name' />
                                        <DeleteOutlineIcon onClick={() => handleDeleteModuleName(index)} className='text-sm cursor-pointer hover:text-red-500' fontSize='small' />
                                    </div>
                                </div>)
                        })
                }
                <button className={'px-4 py-1 bg-blue-500 border border-blue-500 text-gray-100 rounded-sm mt-3 hover:bg-blue-600'} onClick={handleNextModule}>Add Modules</button>
                <button className='px-4 py-1 rounded-sm border-blue-500 border ml-3 text-blue-600 hover:bg-blue-500 hover:text-gray-50' onClick={handleSave} >Save</button>
            </div>
        </div>
    )
}

export default Modules