import React from 'react'
import { ParentCompProps } from '../Dashboard'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllIngridient, delteIngridient, } from '../../http/api';
import { toast } from 'react-toastify'
import Back from '../../Components/Back';
import { useAppSelector } from '../../store/hook'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

const ViewIngridienents = ({ title, content }: ParentCompProps) => {

    const { token } = useAppSelector(state => state.auth)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [ingridient, setIngridient] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [totalPage, setTotalPage] = React.useState(0)

    const [filterData, setFilterData] = React.useState<any>([])

    const [filterString, setFilterString] = React.useState<string>('')

    React.useEffect(() => {
        getAllIngridient(1, 10, token).then(res => {
            setIsLoading(true)
            setIngridient(res.data)
            setTotalPage(Math.ceil(res.data.count / 10))
            setFilterData(res.data.data)
            console.log('data::', ingridient)
        }).catch(err => {
            setIsLoading(true)
            console.log(err)
        })
    }, [token])




    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this ingredient?')
        if (!confirm) return
        delteIngridient(id, token).then((res) => {
            toast.success(res.data.message)
            // update ingredient list and remove the deleted one
            setIngridient({
                ...ingridient,
                data: ingridient.data.filter((item: any) => item._id !== id)
            })

        }).catch(er => {
            toast.error(er.response.data.message)
        })
    }

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFilterString(value)
        const filteredData = filterData.filter((item: any) => item.name.toLowerCase().includes(value.toLowerCase()))
        setIngridient({
            ...ingridient,
            data: filteredData
        })

    }

    const handleEdit = async (id: string) => { }

    // pagination
    const [currentPage, setCurrentPage] = React.useState(1)


    console.log({ totalPage })

    const nextPage = () => {
        if (currentPage === totalPage) return
        setCurrentPage(currentPage + 1)
        getAllIngridient(currentPage + 1, 10, token).then(res => {
            setIsLoading(true)
            setIngridient(res.data)
            setTotalPage(Math.ceil(res.data.count / 10))
            setFilterData(res.data.data)
            console.log('data::', ingridient)
        }).catch(err => {
            setIsLoading(true)
            console.log(err)
        })
    }

    const prevPage = () => {
        if (currentPage === 1) return
        setCurrentPage(currentPage - 1)
        getAllIngridient(currentPage - 1, 10, token).then(res => {
            setIsLoading(true)
            setIngridient(res.data)
            setTotalPage(Math.ceil(res.data.count / 10))
            setFilterData(res.data.data)
            console.log('data::', ingridient)
        }).catch(err => {
            setIsLoading(true)
            console.log(err)
        })
    }

    const indexPage = () => {
        setCurrentPage(1)
        getAllIngridient(1, 10, token).then(res => {
            setIsLoading(true)
            setIngridient(res.data)
            setTotalPage(Math.ceil(res.data.count / 10))
            setFilterData(res.data.data)
            console.log('data::', ingridient)
        }).catch(err => {
            setIsLoading(true)
            console.log(err)
        })
    }

    const lastPage = () => {
        setCurrentPage(totalPage)
        getAllIngridient(totalPage, 10, token).then(res => {
            setIsLoading(true)
            setIngridient(res.data)
            setTotalPage(Math.ceil(res.data.count / 10))
            setFilterData(res.data.data)
            console.log('data::', ingridient)
        }).catch(err => {
            setIsLoading(true)
            console.log(err)
        })
    }

    return (
        <div>
            <Back />
            <p className='text-2xl text-gray-700 font-semibold mb-4 '>All Ingredients List</p>
            <div>
                <input type="text" className='border' value={filterString} onChange={handleFilter} />
            </div>
            <div className='flex justify-between items-center mt-2'>
                <p className='text-gray-600'>Page {currentPage} of {totalPage}  total of {ingridient.count || 0}</p>
                {/* pagniation UI */}
                <div className='flex gap-3'>
                    <button className='bg-gray-200 px-3 py-.5 rounded-sm hover:bg-gray-300' onClick={indexPage}>1</button>
                    <button className='bg-gray-200 px-3 py-.5 rounded-sm hover:bg-gray-300' onClick={nextPage}>
                        <NavigateNextOutlinedIcon />
                    </button>
                    <button className='bg-gray-200 px-3 py-.5 rounded-sm hover:bg-gray-300' onClick={prevPage}>
                        <NavigateNextOutlinedIcon className='rotate-180' />
                    </button>
                    <button className='bg-gray-200 px-3 py-.5 rounded-sm hover:bg-gray-300' onClick={lastPage}>{totalPage}</button>
                </div>
            </div>
            <div className='mt-3'>
                <div className="relative overflow-x-auto rounded-sm max-h-[600px]">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SN
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ingredients Name
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
                                ingridient && isLoading ? ingridient?.data.length === 0 ? <td className='text-center py-4 bg-[#f0efef23]' colSpan={5}>No Ingredient Found</td> : ingridient.data?.map((item: any, index: number) => (
                                    <tr className="bg-white border-b pt-10 even:bg-slate-50 last-of-type:even:border-none hover:bg-gray-100" key={item._id}>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {currentPage === 1 ? index + 1 : (currentPage - 1) * 10 + index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {item.name}
                                        </td>
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