import React from 'react'
import { ParentCompProps } from '../Dashboard'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllIngridient } from '../../http/api';

const ViewIngridienents = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [ingridient, setIngridient] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        getAllIngridient().then(res => {
            setIsLoading(true)
            console.log(res.data.data)
            setIngridient(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const handleDelete = async (id: string) => { }

    const handleEdit = async (id: string) => { }

    const convertToDay = (timestamp: string) => { return '2 day' }

    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4 '>All Ingredients List</p>
            <div>
                <div className="relative overflow-x-auto rounded-sm max-h-[600px]">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ingredients Name
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Updated At
                                </th> */}
                                {/* <th scope="col" className="px-6 py-3">
                                Status
                            </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ? ingridient.length === 0 ? <td className='text-center py-4 bg-[#f0efef23]' colSpan={5}>No Recipies Found</td> : ingridient.map((item: any) => (
                                    <tr className="bg-white border-b pt-10 even:bg-slate-50 last-of-type:even:border-none hover:bg-gray-100" key={item._id}>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {item.name}
                                        </td>
                                        {/* <td className="px-6 py-4">
                                            {
                                                convertToDay(item.updatedAt)
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                convertToDay(item.createdAt)
                                            }
                                        </td> */}

                                        <td className="px-6 py-4">
                                            <div className='flex items-center gap-1 border w-24 justify-center py-1 rounded-md cursor-pointer hover:bg-red-200' onClick={() => handleDelete(item._id)}><DeleteOutlineTwoToneIcon /> Delete</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='flex items-center gap-1 border w-24 justify-center py-1 rounded-md cursor-pointer hover:bg-gray-100' onClick={() => handleEdit(item._id)}><AppRegistrationTwoToneIcon /> Edit</div>
                                        </td>
                                    </tr>
                                )) : <td className='text-center py-4 bg-[#f0efef23] mt-4' colSpan={5}><CircularProgress size={20} color="inherit" /></td>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default ViewIngridienents