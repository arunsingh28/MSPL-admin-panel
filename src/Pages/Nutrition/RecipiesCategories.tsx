import React from 'react'
import { ParentCompProps } from '../Dashboard'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { createRecipiCategory, getAllRecipeCategory, deleteRecipeCategory, updateRecipeCategory } from '../../http/api'
import { toast } from 'react-toastify';

const RecipiesCategories = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const [visiable, setVisiable] = React.useState(false)

    const [recipiCategories, setRecipiCategories] = React.useState<any>([])

    const handleDelete = async (id: string) => {
        const res = await deleteRecipeCategory(id)
        // clear the deleted category from the state
        setRecipiCategories(recipiCategories.filter((item: any) => item._id !== id))
        toast.success(res.data.message)
    }

    const handleEdit = async (id: string) => {
        const promt = window.prompt('Enter new name')
        if (promt === '') return toast.error('Please enter a valid name')
        if (promt !== null) {
            try {
                const res = await updateRecipeCategory({ name: promt }, id)
                setRecipiCategories(res.data.data)
                toast.success(res.data.message)
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        }
    }

    React.useEffect(() => {
        getAllRecipeCategory().then(res => {
            setRecipiCategories(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [visiable])

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
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Recipies Categories</p>
            <div className='flex justify-between mb-2 items-center gap-5'>
                <p className='text-gray-700 text-sm'>Showing {recipiCategories.length} Records</p>
                <button className='px-6 py-1 bg-[#19356a] border border-[#162f5f] rounded-sm text-gray-50' onClick={() => setVisiable(true)}>Add</button>
            </div>
            {
                visiable ? <AddModel setVisiable={setVisiable} /> : null
            }
            {/* table */}
            <div className="relative overflow-x-auto rounded-sm max-h-[600px]">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Recipies Category Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated At
                            </th>
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
                            recipiCategories.length === 0 ? <td className='text-center py-4 bg-[#f0efef23]' colSpan={5}>No Recipies Category Found</td> : recipiCategories.map((item: any) => (
                                <tr className="bg-white border-b pt-10 even:bg-slate-50 last-of-type:even:border-none hover:bg-gray-100">
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
                                    <td className="px-6 py-4">
                                        <div className='flex items-center gap-1 border w-24 justify-center py-1 rounded-md cursor-pointer hover:bg-red-200' onClick={() => handleDelete(item._id)}><DeleteOutlineTwoToneIcon /> Delete</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className='flex items-center gap-1 border w-24 justify-center py-1 rounded-md cursor-pointer hover:bg-gray-100' onClick={() => handleEdit(item._id)}><AppRegistrationTwoToneIcon /> Edit</div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default RecipiesCategories



const AddModel = ({ setVisiable }: any) => {
    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)

    const [name, setName] = React.useState('')

    React.useEffect(() => {
        if (name !== '') {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [name])

    const handleSaveCategory = () => {
        setIsLoading(true)
        try {
            createRecipiCategory({ name }).then(res => {
                setIsLoading(false)
                toast.success(res.data.message)
            }).catch(err => {
                toast.error(err.response.data.message)
                setIsLoading(false)
            }).finally(() => {
                setVisiable(false)
            })
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='h-screen w-screen bg-[#37373764] shadow-md absolute top-0 left-0 flex justify-center items-center' style={{ zIndex: '99999' }}>
            <div className='bg-white w-96'>
                {/* header */}
                <div className='border-b px-5 py-2 flex justify-between items-center'>
                    <h3 className='font-semibold text-gray-600'>Add new Recipies Category</h3>
                    <button onClick={() => setVisiable(false)}><ClearOutlinedIcon /></button>
                </div>
                {/* body */}
                <div className='py-5 mx-5 flex flex-col gap-6'>
                    <TextField type="text"
                        label="New Category Name" variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter Category Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />

                    <Button size='medium' sx={{ paddingX: 7, paddingY: 1.8, background: '#1b356b' }}
                        variant="contained" disabled={disable} className='flex-1' onClick={handleSaveCategory}><SaveIcon className='mr-2' />
                        {
                            isLoading ? <CircularProgress size={20} color="inherit" /> : 'save'
                        }
                    </Button>
                </div>
            </div>

        </div>
    )
}