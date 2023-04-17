import React from 'react'
import { ParentCompProps } from '../Dashboard'
import FileUploader from '../../Components/FileUploader'
import { TextField, Button } from '@mui/material'
import { academyCreate } from '../../http/api'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../store/hook'

interface AcademyData {
    academyName: string,
    academyEmail: string,
    // sports
    cricket: boolean,
    football: boolean,
    badminton: boolean,
    basketball: boolean,
    tennis: boolean,
    otherSport: string,
    // contact
    address: string,
    city: string,
    contactNumber: string,
    contactName: string,
    contactEmail: string,
    // links
    website: string,
    googleLink: string,
    playoLink: string
}

const Academy = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const [data, setData] = React.useState<AcademyData>({
        academyName: '',
        academyEmail: '',
        cricket: false,
        football: false,
        badminton: false,
        basketball: false,
        tennis: false,
        otherSport: '',
        address: '',
        city: '',
        contactNumber: '',
        contactName: '',
        contactEmail: '',
        website: '',
        googleLink: '',
        playoLink: ''
    })
    const [disable, setDisable] = React.useState(true)

    React.useEffect(() => {
        if (data.academyName && data.academyEmail && data.contactName && data.contactNumber && data.contactEmail && (data.cricket || data.football || data.badminton || data.basketball || data.tennis || data.otherSport)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [data])

    const [loading, setLoading] = React.useState(false)

    const handleCreate = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        academyCreate(data, token).then(res => {
            if (res.data.success) {
                setLoading(false)
                toast.success(res.data.message)
                setData({
                    academyName: '',
                    academyEmail: '',
                    // sports
                    cricket: false,
                    football: false,
                    badminton: false,
                    basketball: false,
                    tennis: false,
                    otherSport: '',
                    // contact
                    address: '',
                    city: '',
                    contactNumber: '',
                    contactName: '',
                    contactEmail: '',
                    // links
                    website: '',
                    googleLink: '',
                    playoLink: ''
                })
            }
        }).catch(err => {
            setLoading(false)
            toast.error(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Acadmey Register</p>
            <FileUploader type={"academy"} />
            <div className='flex justify-center'>
                <div className="mt-6 grid grid-cols-3 w-1/3 justify-center items-center text-gray-400">
                    <hr className='border-gray-400' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-gray-400' />
                </div>
            </div>
            <h1 className='text-gray-600 text-[15px] mt-10 font-semibold'>Acadmey Info</h1>
            <div className='mt-4 flex gap-4'>
                <TextField type="text"
                    label="Academy Full Name*" variant="outlined"
                    value={data.academyName}
                    onChange={(e) => setData({ ...data, academyName: e.target.value })}
                    placeholder='Enter Academy Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="text"
                    label="Academy Email*" variant="outlined"
                    value={data.academyEmail}
                    onChange={(e) => setData({ ...data, academyEmail: e.target.value })}
                    placeholder='Enter Academy Email ID' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            {/* contact info */}
            <h1 className='text-gray-600 text-[15px] mt-10 font-semibold'>Contact Info</h1>
            <div className='mt-4 flex gap-4'>
                <TextField type="text"
                    label="Contact Person Name" variant="outlined"
                    value={data.contactName}
                    onChange={(e) => setData({ ...data, contactName: e.target.value })}
                    placeholder='Enter Contact Person Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="text"
                    label="Academy Contact Person Phone Number" variant="outlined"
                    value={data.contactNumber}
                    onChange={(e) => setData({ ...data, contactNumber: e.target.value })}
                    placeholder='Enter Academy Contact Phone Number' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="email"
                    label="Academy Contact Person Email" variant="outlined"
                    value={data.contactEmail}
                    onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
                    placeholder='Enter Academy Email ID' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            {/* sports */}
            <h1 className='text-gray-600 text-[15px] mt-10 font-semibold'>Sports</h1>
            <div className='mt-5 flex gap-4 items-center'>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" name="cricket" id="cricket" defaultChecked={data.cricket} className='w-5 h-5'
                        onChange={(e) => setData({ ...data, cricket: e.target.checked })}
                    />
                    <label htmlFor="cricket" className='text-gray-600'>Cricket</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" name="football" id="football" className='w-5 h-5'
                        defaultChecked={data.football}
                        onChange={(e) => setData({ ...data, football: e.target.checked })}
                    />
                    <label htmlFor="football" className='text-gray-600'>Football</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" name="badminton" id="badminton" className='w-5 h-5'
                        defaultChecked={data.badminton}
                        onChange={(e) => setData({ ...data, badminton: e.target.checked })}
                    />
                    <label htmlFor="badminton" className='text-gray-600'>Badminton</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" name="basketball" id="basketball" className='w-5 h-5'
                        defaultChecked={data.basketball}
                        onChange={(e) => setData({ ...data, basketball: e.target.checked })}
                    />
                    <label htmlFor="basketball" className='text-gray-600'>Basketball</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" name="tennis" id="tennis" className='w-5 h-5'
                        defaultChecked={data.tennis}
                        onChange={(e) => setData({ ...data, tennis: e.target.checked })}
                    />
                    <label htmlFor="tennis" className='text-gray-600'>Tennis</label>
                </div>
                <div className='flex gap-2 items-center w-full'>
                    <TextField type="text" label="Other Sports" className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1'
                        value={data.otherSport}
                        onChange={(e) => setData({ ...data, otherSport: e.target.value })}
                    />
                </div>
            </div>
            {/* address info */}
            <h1 className='text-gray-600 text-[15px] mt-10 font-semibold'>Address Info</h1>
            <div className='mt-4 flex gap-4'>
                <TextField type="text"
                    label="Academy Address" variant="outlined"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder='Enter Academy Address' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="text"
                    label="City" variant="outlined"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder='Enter Academy City' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            {/* contact info */}
            <h1 className='text-gray-600 text-[15px] mt-10 font-semibold'>Links Info</h1>
            <div className='mt-4 flex gap-4'>
                <TextField type="text"
                    label="Website Link" variant="outlined"
                    value={data.website}
                    onChange={(e) => setData({ ...data, website: e.target.value })}
                    placeholder='Enter Website Link' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="text"
                    label="Academy Playo Link" variant="outlined"
                    value={data.playoLink}
                    onChange={(e) => setData({ ...data, playoLink: e.target.value })}
                    placeholder='Enter PlayO Link' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="email"
                    label="Google Link" variant="outlined"
                    value={data.googleLink}
                    onChange={(e) => setData({ ...data, googleLink: e.target.value })}
                    placeholder='Enter Google Link' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            <Button variant="contained" sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b', marginTop: 6 }} disabled={disable} size='large' onClick={handleCreate}>
                {
                    loading ? <CircularProgress size={20} /> : 'Create'
                }
            </Button>
        </div>
    )
}

export default Academy