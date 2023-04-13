import React from 'react'
import Back from '../../Components/Back'
import { ParentCompProps } from '../Dashboard'
import { createMobileBanner, fetchAllBanner, deleteBanner } from '../../http/api'
import { useAppSelector } from '../../store/hook'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';

interface BannerProps {
    bannerImage: {
        location: string
        key: string
    },
    bannerkey: string
    _id: string
}

const Banner = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const { token } = useAppSelector(state => state.auth)

    const [allBanner, setAllBanner] = React.useState<BannerProps[]>()

    const [bannerLoading, setBannerLoading] = React.useState<boolean>(false)



    const fileRef = React.useRef<HTMLInputElement>(null)

    const [filePreview, setFilePreview] = React.useState<string>('')

    const [bannerKey, setBannerKey] = React.useState<string>('')

    const [diabled, setDisabled] = React.useState<boolean>(true)

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        setBannerLoading(true)
        fetchAllBanner(token).then(res => {
            setBannerLoading(false)
            return setAllBanner(res.data.data)
        })
    }, [token, filePreview])


    const handleClick = () => {
        fileRef.current?.click()
    }

    React.useEffect(() => {
        if (bannerKey === '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [bannerKey, filePreview])

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilePreview(URL.createObjectURL(e.target.files![0]))
    }

    const handlePublish = () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', fileRef.current!.files![0])
        createMobileBanner(formData, bannerKey.toUpperCase(), token).then(res => {
            console.log(res.data)
            if (res.data.success) {
                setIsLoading(false)
                toast.success(res.data.message)
                setDisabled(true)
                setBannerKey('')
                setFilePreview('')
            } else {
                setIsLoading(false)
                toast.error(res.data.message)
            }
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
            if (err.response.message === `Cannot read properties of undefined (reading 'path')`) {
                toast.error('Please select a file')
            }
            toast.error(err.response.message)
        }).finally(() => {
            setIsLoading(false)
            setDisabled(true)
        })
    }


    const deleteBannerHandler = (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this banner?')
        if (!confirm) return
        deleteBanner(id, token).then(res => {
            toast.success(res.data.message)
            setAllBanner(allBanner?.filter(item => item._id !== id))
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div>
            <Back />
            <h1 className='text-2xl text-gray-700 font-semibold pb-2'>Mobile Banner</h1>
            <div className='flex gap-3'>
                <input type="text" value={bannerKey} onChange={(e) => setBannerKey(e.target.value)} className='border w-full rounded-sm h-12 px-1 flex-1' placeholder='Enter Banner key' />
                <input type="file" className='hidden' onChange={handleFile} ref={fileRef} />
                <button className={!diabled ? 'text-gray-50 bg-indigo-500 px-6 py-2 rounded-md border border-indigo-500 flex items-center gap-2 hover:bg-indigo-600' : 'text-gray-50 bg-gray-500 px-6 py-2 rounded-md border border-gray-500 flex items-center gap-2 hover:bg-gray-600 cursor-not-allowed'} onClick={handleClick} disabled={diabled}>
                    <UploadIcon />
                    Upload Banner</button>
            </div>
            {/* preview */}
            {
                filePreview &&
                <div className='mt-4'>
                    <p className='text-sm text-gray-600'>Banner preview</p>
                    <img src={filePreview} alt="banner" className='w-40 h-40 object-cover rounded-sm' />
                </div>
            }
            <button className={!diabled ? 'text-gray-50 px-8 py-2 bg-blue-500 gap-2 hover:bg-blue-600 border border-blue-600 rounded-md mt-5 flex items-center' : 'text-gray-50 px-8 py-2 bg-gray-500 gap-2 flex items-center hover:bg-gray-600 border cursor-not-allowed border-gray-600 rounded-md mt-5'} onClick={handlePublish}>
                <SaveIcon />
                {
                    isLoading ? <CircularProgress color='inherit' size={20} /> : 'Save'
                }
            </button>
            <div className='py-5'>
                <h1 className='text-xl text-gray-700 font-semibold'>All Banner</h1>
                <div className='flex flex-wrap gap-3'>
                    {
                        bannerLoading ?
                            <div className='mx-auto mt-5'>
                                <div className='flex items-center justify-center gap-2'>
                                    <CircularProgress color='inherit' size={20} />
                                    <p className='text-gray-600'>Banner are loading...</p>
                                </div>
                            </div> : allBanner && allBanner.map((item: BannerProps) => {
                                return (
                                    <div key={item._id} className='mt-3 border w-[200px] rounded-sm text-gray-100'>
                                        <img src={item.bannerImage.location} alt={item._id} />
                                        <h2 className='text-gray-500 ml-1 mt-2'>Key
                                            <span className='text-gray-600 px-2 rounded-sm ml-2 bg-gray-300 break-words'>{item.bannerkey}</span>
                                        </h2>
                                        <div className='flex gap-2 mb-2 mt-2 mx-1'>
                                            <button className='px-3 py-1 border w-full rounded-sm border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-50' onClick={() => deleteBannerHandler(item._id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default Banner