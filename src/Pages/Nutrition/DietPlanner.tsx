import React from 'react'
import { ParentCompProps } from '../Dashboard'
import { getUserById, getAllRecipe, getAllDietFrequency, createDietPlan } from '../../http/api'
import Back from '../../Components/Back'
import { useAppSelector } from '../../store/hook';
import { useParams } from 'react-router-dom'
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { toast } from 'react-toastify'

interface Nutrition {
    protein: number,
    carb: number,
    fat: number,
    total: number
}

interface Recipe {
    createdAt: string,
    image: { location: string, key: string }
    ingredients: {
        name: string,
        quantity: string,
        unit: string
    }[]
    quntity: {
        size: string,
        unit: string
    }
    foodFrequency: string
    name: string
    nutritionName: string
    preparationTime: number
    sourceLink: string
    status: boolean
    tags: string[]
    _id: string,
    showIngriedient: boolean
}

const DietPlanner = ({ title, content }: ParentCompProps) => {
    const { token, user } = useAppSelector(state => state.auth)

    console.log('user', user)

    const location = useParams<{ id: any }>()


    const { id } = location

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allRecipe, setAllRecipe] = React.useState([] as Recipe[] | any[])
    const [filterRecipe, setFilterRecipe] = React.useState(allRecipe)

    const [foodFrequency, setFoodFrequency] = React.useState([] as any[])

    React.useEffect(() => {
        getAllRecipe(token)
            .then(res => {
                console.log(res.data.recipe)
                setAllRecipe(res.data.recipe)
                setFilterRecipe(res.data.recipe)
            })
            .catch(err => console.log(err))
        getAllDietFrequency(token).then((res) => {
            setFoodFrequency(res.data.data)
        }).catch(err => console.log(err))
    }, [token, id])

    const [nutrition, setNutrition] = React.useState<Nutrition>({
        protein: 0,
        carb: 0,
        fat: 0,
        total: 0
    })

    // save btn disable
    const [disable, setDisable] = React.useState<boolean>(true)

    const [recipe, setRecipe] = React.useState<string>('')

    const handleView = (id: number) => {
        const newRecipe = [...allRecipe]
        newRecipe[id].showIngriedient = !newRecipe[id].showIngriedient
        setAllRecipe(newRecipe)
    }

    const handleFilterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipe(e.target.value)
        // filter the data from the array
        const filteredData = allRecipe.filter((item: any) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilterRecipe(filteredData)
    }

    const [addedRecipe, setAddedRecipe] = React.useState([] as Recipe[] | any[])

    const handleAddRecipe = (id: string) => {
        const newRecipe = [...allRecipe]
        const newAddedRecipe = [...addedRecipe]

        const index = newRecipe.findIndex((item: any) => item._id === id)
        newAddedRecipe.push(newRecipe[index])
        newRecipe.splice(index, 1)
        const newAddedRecipe1 = newAddedRecipe.map((item: any) => {
            return {
                ...item,
                quantity: {
                    size: '0',
                    unit: 'Gram'
                },
                foodFrequency: 'Lunch'
            }
        })
        setAddedRecipe(newAddedRecipe1)
        setFilterRecipe(newRecipe)
    }

    React.useEffect(() => {

    }, [recipe])

    // for added recipe
    const handleViewAdded = (id: number) => {
        const newRecipe = [...addedRecipe]
        newRecipe[id].showIngriedient = !newRecipe[id].showIngriedient
        setAddedRecipe(newRecipe)
    }

    const handleDelete = (id: string) => {
        const newAddedRecipe = [...addedRecipe]
        const index = newAddedRecipe.findIndex((item: any) => item._id === id)
        newAddedRecipe.splice(index, 1)
        setAddedRecipe(newAddedRecipe)
    }

    const handleSaveMealPlan = async () => {
        const data = { recipe: addedRecipe, userId: id }
        createDietPlan(data, token).then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setDisable(true)
            }
        }).catch((err: any) => {
            toast.error(err.response.data.message)
        })
    }

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newAddedRecipe = [...addedRecipe]
        const index = newAddedRecipe.findIndex((item: any) => item._id === id)
        newAddedRecipe[index].quantity.size = e.target.value
        setAddedRecipe(newAddedRecipe)
    }

    const handleUnite = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const newAddedRecipe = [...addedRecipe]
        const index = newAddedRecipe.findIndex((item: any) => item._id === id)
        newAddedRecipe[index].quantity.unit = e.target.value
        setAddedRecipe(newAddedRecipe)
    }

    const handleFoodFrequency = (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const newAddedRecipe = [...addedRecipe]
        const index = newAddedRecipe.findIndex((item: any) => item._id === id)
        newAddedRecipe[index].foodFrequency = e.target.value
        setAddedRecipe(newAddedRecipe)
    }




    return (
        <div>
            <h1 className='text-start text-gray-600 border-b-2 border-green-500 font-semibold text-xl'>Meal Planner</h1>
            <div className='my-5 text-gray-600 flex gap-9'>
                <div className='flex-1'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="recipie" className='text-sm'>Select the Recipes</label>
                        <input type="text" value={recipe} onChange={handleFilterSearch} placeholder='Search desire recipes' className='w-full border-2 px-1 border-gray-400 rounded-sm h-12' />
                    </div>
                    <div className='my-2'>
                        <span className='text-gray-500 text-sm'>All Recipes {allRecipe.length}</span>
                        {/* show only 5 recipies */}
                        <div className="relative">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Picture
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Prepration Time
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tags
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nutrition
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterRecipe && filterRecipe.length === 0 ?
                                            <tr className="bg-white border-b z-50">
                                                <th scope="row" className="px-6 py-4 text-gray-600 capitalize">
                                                    No Recipe Found
                                                </th>
                                            </tr> : filterRecipe.map((item: Recipe, index: number) => {
                                                return (
                                                    <tr key={index} className="bg-white border-b z-50">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                            {item.image && <img src={item.image.location} alt="" className='w-12 h-12 rounded-md object-cover' />}
                                                        </th>
                                                        <td className="px-6 py-4 text-gray-600 capitalize">
                                                            {item.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600 capitalize flex items-center gap-1 mt-3">
                                                            <AccessTimeOutlinedIcon fontSize='small' /> {item.preparationTime} min
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {
                                                                item.tags.map((item: any) => {
                                                                    return <span className="ml-2 bg-gray-100 px-2 py-1 rounded-sm text-sm mt-1">{item}</span>
                                                                })
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 relative">
                                                            <button onClick={() => handleView(index)} className="text-sm px-2 py-1 bg-orange-400 text-gray-50 rounded-sm flex items-center gap-1">
                                                                <GridViewOutlinedIcon fontSize='small' />
                                                                view ingridient</button>
                                                            {
                                                                item.showIngriedient && <Ingriedient show={item} index={index} allRecipe={allRecipe} setAllRecipe={setAllRecipe} ingridient={item.ingredients} />
                                                            }
                                                        </td>
                                                        <td>
                                                            <button
                                                                className='bg-blue-300 px-3 py-1 hover:shadow-md hover:bg-blue-400 text-white rounded-sm text-sm flex items-center justify-center gap-1'
                                                                onClick={() => handleAddRecipe(item._id)}>
                                                                <FileDownloadDoneOutlinedIcon />
                                                                ADD
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            addedRecipe.length === 0 ? null : <div className='bg-gray-200'>
                                <h2 className='text-gray-800 text-sm py-2 px-5'>Added Recipes</h2>
                            </div>
                        }
                        {
                            addedRecipe && addedRecipe.length === 0 ? null :
                                <div className="relative overflow-hidden">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Picture
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Prepration Time
                                                </th>

                                                <th scope="col" className="px-6 py-3">
                                                    Nutrition
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Quntity
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Food Frequency
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Task
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                addedRecipe && addedRecipe.map((item: Recipe, index: number) => {
                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {item.image && <img src={item.image.location} alt="" className='w-12 h-12 rounded-md object-cover' />}
                                                            </th>
                                                            <td className="px-6 py-4 text-gray-600 capitalize">
                                                                {item.name}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 capitalize flex items-center gap-1 mt-3">
                                                                <AccessTimeOutlinedIcon fontSize='small' /> {item.preparationTime} min
                                                            </td>
                                                            <td className="px-6 py-4 relative">
                                                                <button onClick={() => handleViewAdded(index)} className="text-sm px-2 py-1 bg-orange-400 text-gray-50 rounded-sm flex items-center gap-1">
                                                                    <GridViewOutlinedIcon fontSize='small' />
                                                                    view ingridient</button>
                                                                {
                                                                    item.showIngriedient && <Ingriedient show={item} index={index} allRecipe={addedRecipe} setAllRecipe={setAddedRecipe} ingridient={item.ingredients} />
                                                                }
                                                            </td>
                                                            <td className="">
                                                                <div className='text-gray-600 flex items-center justify-center gap-1'>
                                                                    <input type="text" value={item.quntity?.size} onChange={(e) => handleQuantity(e, item._id)} className='border rounded-sm w-8 px-1' placeholder='0' />
                                                                    <select className='border rounded-sm py-0.5' value={item.quntity?.unit} onChange={(e) => handleUnite(e, item._id)}>
                                                                        <option value="gram">Gram (Gm)</option>
                                                                        <option value="Miligram">Miligram (Mg)</option>
                                                                        <option value="Millilitre">Millilitre (Ml)</option>
                                                                        <option value="Liter">Liter (L)</option>
                                                                        <option value="Teaspoon">Teaspoon</option>
                                                                        <option value="Cup">Cup</option>
                                                                        <option value="HalfCup">Half cup</option>
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600">
                                                                <select className='border px-1 py-1 rounded-sm' value={item?.foodFrequency} onChange={(e) => handleFoodFrequency(e, item._id)}>
                                                                    {
                                                                        foodFrequency && foodFrequency?.map((item: any, index: number) => {
                                                                            return <option key={index} value={item.name}>{item.name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600 capitalize">
                                                                <button className='px-2 py-1 border border-red-500 rounded-sm text-red-500 hover:bg-red-500 hover:text-gray-50' onClick={() => handleDelete(item._id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <button className={!disable ? 'my-4 px-8 py-2 bg-green-500 rounded-md border-green-500 border-2 cursor-pointer text-gray-50 hover:bg-green-600 hover:shadow-md' : 'my-4 px-8 py-2 bg-gray-300 rounded-md border-gray-300 border-2 cursor-not-allowed text-gray-50 hover:bg-gray-400 hover:shadow-md'} disabled={disable} onClick={handleSaveMealPlan}>Save</button>
                                </div>
                        }
                    </div>
                </div>


                {/* nutrition value preview */}
                <div className='w-44 sticky top-0 left-0'>
                    <h1 className='font-semibold'>Nutrition Values</h1>
                    <div className='py-2 flex flex-col gap-2 border-b-2'>
                        {/* protein */}
                        <div className='flex items-center justify-between text-gray-500'>
                            <h2 className='text-'>Protein</h2>
                            <span>{nutrition.protein}g</span>
                        </div>
                        {/* carb */}
                        <div className='flex items-center justify-between text-gray-500'>
                            <h2 className='text-'>Carb</h2>
                            <span>{nutrition.carb}g</span>
                        </div>
                        {/* Fat */}
                        <div className='flex items-center justify-between text-gray-500'>
                            <h2 className='text-'>Fat</h2>
                            <span>{nutrition.fat}g</span>
                        </div>
                    </div>
                    {/* total */}
                    <div className='mt-2'>
                        <div className='flex items-center justify-between text-gray-500'>
                            <h2 className='font-semibold'>Total</h2>
                            <span className='font-semibold'>{nutrition.total}g</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DietPlanner

// ingriedient drop down
const Ingriedient = ({ ingridient, index, show, allRecipe, setAllRecipe }: any) => {
    // close if click outside the div
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current) {
                if (ref.current && !ref.current.contains(event.target)) {
                    const newRecipe = [...allRecipe]
                    newRecipe[index].showIngriedient = !newRecipe[index].showIngriedient
                    setAllRecipe(newRecipe)
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const handleClose = () => {
        const newRecipe = [...allRecipe]
        newRecipe[index].showIngriedient = !newRecipe[index].showIngriedient
        setAllRecipe(newRecipe)
    }

    return (
        <div className='absolute top-0 left-0 bg-white border rounded-sm w-[300px] h-auto shadow-sm z-10' ref={ref}>
            <h5 className='text-[10px] ml-2'>Macronutrients</h5>
            <div className='mx-2'>
                <div className='flex gap-2'>
                    <p className='bg-orange-400 px-1 rounded-sm text-gray-50'>
                        <span className='text-white font-semibold'>P</span> 5g
                    </p>
                    <p className='bg-green-400 px-1 rounded-sm text-gray-50'>
                        <span className='text-white font-semibold'>C</span> 10g
                    </p>
                    <p className='bg-red-400 px-1 rounded-sm text-gray-50'>
                        <span className='text-white font-semibold'>F</span> 20g
                    </p>
                </div>
            </div>
            <div className='py-1 relative'>
                <h5 className='text-[10px] ml-2'>Ingridient Use</h5>
                <div className='flex p-2 gap-3 flex-wrap'>
                    {ingridient.map((item: any) => {
                        return <span className="bg-gray-100 px-2 py-1 rounded-sm text-sm">{item.name}</span>
                    })}
                    <CloseOutlinedIcon fontSize='small' onClick={handleClose} className='absolute -top-10 right-0 bg-slate-200 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}


