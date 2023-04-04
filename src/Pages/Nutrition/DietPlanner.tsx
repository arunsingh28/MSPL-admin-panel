import React from 'react'
import { ParentCompProps } from '../Dashboard'
import { getAllDietFrequency, getAllRecipe } from '../../http/api'
import Back from '../../Components/Back'
import { useAppSelector } from '../../store/hook';

const DietPlanner = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const currentSelectRef = React.useRef(null)


    const [dietFrequency, setDietFrequency] = React.useState([])
    const [recipie, setRecipie] = React.useState([])
    const [searchInput, setSearchInput] = React.useState<string>('')
    const [filteredRecipie, setFilteredRecipie] = React.useState<any>([])
    const [selectedRecipe, setSelectedRecipe] = React.useState<any>([])

    React.useEffect(() => {
        getAllDietFrequency(token).then(res => {
            setDietFrequency(res.data.data)
        })
        getAllRecipe(token).then(res => {
            console.log(res.data.recipe)
            setRecipie(res.data.recipe)
        })
    }, [])

    const handleSelect = () => {

    }

    const handleSelectFreq = (index: number) => {

    }
    // handle filter recipie
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
        const filter = recipie.filter((item: any) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredRecipie(filter)
    }

    return (
        <div>
            <Back />
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Diet planner</p>
            <div className=''>
                <div className='text-gray-700'>
                    <h3>Select the Meal frequency</h3>
                    <div className='flex flex-wrap'>
                        {
                            dietFrequency.length > 0 ?
                                <div className='flex flex-wrap gap-2 mt-2'>
                                    {
                                        dietFrequency.map((item: any, index: number) => {
                                            return (
                                                <div key={index} onClick={() => handleSelectFreq(item.name)} className={'flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md'}>
                                                    <div className='flex items-center gap-2' onClick={handleSelect}>
                                                        <input type="radio" ref={currentSelectRef} name={item.name} id={item.name} value={item.name} />
                                                        {item.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : <p className='text-gray-500 text-sm mt-2'>No category selected</p>
                        }
                    </div>
                    {/* select the recipie */}
                    <div className='text-gray-700 py-3'>
                        <h3>Select the Recipe</h3>
                        <div className='mt-2'>
                            <input className='border h-10 rounded-sm px-1 w-96' value={searchInput} onChange={handleFilter} placeholder='Search recipe' />
                            {
                                filteredRecipie.length > 0 ? recipie.map((item: any, index: number) => {
                                    return (

                                        <div key={index} className='flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md'>
                                            <p>{item.name}</p>
                                            <button className='text-green-500' onClick={() => setSelectedRecipe([...selectedRecipe, item])}>Add</button>
                                        </div>

                                    )
                                }) : <p className='text-gray-500 text-sm mt-2'>No category selected</p>
                            }
                        </div>
                    </div>
                    {/* display selcted recipie */}
                    <div>
                        {
                            selectedRecipe.length > 0 ? selectedRecipe.map((item: any, index: number) => {
                                return (
                                    <div key={index} className='flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md'>
                                        <p>{item.name}</p>
                                        <button className='text-red-500'>Remove</button>
                                    </div>
                                )
                            }) : <p className='text-gray-500 text-sm mt-2'>No category selected</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DietPlanner