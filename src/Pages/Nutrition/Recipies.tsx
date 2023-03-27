import React from 'react'
import { ParentCompProps } from '../Dashboard'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllRecipe, deleteDietFrequency, updateDietFrequency } from '../../http/api'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Recipies = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const [recipe, setRecipe] = React.useState<any>([])

    const [isLoading, setIsLoading] = React.useState(false)

    const handleDelete = async (id: string) => {
        // comfirm the delete
        const res = await deleteDietFrequency(id)
        console.log(res)
        // clear the deleted category from the state
        setRecipe(recipe.filter((item: any) => item._id !== id))
        toast.success(res.data.message)
    }

    const handleEdit = async (id: string) => {
        const promt = window.prompt('Enter new Diet Frequency Name')
        if (promt === '') return toast.error('Please enter a valid name')
        if (promt !== null) {
            try {
                const res = await updateDietFrequency({ name: promt }, id)
                setRecipe(res.data.data)
                toast.success(res.data.message)
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        }
    }

    React.useEffect(() => {
        getAllRecipe().then(res => {
            setIsLoading(true)
            setRecipe(res.data.recipe)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    // calculate day from time with respect to current date and time and minutes
    const convertToDay = (timestamp: string) => {
        const date = new Date(timestamp)
        const datee: any = new Date().toISOString()
        const ass = new Date(datee)

        const remainDate = new Date(ass.getTime() - date.getTime())

        if (remainDate.getMinutes() - 1 < 60) return remainDate.getMinutes() - 1 + ' minute ago'
        if (remainDate.getHours() - 1 < 24) return remainDate.getHours() - 1 + ' hour ago'
        if (remainDate.getDate() - 1 < 30) return remainDate.getDate() - 1 + ' day ago'
        if (remainDate.getMonth() - 1 < 12) return remainDate.getMonth() - 1 + ' month ago'
        if (remainDate.getFullYear() - 1970 > 0) return remainDate.getFullYear() - 1970 + ' year ago'
    }



    return (
        <div>
            <p className='text-2xl text-gray-700 font-semibold mb-4 '>Nutrition Recipies List</p>
            <div className='flex justify-between mb-2 items-center gap-5'>
                <p className='text-gray-700 text-sm'>Showing {recipe.length} Records</p>
                <Link to="/add-new-recipie"> <button className='px-6 py-1 bg-[#19356a] border border-[#162f5f] rounded-sm text-gray-50'>Add</button></Link>
            </div>
            {/* table */}
            <div className="relative overflow-x-auto rounded-sm max-h-[600px]">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Recipies Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated At
                            </th>
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
                            isLoading ? recipe.length === 0 ? <td className='text-center py-4 bg-[#f0efef23]' colSpan={5}>No Recipies Found</td> : recipe.map((item: any) => (
                                <tr className="bg-white border-b pt-10 even:bg-slate-50 last-of-type:even:border-none hover:bg-gray-100" key={item._id}>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            convertToDay(item.updatedAt)
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            convertToDay(item.createdAt)
                                        }
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        <div className="flex items-center w-full">
                                            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input type="checkbox" id="toggleB" onChange={handleShift} className="sr-only" />
                                                    <div className={}></div>
                                                    <div className="absolute left-0 top-0 bg-white w-6 h-6 rounded-full transition dot"></div>
                                                </div>
                                            </label>
                                        </div>
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

        </div >
    )
}

export default Recipies



