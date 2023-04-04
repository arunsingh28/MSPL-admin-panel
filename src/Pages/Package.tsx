import React from 'react'
import { ParentCompProps } from './Dashboard'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Add, Remove } from '@mui/icons-material';
import { createPackage } from '../http/api'
import { toast } from 'react-toastify'
import { useAppSelector } from '../store/hook'

const Package = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [isLoading, setIsLoading] = React.useState(false)

    const [childView, setChildView] = React.useState(false)

    const checkRef = React.useRef<HTMLInputElement>(null)

    const [childPackageDetails, setChildPackageDetails] = React.useState([{
        id: 1,
        price: 0,
        duration: 0
    }])

    // points interface
    const pointsArray = [{
        id: 1,
        point: ''
    }]

    // initial state
    const [points, setPoints] = React.useState(pointsArray)
    // package data
    const [packageData, setPackageData] = React.useState<any>({
        name: '',
        price: 0,
        durationUnit: '',
        duration: 0,
        description: '',
        points: points,
        child: []
    })


    // add new point input
    const handleAddPoint = () => {
        const newPoint = {
            id: points.length + 1,
            point: ''
        }
        setPoints([...points, newPoint])
    }
    // handle remove point
    const handleRemovePoint = (id: number) => {
        const newPoints = points.filter(point => point.id !== id)
        setPoints(newPoints)
    }

    const handleCreate = () => {
        setIsLoading(true)
        console.log('packageData', childView)
        if (childView) {
            const childPackage = childPackageDetails.map(item => {
                return {
                    price: item.price,
                    duration: item.duration
                }
            })
            setPackageData({ ...packageData, child: childPackage })
        }
        createPackage({ packageData, points }, token).then((res) => {
            console.log('res', res)
            if (res.data.success) {
                toast.success(res.data.message)
                setPackageData({
                    name: '',
                    price: 0,
                    durationUnit: '',
                    duration: 0,
                    description: '',
                    points: [],
                    child: []
                })
                setChildView(false)
                setChildPackageDetails([])
            }
            setIsLoading(false)
        }).catch((err) => {
            toast.error(err.response.data.message)
            setIsLoading(false)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleChild = (e: any) => {
        if (e.target.checked) {
            setChildView(true)
        } else {
            setChildView(false)
        }
    }

    const handleAddChildPacakge = () => {
        const newChildPackage = {
            id: childPackageDetails.length + 1,
            price: 0,
            duration: 0
        }
        setChildPackageDetails([...childPackageDetails, newChildPackage])
    }

    const handleRemoveChildPacakge = (id: number) => {
        const newChildPackage = childPackageDetails.filter(item => item.id !== id)
        setChildPackageDetails(newChildPackage)
    }

    return (
        <div className='max-w-7xl'>
            <h1 className='text-gray-700 font-semibold text-2xl'>New Package</h1>
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Info</h2>
                <div className='mt-3 flex gap-8'>
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={packageData.name}
                        onChange={(e) => setPackageData({ ...packageData, name: e.target.value })}
                        label="Pacakge Name" variant="outlined"
                        placeholder='Package Title'
                        type='text'
                    />
                    {/* price */}
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={packageData.price}
                        onChange={(e) => setPackageData({ ...packageData, price: parseInt(e.target.value) })}
                        label="Pacakge Price" variant="outlined"
                        placeholder='0'
                        type='number'
                    />
                </div>
            </div>
            {/* pacakge duration */}
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Duration</h2>
                <div className='mt-3 flex gap-8'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Duration Unit</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={packageData.durationUnit}
                            label="Duration Unit"
                            onChange={(e: SelectChangeEvent) => setPackageData({ ...packageData, durationUnit: e.target.value })}
                        >
                            <MenuItem value={"Year"}>Year</MenuItem>
                            <MenuItem value={"Month"}>Month</MenuItem>
                            <MenuItem value={"Day"}>Day</MenuItem>
                        </Select>
                    </FormControl>
                    {/* price */}
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={packageData.duration}
                        onChange={(e) => setPackageData({ ...packageData, duration: parseInt(e.target.value) })}
                        label="Pacakge Duration" variant="outlined"
                        placeholder='0'
                        type='number'
                    />
                </div>
            </div>
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Description</h2>
                <div className='mt-3 flex gap-8'>
                    {/* price */}
                    <TextareaAutosize
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        value={packageData.description}
                        onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
                        minRows={8}
                        placeholder='Describe the package here '
                    />
                </div>
            </div>
            {/* heading */}
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Points</h2>
                <div className='mt-3'>
                    {/* price */}
                    {
                        points.map((point, index) => {
                            return (
                                <div key={index} className="relative mb-4">
                                    <TextField
                                        className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        value={point.point}
                                        // update the point
                                        onChange={(e) => {
                                            setPoints(points.map((point) => point.id === index + 1 ? { ...point, point: e.target.value } : point))
                                        }}
                                        label={"Describtion Point " + point.id}
                                        variant="outlined"
                                        placeholder='Describe the point here'
                                        type='text'
                                    />
                                    <button className='bg-red-400 hover:bg-red-500 cursor-pointer text-gray-50 drop-shadow absolute -top-2 -right-2 rounded-full' onClick={() => handleRemovePoint(point.id)}> <Remove /></button>
                                </div>
                            )
                        })
                    }
                    <button className='bg-blue-500 text-gray-50 px-4 py-2 rounded-md border border-blue-400 hover:bg-blue-600' onClick={handleAddPoint}> <Add /> Add Point</button>
                </div>
            </div>

            {/* child package */}
            <div className='text-gray-700'>
                <h2 className='text-sm font-semibold py-3'>Child Package</h2>
                <div className='flex items-center justify-start gap-3'>
                    <label htmlFor="child" className='text-sm'>Enable the child Package</label>
                    <input type="checkbox" ref={checkRef} onClick={handleChild} className='h-4 w-4' />
                </div>
                {
                    childView && <div className='my-3 w-1/2'>
                        <h2 className='text-gray-700 text-sm font-semibold'>Child Pacakge Info</h2>
                        {
                            childPackageDetails.map((child, index) => {
                                return (
                                    <div className='border rounded-sm py-2 px-1 hover:shadow-md mb-3 relative' key={index}>
                                        <button className='bg-red-400 hover:bg-red-500 cursor-pointer text-gray-50 drop-shadow absolute -top-2 -right-2 rounded-full' onClick={() => handleRemoveChildPacakge(child.id)}> <Remove /></button>
                                        <p className='text-[12px]'>Child Pacakge {child.id}</p>
                                        <div className='mt-1 flex  gap-5 w-full'>
                                            <input type="number" required value={child.duration} onChange={(e) => {
                                                setChildPackageDetails(childPackageDetails.map((child) => {
                                                    return child.id === index + 1 ? { ...child, duration: parseInt(e.target.value) } : child
                                                }))
                                            }} placeholder='Enter Duration in months' className='border h-10 px-1 rounded-sm w-full' />
                                            <input type="number" required value={child.price} onChange={(e) => {
                                                setChildPackageDetails(childPackageDetails.map((child) => {
                                                    return child.id === index + 1 ? { ...child, price: parseInt(e.target.value) } : child
                                                }))
                                            }}
                                                placeholder='Enter Price' className='border h-10 px-1 rounded-sm  w-full' />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div>

                        </div>
                        <button className='px-2 py-1.5 bg-blue-500 text-gray-100 rounded-md my-2' onClick={handleAddChildPacakge}>Add child Package</button>
                    </div>
                }
            </div>

            <div className='mt-5'>
                {
                    isLoading ? <LinearProgress /> : <Button size='medium'
                        sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b' }}
                        variant="contained" onClick={handleCreate}>Create</Button>
                }
            </div>
        </div>
    )
}

export default Package