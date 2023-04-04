import React from 'react'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import defaultProfile from '../../Assets/default-profile.png'
import { updateNutritionProfile, getNutritionProfile, removeNutritionProfile } from '../../http/api'
import { useAppSelector } from '../../store/hook';
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {

    const { user, token } = useAppSelector(state => state.auth)

    const fileRef = React.useRef<HTMLInputElement>(null)
    const [change, setChange] = React.useState<boolean>(false)
    const [bio, setBio] = React.useState<string>('')
    const [exprience, setExprience] = React.useState<number>(0)
    const [file, setFile] = React.useState<any>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [langText, setLangText] = React.useState<string>('')
    const [specialistText, setSpecialistText] = React.useState<string>('')
    const [language, setLanguage] = React.useState<string[]>([])
    const [specialist, setSpecialist] = React.useState<string[]>([])
    const [education, setEducation] = React.useState<string>('')
    const [originalImage, setOriginalImage] = React.useState('')
    const [imagePreview, setImagePreview] = React.useState({
        location: defaultProfile,
        key: null
    })


    React.useEffect(() => {
        setIsLoading(true)
        getNutritionProfile(user._id, token).then(res => {
            if (res.data.success) {
                const { bio, experience, language, specialisation, profileImage, education } = res.data.profile
                setOriginalImage(profileImage.location)
                setBio(bio)
                setExprience(experience)
                setLanguage(language)
                setSpecialist(specialisation)
                setEducation(education)
                if (profileImage.location === null || profileImage.location === undefined || profileImage.location === '') {
                    setImagePreview({
                        location: defaultProfile,
                        key: null
                    })
                } else {
                    setImagePreview({
                        location: profileImage.location,
                        key: profileImage.key
                    })
                }
            }
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            toast.error(err.response.data.message)
        })
    }, [user])


    React.useEffect(() => {
        // check if user has profile
        if (imagePreview.location !== originalImage) {
            setChange(true)
        } else {
            setChange(false)
        }
    }, [fileRef, imagePreview, exprience, file, specialist, originalImage])


    const handleLanguage = () => {
        if (langText !== '') {
            setLanguage([...language, langText])
            setLangText('')
        }
    }

    const handleExpertise = () => {
        if (specialistText !== '') {
            setSpecialist([...specialist, specialistText])
            setSpecialistText('')
        }
    }
    const handleDeleteLange = (index: number) => {
        const lang = [...language]
        lang.splice(index, 1)
        setLanguage(lang)
    }

    const handleDeleteExpertise = (index: number) => {
        const spec = [...specialist]
        spec.splice(index, 1)
        setSpecialist(spec)
    }

    // handle file
    const handleFile = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    }

    // onChnage event on input
    const changeFile = (e: any) => {
        setFile(e.target.files[0])
        setImagePreview({
            location: URL.createObjectURL(e.target.files[0]),
            key: null
        })
    }

    // send all data to server
    const saveProfile = () => {
        setIsLoading(true)
        const data = {
            bio,
            exprience,
            language,
            specialist,
            change,
            education,
            image: imagePreview
        }
        const payload = new FormData()
        payload.append('data', JSON.stringify(data))
        payload.append('file', file)
        updateNutritionProfile(payload, user._id, token).then(res => {
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
                setIsLoading(false)
            }
        }).catch(err => {
            toast.error(err.response.data.message)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    // remove profile
    const removeProfile = () => {
        setFile(null)
        const key = imagePreview.key as any
        removeNutritionProfile(key, user._id, token).then(res => {
            if (res.data.success) {
                toast.success(res.data.message)
                setImagePreview({
                    location: defaultProfile,
                    key: null
                })
            }
        }).catch(err => {
            toast.error(err.response.data.message)
        })
    }





    return (
        <div className='bg-gray-50'>
            <div className='mx-16 py-3'>
                <div className='bg-white py-5 px-5 text-gray-600'>
                    <div className=''>
                        <h1 className='font-semibold text-2xl'>Arun Pratap Singh</h1>
                        {/* image */}
                        {
                            isLoading ? <CircularProgress className='mt-5' size={20} color="inherit" /> :
                                <>
                                    <div className='py-2 flex items-center gap-2'>
                                        <div className=''>
                                            <img src={imagePreview.location} alt={"profile"} className='w-32 h-32 object-cover rounded-md outline-none pointer-events-none' />
                                            <p className='mt-1 ml-1 text-gray-500' style={{ fontSize: 11 }} >upload 400x400 pixel</p>
                                        </div>
                                        <div className='flex flex-col gap-2 -mb-4'>
                                            <input type="file" ref={fileRef} onChange={changeFile} className='hidden' />
                                            <button className='border px-4 py-2 bg-indigo-600 text-gray-50 rounded-md hover:cursor-pointer hover:bg-indigo-700' onClick={handleFile}>Change Photo</button>
                                            <button className='border-gray-400 border rounded-md px-4 py-2 flex items-center justify-center gap-1 cursor-pointer hover:bg-red-50' onClick={removeProfile}>
                                                <DeleteForeverRoundedIcon color='error' />
                                                <span className='text-sm font-medium'>Remove Photo</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* bio */}
                                    <div className='py-2'>
                                        <label htmlFor="bio" className='font-semibold text-sm'>Bio</label>
                                        <textarea id='bio' value={bio} onChange={(e) => setBio(e.target.value)} className='w-full border-b px-1 rounded-sm py-1' placeholder='Descibe yourself'></textarea>
                                    </div>

                                    {/* exp */}
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="exp" className='font-sans text-sm'>Experience (2 year)</label>
                                        <input type="number" id='exp' value={exprience} onChange={(e) => setExprience(parseInt(e.target.value))} className='border h-10 rounded-sm px-2' placeholder='Experience in years' />
                                    </div>
                                    {/* educ */}
                                    <div className='flex flex-col gap-1 py-3'>
                                        <label htmlFor="edu" className='font-sans text-sm'>Highest Education </label>
                                        <input type="text" id='edu' value={education} onChange={(e) => setEducation(e.target.value)} className='border h-10 rounded-sm px-2' placeholder='Example Master of Science' />
                                    </div>
                                    {/* langugae */}
                                    <div className='py-2 flex flex-col gap-1'>
                                        <label htmlFor="lang" className='font-sans text-sm'>language</label>
                                        <input type="text" id='lang' value={langText} onChange={(e) => setLangText(e.target.value)} className='border h-10 rounded-sm px-2' placeholder='what language you speak' />
                                        <div className='flex gap-2 py-2 flex-wrap'>
                                            <div className='border bg-indigo-600 px-2 py-1 rounded-md text-gray-50 flex items-center gap-1' onClick={handleLanguage}>
                                                <span>Add</span>
                                            </div>
                                            {
                                                language.map((item, index) => {
                                                    return (
                                                        <div key={index} className='border bg-orange-300 px-2 py-1 rounded-md text-gray-700 flex items-center flex-wrap gap-1'>
                                                            <span>{item}</span>
                                                            <HighlightOffRoundedIcon onClick={() => handleDeleteLange(index)} fontSize='small' className='ml-1' sx={{ color: '#555555' }} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {/* sperclist */}
                                    <div className='py-2 flex flex-col gap-1'>
                                        <label htmlFor="sp" className='font-sans text-sm'>Specialisation</label>
                                        <input type="text" id='sp' value={specialistText} onChange={(e) => setSpecialistText(e.target.value)} className='border h-10 rounded-sm px-2' placeholder='whats your specialisation ' />
                                        <div className='flex gap-2 py-2 flex-wrap'>
                                            <div className='border bg-indigo-600 px-2 py-1 rounded-md text-gray-50 flex items-center gap-1' onClick={handleExpertise}>
                                                <span>Add</span>
                                            </div>
                                            {
                                                specialist.map((item, index) => {
                                                    return (
                                                        <div key={index} className='border bg-orange-300 px-2 py-1 rounded-md text-gray-700 flex items-center flex-wrap gap-1'>
                                                            <span>{item}</span>
                                                            <HighlightOffRoundedIcon onClick={() => handleDeleteExpertise(index)} fontSize='small' className='ml-1' sx={{ color: '#555555' }} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <button className='px-10 py-2.5 bg-blue-500 text-gray-100 rounded-sm font-semibold hover:bg-blue-600 cursor-pointer' onClick={saveProfile}>
                                        {
                                            isLoading ? <CircularProgress size={20} color='inherit' /> : 'Save'
                                        }
                                    </button>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile