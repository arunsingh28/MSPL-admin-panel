import React from 'react'
import FileUploader from '../../Components/FileUploader'
import { ParentCompProps } from '../Dashboard'
import PortraitIcon from '@mui/icons-material/Portrait';
import Back from '../../Components/Back';
import { useAppSelector } from '../../store/hook'
// name
// phone
// em ail
// experience in years
// acdmies list
// sports list
// picture
// qualification
// status (active / inactive)
// short description

const Coach = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const fileRef = React.useRef<HTMLInputElement>(null)
    const [imagePrev, setImagePrev] = React.useState({
        url: '',
        size: '',
        type: ''
    })


    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const fileURL = URL.createObjectURL(file)
            setImagePrev({
                url: fileURL,
                size: (Math.floor(file.size / 1000) + ' kb').toString(),
                type: file.type
            })
        }
    }

    React.useEffect(() => {
        // call api to get data
    }, [])

    return (
        <div>
            <Back />
            <h1 className='text-2xl text-gray-700 font-semibold pb-2'>Coache</h1>
            <FileUploader type='emp' key="" />
            <div className='flex justify-center'>
                <div className="mt-6 grid grid-cols-3 w-1/3 justify-center items-center text-gray-400">
                    <hr className='border-gray-400' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-gray-400' />
                </div>
            </div>
            <div className=''>
                <h2 className='font-semibold text-gray-600'>Personal Info</h2>
                <div className='flex justify-between gap-5 mt-1'>
                    <div className='w-full'>
                        <label htmlFor="name" className='text-sm text-gray-600'>Name</label>
                        <input type="text" className='border w-full h-12 rounded-sm px-1' placeholder='Coach Name' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="name" className='text-sm text-gray-600'>Phone</label>
                        <input type="number" className='border w-full h-12 rounded-sm px-1' placeholder='Coach Phone' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="name" className='text-sm text-gray-600'>Email</label>
                        <input type="email" className='border w-full h-12 rounded-sm px-1' placeholder='Coach Email' />
                    </div>
                </div>

                {/* work info */}
                <div className='mt-3'>
                    <h2 className='font-semibold text-gray-600'>Work info</h2>
                    <div className='flex justify-between gap-5 mt-1'>
                        <div className='w-full'>
                            <label htmlFor="experience" className='text-sm text-gray-600'>Experience (in Years)*</label>
                            <input type="number" className='border w-full h-12 rounded-sm px-1' placeholder='Coach Experience' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="qualification" className='text-sm text-gray-600'>Qualification</label>
                            <input type="text" className='border w-full h-12 rounded-sm px-1' placeholder='Coach Qualification' />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="name" className='text-sm text-gray-600'>Status</label>
                            <select name="" className='border w-full h-12 rounded-sm px-1' id="">
                                <option value="true">Active</option>
                                <option value="true">Deactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <h2 className='font-semibold text-gray-600'>Sports Info</h2>
                    <div className='flex justify-between gap-5 mt-1'>
                        <div className='w-full'>
                            <label htmlFor="experience" className='text-sm text-gray-600'>Sports List*</label>
                            <select className='border w-full h-12 rounded-sm px-1'>
                                <option value="Cricket">Cricket</option>
                                <option value="Football">Football</option>
                                <option value="Badminton">Badminton</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Cricket">Cricket</option>
                                <option value="Cricket">Cricket</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="qualification" className='text-sm text-gray-600'>Acdmies</label>
                            <p>Here dropdown of acdmies</p>
                        </div>
                        <div className='w-full '>
                            {/* <label htmlFor="name" className='text-sm text-gray-600'>Status</label>
                            <select name="" className='border w-full h-12 rounded-sm px-1' id="">
                                <option value="true">Active</option>
                                <option value="true">Deactive</option>
                            </select> */}
                        </div>
                    </div>
                </div>
                {/* profile image */}
                <div className='mt-3 flex gap-5 items-end'>
                    <div>
                        <label htmlFor="name" className='text-sm text-gray-600'>Profile Image</label>
                        <div className='flex justify-between gap-5 mt-1'>
                            <div className='w-full'>
                                <input type="file" ref={fileRef} onChange={handleFile} className='hidden' placeholder='Coach Name' />
                                <button className='bg-indigo-600 text-gray-100 px-7 py-3 rounded-md' onClick={() => {
                                    fileRef.current?.click()
                                }}><PortraitIcon />Upload</button>
                            </div>
                        </div>
                    </div>
                    {
                        imagePrev &&
                        <div className='flex gap-4'>
                            <img src={imagePrev.url} alt="" className='w-36 h-36 object-cover rounded-sm' />
                            <div>
                                <p className='text-xs text-gray-600'>Size: {imagePrev.size}</p>
                                <p className='text-xs text-gray-600'>Type: {imagePrev.type}</p>
                            </div>
                        </div>
                    }
                </div>
                {/* short desc */}
                <div className='mt-3'>
                    <h2 className='font-semibold text-gray-600'>Short Description</h2>
                    <div className='flex justify-between gap-5 mt-1'>
                        <div className='w-full'>
                            <label htmlFor="experience" className='text-sm text-gray-600'>Short Description*</label>
                            <textarea cols={4} rows={1} placeholder="Short desc...." className='border w-full h-32 rounded-sm px-1'></textarea>
                        </div>
                    </div>
                </div>
                {/* submit button */}
                <button className='py-3 px-10 rounded-md bg-blue-600 text-gray-100 font-semibold mt-3'>Create</button>
            </div>
        </div>
    )
}

export default Coach