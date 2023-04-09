import React from 'react'
import { ParentCompProps } from '../Dashboard'
import { getUserById, getAllRecipe } from '../../http/api'
import Back from '../../Components/Back'
import { useAppSelector } from '../../store/hook';
import { useParams } from 'react-router-dom'
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';

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
    const { token } = useAppSelector(state => state.auth)
    const location = useParams<{ id: any }>()


    const { id } = location

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [allRecipe, setAllRecipe] = React.useState([] as Recipe[] | any[])

    React.useEffect(() => {
        getAllRecipe(token)
            .then(res => {
                console.log(res.data.recipe)
                setAllRecipe(res.data.recipe)
            })
            .catch(err => console.log(err))
    }, [token, id])

    const [nutrition, setNutrition] = React.useState<Nutrition>({
        protein: 0,
        carb: 0,
        fat: 0,
        total: 0
    })

    const [recipe, setRecipe] = React.useState<string>('')

    const handleView = (id: number) => {
        const newRecipe = [...allRecipe]
        newRecipe[id].showIngriedient = !newRecipe[id].showIngriedient
        setAllRecipe(newRecipe)
    }


    return (
        <div>
            <h1 className='text-start text-gray-600 border-b-2 border-green-500 font-semibold text-xl'>Meal Planner</h1>
            <div className='my-5 text-gray-600 flex gap-9'>
                <div className='w-full'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="recipie" className='text-sm'>Select the Recipes</label>
                        <input type="text" value={recipe} onChange={(e) => setRecipe(e.target.value)} placeholder='Search desire recipes' className='w-full border-2 px-1 border-gray-400 rounded-sm h-12' />
                    </div>
                    <div className='my-2'>
                        <div className='flex items-center gap-3'>
                            <div className='h-[1px] w-full bg-gray-200' />
                            <div className='text-gray-400 text-sm'>OR</div>
                            <div className='h-[1px] w-full bg-gray-200' />
                        </div>
                        <span className='text-gray-500 text-sm'>All Recipes {allRecipe.length}</span>
                        {/* show only 5 recipies */}
                        {
                            allRecipe?.map((item: Recipe, index: number) => {
                                return (
                                    <div key={index} className='flex items-center justify-between border-b-2 py-2'>
                                        <div className='flex items-center gap-2'>
                                            {item.image && <img src={item.image.location} alt="" className='w-12 h-12 rounded-md' />}
                                            <h1 className='text-sm'>{item.name}</h1>
                                            <div>
                                                <h5 className='text-[10px] ml-2'>Tags</h5>
                                                <div className='mt-1'>
                                                    {
                                                        item.tags.map((item: any) => {
                                                            return <span className="ml-2 bg-gray-100 px-2 py-1 rounded-sm text-sm">{item}</span>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {/* nutrition value */}
                                            <div className='relative'>
                                                <button onClick={() => handleView(index)}>view ingridient</button>
                                                {
                                                    item.showIngriedient && <Ingriedient show={item} index={index} ingridient={item.ingredients} />
                                                }
                                            </div>
                                            {/* add */}
                                        </div>
                                        <button className='bg-blue-400 px-2 py-1 text-gray-50 cursor-pointer rounded-sm hover:bg-blue-500'>
                                            <FileDownloadDoneOutlinedIcon />
                                            ADD</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='my-4 px-8 py-2 bg-green-500 rounded-md border-green-500 border-2 cursor-pointer text-gray-50 hover:bg-green-600 hover:shadow-md'>Save</button>
                </div>


                {/* nutrition value preview */}
                <div className='w-96'>
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
const Ingriedient = ({ ingridient, show, index }: any) => {

    // close if click outside the div
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current) {
                if (ref.current && !ref.current.contains(event.target)) {
                    console.log(show)
                    show[index].showIngriedient = false
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 bg-white border rounded-sm' ref={ref}>
            <div className='py-1'>
                <h5 className='text-[10px] ml-2'>Ingridient Use</h5>
                <div className='flex p-2 gap-3'>
                    {ingridient.map((item: any) => {
                        return <span className="bg-gray-100 px-2 py-1 rounded-sm text-sm">{item.name}</span>
                    })}
                </div>
            </div>
        </div>
    )
}