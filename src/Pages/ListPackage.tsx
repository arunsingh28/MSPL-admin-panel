import React from 'react'
import { ParentCompProps } from './Dashboard'
import { getAllPackage } from '../http/api'
import Back from '../Components/Back'
import { useAppSelector } from '../store/hook'
import WifiTetheringErrorOutlinedIcon from '@mui/icons-material/WifiTetheringErrorOutlined';

interface ListPackageProps {
    _id: string,
    title: string,
    packageDescription: string
    packageDuration: number,
    packageDurationUnit: string,
    packageName: string,
    packagePrice: number,
    packagePoint: [],
    packageChild: []
}


const ListPackage = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allPackage, setAllPackage] = React.useState<any>([{
        _id: '',
        packageDescription: '',
        packageDuration: 0,
        packageDurationUnit: '',
        packageName: '',
        packagePrice: 0,
        packagePoint: [],
        packageChild: []
    }])

    React.useEffect(() => {
        getAllPackage(token).then(res => {
            setAllPackage(res.data.data)
        }).catch(err => {
        }).finally(() => { })
    }, [token])

    return (
        <div>
            <Back />
            <h1 className='text-2xl text-gray-700 font-semibold pb-2'>List Package</h1>
            <div className='text-gray-600'>
                <span className='text-sm '>Total {allPackage?.length || 0} Package</span>
                <div className='flex gap-4 flex-wrap'>
                    {
                        allPackage && allPackage.length > 0 ? allPackage.map((item: ListPackageProps) => {
                            return (
                                <div key={item._id} className='mt-3 border w-[400px] py-5 px-4 rounded-sm text-gray-100'>
                                    <h2 className='text-gray-800 font-bold text-xl'>{item.packageName}</h2>
                                    <p className='text-gray-700'>{item.packageDescription}</p>
                                    <h3 className='text-gray-900 font-semibold text-2xl'>Price: {item.packagePrice}</h3>
                                    <h3 className='text-gray-500'>Duration: {item.packageDuration}/{item.packageDurationUnit}</h3>
                                    <div>
                                        {
                                            item.packagePoint.map((point: any, index: number) => {
                                                return (
                                                    <div key={index} className='flex gap-2 items-center text-gray-700'>
                                                        <li>{point.point}</li>
                                                    </div>
                                                )
                                            })

                                        }
                                    </div>
                                    {/* child package */}
                                    <div className='my-5'>
                                        <h2 className='text-gray-600 border-t my-2 pt-2'>Child Package</h2>
                                        {/* <div className="flex w-full"> */}
                                        {
                                            item.packageChild.map((child: any, index: number) => {
                                                return (
                                                    <div key={index} className='flex gap-2 items-center text-gray-700'>
                                                        <li>{child.duration}/month</li>
                                                        <>{child.price}</>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* </div> */}
                                    </div>
                                </div>
                            )
                        }) : <div className='text-gray-500 py-5 mx-auto'>
                            <p className='text-sm flex items-center gap-2'>
                                <WifiTetheringErrorOutlinedIcon fontSize='large' className='ml-2'/>
                                No Package</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default ListPackage