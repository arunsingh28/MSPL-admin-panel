import React from 'react'
import { getAllRecipeCategory, getAllIngridient, saveRecipie } from '../../http/api'
import CustomEditor from '../../Components/InstractionEditor/Editor';
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ParentCompProps } from '../Dashboard'
import Back from '../../Components/Back';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppSelector } from '../../store/hook'

interface IRecipie {
    name: string;
    ingredients: [] | any;
    // instructions: string;
    preparationTime: number;
    tags: any[] | any;
    instractions: any[] | any;
    image: any[] | any;
    status: boolean | any;
    sourceLink: string;
    nutritionName: string;
}

interface ImageProps {
    height: number;
    width: number;
    src: string;
}

const NewRecipie = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)

    const { content: prepration } = useAppSelector(state => state.editorContent)

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const imgRef = React.useRef<HTMLInputElement>(null)
    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)

    const [recipeData, setRecipiData] = React.useState<IRecipie>({
        name: '',
        ingredients: [],
        tags: [],
        // instructions: '',
        preparationTime: 0,
        image: [],
        status: true,
        sourceLink: '',
        instractions: '',
        nutritionName: '',
    })

    const [loadingCategory, setLoadingCategory] = React.useState<boolean>(false)
    const [loadingIngridient, setLoadingIngridient] = React.useState<boolean>(false)
    const [categoryTag, setCategoryTag] = React.useState<any>([])
    const [foodCategory, setFoodCategory] = React.useState<any>([])
    const [ingridient, setIngridient] = React.useState<any>([])

    // ingridient add
    const [ingridientVisiable, setIngridientVisiable] = React.useState<boolean>(false)
    const [searchIngriedient, setSearchIngriedient] = React.useState<string>('')
    const [filterIngridient, setFilterIngridient] = React.useState<any>(ingridient)

    React.useEffect(() => {
        // fetch all food category from server
        getAllRecipeCategory(token).then(res => {
            setLoadingCategory(true)
            setFoodCategory(res.data.data)
        })
        getAllIngridient(1, 10, token).then(res => {
            setLoadingIngridient(true)
            setIngridient(res.data.data)
        })
    }, [])



    const [preview, setPreview] = React.useState<ImageProps>({
        height: 0,
        width: 0,
        src: ''
    })

    React.useEffect(() => {
        if (recipeData.name !== '') {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [recipeData.name])

    // iamge upload 
    const handleFile = () => {
        const file: any = imgRef.current?.files?.[0]
        setRecipiData({ ...recipeData, image: file })
        const fileUrl = URL?.createObjectURL(file)
        // find the original height and width of the image
        const img = new Image()
        img.src = fileUrl
        img.onload = () => {
            setPreview({
                height: (img.height / 10),
                width: (img.width / 10),
                src: fileUrl
            })
        }
    }

    const handleSaveRecipe = async () => {
        setIsLoading(true)
        setRecipiData({ ...recipeData, instractions: prepration })
        console.log('RECIPE DATA', recipeData)
        const form = new FormData()
        form.append('data', JSON.stringify(recipeData))
        form.append('file', recipeData.image)

        saveRecipie(form, token).then(res => {
            console.log('RES', res)
            toast.error(res.data.message)
            setIsLoading(false)
        }).catch((err) => {
            toast.error(err.response.data.message)
            setIsLoading(false)
        })
    }

    const searchRef = React.useRef<any>()

    React.useEffect(() => {
        if (searchIngriedient === '') {
            // setIngridientVisiable(false)
        }
    }, [searchIngriedient])

    // add tags
    const handleTags = (item: any) => {
        setCategoryTag([...categoryTag, item])
        // save into recipeDate
        setRecipiData({ ...recipeData, tags: [...categoryTag, item] })
    }

    // delete tags
    const handleDeleteTag = (item: any) => {
        const updatedTags = [...categoryTag].filter((tag: any) => tag !== item)
        setCategoryTag(updatedTags)
    }


    React.useEffect(() => {
        if (document.activeElement !== searchRef.current) {
            setIngridientVisiable(false)
        } else {
            setIngridientVisiable(true)
        }
    }, [searchRef.current?.value])


    // const [ingridientArray, setIngridientArray] = React.useState<Ingridient | any>([])

    // create new array of ingridient with quantity and unit in object
    const [ingridientArray, setIngridientArray] = React.useState<any>([])

    // add ingridient
    const handleSelect = (item: string) => {
        console.log({ recipeData })
        setIngridientArray([{ name: item, quantity: 0, unit: 'Gram (GM)' }, ...ingridientArray])
        setRecipiData({ ...recipeData, ingredients: [...ingridientArray, { name: item, quantity: 0, unit: 'Gram (GM)' }] })
        setIngridientVisiable(false)
        setSearchIngriedient('')
    }

    // delete ingridient
    const handleDelete = (item: any) => {
        const updatedIngridient = [...ingridientArray].filter((ingridient: any) => ingridient.name !== item.name)
        // remove the ingridient from recipeData
        const updatedRecipeData = [...recipeData.ingredients].filter((ingridient: any) => ingridient.name !== item.name)
        setRecipiData({ ...recipeData, ingredients: updatedRecipeData })
        console.log({ recipeData })
        setIngridientArray(updatedIngridient)
    }

    // handle ingredient unit
    const handleUnit = (unit: any, index: number) => {
        const updatedIngridient = [...ingridientArray]
        console.log('updated', updatedIngridient)
        updatedIngridient[index].unit = unit
        setIngridientArray(updatedIngridient)
        // update recipeData
        setRecipiData({ ...recipeData, ingredients: updatedIngridient })
    }

    const handleQuantity = (quant: any, index: number) => {
        const updatedIngridient = [...ingridientArray]
        updatedIngridient[index].quantity = quant
        console.log('quant', updatedIngridient)
        setIngridientArray(updatedIngridient)
        // update recipeData
        setRecipiData({ ...recipeData, ingredients: updatedIngridient })
    }
    return (
        <div className='mr-64'>
            <Back />
            <p className='text-2xl text-gray-700 font-semibold mb-4 '>New Recipie</p>
            <div className='h-auto relative'>
                {/* header */}
                {/* body */}
                <div className='py-5 flex flex-col gap-6'>
                    <div className='flex gap-2'>
                        <TextField type="text"
                            label="Recipie Name" variant="outlined"
                            value={recipeData.name}
                            onChange={(e) => setRecipiData({ ...recipeData, name: e.target.value })}
                            placeholder='Enter Recipie Name' className='w-full border h-12 rounded-md px-2 text-gray-600 mt-1' />
                        <TextField type="text"
                            label="Nutritionist Name" variant="outlined"
                            value={recipeData.nutritionName}
                            onChange={(e) => setRecipiData({ ...recipeData, nutritionName: e.target.value })}
                            placeholder='Enter Nutritionist Name' className='w-full border h-12 rounded-md px-2 text-gray-600 mt-1' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <TextField type="number"
                            label="Prepration time (Minutes)" variant="outlined"
                            value={recipeData.preparationTime}
                            onChange={(e) => setRecipiData({ ...recipeData, preparationTime: parseInt(e.target.value) })}
                            placeholder='Enter Prepration time' className='w-full border h-12 rounded-md px-2 text-gray-600 mt-1' />
                        <div className='w-2/3'>
                            <label htmlFor="category" className='text-gray-600 text-[12px]'>Recipie Status</label>
                            <select name="category" defaultValue="true" value={recipeData.status === true ? 'true' : 'false'} onChange={(e) => setRecipiData({ ...recipeData, status: e.target.value === 'true' ? true : false })} id="category" className='w-full border h-[38px] rounded-md px-2 text-gray-700 mt-1'>
                                <option value={"true"}>Active</option>
                                <option value={"false"}>Unactive</option>
                            </select>
                        </div>
                    </div>
                    {/* source link */}
                    <TextField type="url"
                        label="Source Link" variant="outlined"
                        value={recipeData.sourceLink}
                        onChange={(e) => setRecipiData({ ...recipeData, sourceLink: e.target.value })}
                        placeholder='Enter Source Link' className='w-full border h-12 rounded-md text-gray-600 px-2 mt-1' />
                    {/* iamge */}
                    <div className='flex items-center gap-5'>
                        <div className='w-40'>
                            <label htmlFor="category" className='text-gray-600 text-sm'>Recipie Image</label>
                            <div className='flex gap-2 items-center' onClick={() => imgRef.current?.click()}>
                                <div className='w-96 h-24 border rounded-md flex justify-center items-center'>
                                    <input type="file" ref={imgRef} onChange={handleFile} className='hidden' />
                                    <AddAPhotoIcon />
                                </div>
                            </div>
                            <p className='text-gray-400 text-[10px]'>Image size should be 400x400</p>
                        </div>
                        {/* preview of image */}
                        <div className='w-40 h-24 rounded-md flex justify-center items-center'>
                            {
                                preview.src ? <img src={preview.src} alt="preview" className='w-full h-full object-cover rounded-md mt-2' /> : null
                            }
                        </div>
                    </div>

                    {/* ingridient */}
                    <div className=''>
                        <p className='text-sm text-gray-600'>Select the ingridienets</p>
                        <div className='mt-2'>
                            {
                                loadingIngridient ?
                                    <div className='flex items-center justify-between gap-3 relative'>
                                        <input type="text" value={searchIngriedient} ref={searchRef} onClick={() => setIngridientVisiable(true)} onChange={(e) => {
                                            setIngridientVisiable(true)
                                            setFilterIngridient(ingridient.filter((item: any) => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
                                            setSearchIngriedient(e.target.value)
                                        }} className='h-12 border px-2 rounded-md w-full' placeholder='Search ingridienets' />
                                        {
                                            ingridientVisiable ?
                                                <div className='flex flex-col border bg-white absolute top-14 w-full shadow-md rounded-md left-0 max-h-36 overflow-hidden overflow-y-scroll justify-start items-start z-50'>
                                                    {
                                                        filterIngridient?.length < 0 ? 'not found' : null

                                                    }
                                                    {
                                                        filterIngridient?.map((item: any, index: number) => {
                                                            return (
                                                                <div key={index} className="flex w-full py-1 px-2 hover:bg-gray-200" onClick={() => handleSelect(item.name)}>
                                                                    <p>{item.name}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div> : null
                                        }
                                    </div>
                                    : <div className='flex justify-start items-center py-3'><CircularProgress size={20} color="inherit" /></div>
                            }
                        </div>
                        {/* select ingrideient */}
                        {
                            ingridientArray.length > 0 ?
                                <>
                                    <div className='text-gray-600 text-sm mt-2'>
                                        <p className='font-semibold'>Selected ingridienents</p>
                                        <div className="relative overflow-x-auto mt-2">
                                            <table className="w-full text-sm text-left text-gray-500">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            Ingridienet
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Quantity
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Unit
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Delete
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        ingridientArray.map((item: any, index: number) => {
                                                            return (
                                                                <tr className="bg-white border-b" key={index}>
                                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                        {item.name}
                                                                    </th>
                                                                    <td className="px-6 py-4">
                                                                        <input type="text" onChange={(e) => handleQuantity(e.target.value, index)} className='border w-10 h-8 rounded-md px-1' placeholder='0' />
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <select value={item.unit} onChange={(e) => handleUnit(e.target.value, index)}>
                                                                            <option value="gram">Gram (Gm)</option>
                                                                            <option value="Miligram">Miligram (Mg)</option>
                                                                            <option value="Millilitre">Millilitre (Ml)</option>
                                                                            <option value="Liter">Liter (L)</option>
                                                                            <option value="Teaspoon">Teaspoon</option>
                                                                            <option value="Cup">Cup</option>
                                                                            <option value="HalfCup">Half cup</option>
                                                                        </select>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <button onClick={() => handleDelete(item)} className='bg-red-500 text-gray-50 py-1.5 px-3 rounded-md hover:shadow-md'>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </> : <p className='text-sm text-gray-500 bg-gray-50 my-2 text-center py-2'>No ingridient selected</p>

                        }

                    </div>
                    {/* instraction */}
                    <div className=''>
                        <p className='text-gray-600 text-sm mb-2'>Prepration</p>
                        <CustomEditor />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="category" className='text-gray-600 text-sm'>Select Category</label>
                        {
                            loadingCategory ? <>
                                <select name="category" onChange={(e) => {
                                    // setRecipiData({ ...recipeDate, category: e.target.value })
                                    // create array of different category
                                    handleTags(e.target.value)
                                }} id="category" className='border h-12 rounded-md px-2 text-gray-700 mt-2 w-96'>
                                    {
                                        foodCategory.map((item: any) => (
                                            <option value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </> : <div className='flex justify-start items-center py-3'><CircularProgress size={20} color="inherit" /></div>
                        }
                        {/* seletec category */}
                        {
                            categoryTag.length > 0 ?
                                <div className='flex flex-wrap gap-2 mt-2'>
                                    {
                                        categoryTag.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className='flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md'>
                                                    <p>{item}</p>
                                                    <CancelIcon onClick={() => handleDeleteTag(item)} className='cursor-pointer' />
                                                </div>
                                            )
                                        })
                                    }
                                </div> : <p className='text-gray-500 text-sm mt-2'>No category selected</p>
                        }
                    </div>

                    <Button size='medium' sx={{ paddingX: 7, paddingY: 1.8, background: '#1b356b' }}
                        variant="contained" disabled={disable} className='w-40' onClick={handleSaveRecipe}><SaveIcon className='mr-2' />
                        {
                            isLoading ? <CircularProgress size={20} color="inherit" /> : 'save'
                        }
                    </Button>
                </div>
            </div>

        </div >
    )
}

export default NewRecipie