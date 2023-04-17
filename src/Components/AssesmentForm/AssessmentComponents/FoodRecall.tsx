import React, { ChangeEvent } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify'
import { saveLifestyle } from '../../../http/api'
import { useAppSelector } from '../../../store/hook';

import { saveFoodRecall } from '../../../http/api'


const FoodRecall = () => {

    const { user, token } = useAppSelector(state => state.auth)

    const Client = user?._id

    const [mealStyle, setMealStyle] = React.useState<any>({
        earlyMorning: {
            time: '',
            menu: '',
            quantity: '',
        },
        breakfast: {
            time: '',
            menu: '',
            quantity: '',
        },
        midMorning: {
            time: '',
            menu: '',
            quantity: '',
        },
        lunch: {
            time: '',
            menu: '',
            quantity: '',
        },
        eveningSnack: {
            time: '',
            menu: '',
            quantity: '',
        },
        dinner: {
            time: '',
            menu: '',
            quantity: '',
        },
        badTime: {
            time: '',
            menu: '',
            quantity: '',
        }
    })

    const [foodFrequency, setFoodFrequency] = React.useState<any>({
        cereals: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Cereals  ( Ex. Rice, roti, Millets)'
        },
        pulses: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Pulses and Legumes (Ex. green gram, bengalgram, lentils, soya beans)'
        },
        leafyVegetables: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Leafy vegetables (Ex. spinach, mint, methi, gongura)'
        },
        root: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: '  Roots & Tubers (Ex. potato, yam, beetroot, carrot, sweet potato) '
        },
        vegetables: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Other Vegetables (Ex. cabbage, beans, lauki, cauliflower, bhindi)'
        },
        fruits: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Fruits'
        },
        eggs: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Egg'
        },
        meat: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Poultry / Meat (Ex. chicken, quail, mutton,beef)'
        },
        milk: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Milk (Ex. cow milk, buffalo milk)'
        },
        dairy: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Dairy Products (Ex. curd, yoghurt, buttermilk, cheese)'
        },
        oil: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Fats & Oils (Ex. vegetable oil, butter, ghee)'
        },
        sugar: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Sugar / Sweets (Ex. jaggery, chocolate, chikki, candies)'
        },
        sugarDrink: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Sugary / Carbonated drinks/Energy Drinks (Ex. cocacola, sprite, tropicana) '
        },
        frozen: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Processed / Frozen Food (Ex. french fries / peas / canned beans)'
        },
        junk: {
            daily: false,
            Frequently: false,
            Occasionally: false,
            OnceaMonth: false,
            OnceaWeek: false,
            label: 'Outside / Junk food (Ex. samosa, pizza, burger, etc..)'
        }
    })


    const handleCheckFoodFrequency = (e: any) => {
        const { name } = e.target
        setFoodFrequency({
            ...foodFrequency,
            [name]: {
                ...foodFrequency[name],
                [e.target.value]: e.target.checked
            }
        })
    }


    const handleSaveRecall = async () => {
        const payload = {
            mealStyle,
            foodFrequency,
            Client
        }
        console.log({ payload })
        try {
            const { data } = await saveFoodRecall(payload, token)
            console.log(data)
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const [meal, field] = name.split('.');
        // Update the state with the new values
        setMealStyle((prevState: any) => ({
            ...prevState,
            [meal]: {
                ...prevState[meal],
                [field]: value
            }
        }));
    }

    return (
        <div>
            <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>V. 24HR FOOD RECALL</h1>
            <div className='mt-2'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gray-300'>
                            <TableCell align="left" className='font-semibold text-xl'>Meal</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Menu</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='border'>
                        {
                            Object.keys(mealStyle).map((key, index) => {
                                return (
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <p>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="time" value={mealStyle[key]?.time} name={`${key}.time`} onChange={handleChange} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Time ' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input className='border rounded-sm border-gray-400 h-10 px-1 w-full' value={mealStyle[key].menu} name={`${key}.menu`} onChange={handleChange} placeholder='Menu' />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input className='border rounded-sm border-gray-400 h-10 px-1 w-full' value={mealStyle[key].quantity} name={`${key}.quantity`} onChange={handleChange} placeholder='Quntity' />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>

            {/* <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>V. 24HR FOOD RECALL</h1> */}
            <h1 className='my-4 text-gray-600'>FOOD FREQUENCY : (Kindly tick the respective boxes based on your dietary habits) </h1>
            <div className='mt-2'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gray-300'>
                            <TableCell align="left" className='font-semibold text-xl'>Food groups</TableCell>
                            <TableCell align="left">Daily </TableCell>
                            <TableCell align="left">Frequently</TableCell>
                            <TableCell align="left">Once a week </TableCell>
                            <TableCell align="left">Once a month </TableCell>
                            <TableCell align="left">Occasionally </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='border'>
                        {
                            Object.keys(foodFrequency).map((key, index) => {
                                return (
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <p>
                                                {foodFrequency[key].label}
                                            </p>
                                        </TableCell>

                                        <TableCell align="left">
                                            <input type="checkbox" value='daily' checked={foodFrequency[key].daily} onChange={handleCheckFoodFrequency} name={key} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="checkbox" value='Frequently' checked={foodFrequency[key].Frequently} onChange={handleCheckFoodFrequency} name={key} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="checkbox" value='OnceaWeek' checked={foodFrequency[key].OnceaWeek} onChange={handleCheckFoodFrequency} name={key} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="checkbox" value='OnceaMonth' checked={foodFrequency[key].OnceaMonth} onChange={handleCheckFoodFrequency} name={key} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input type="checkbox" value='Occasionally' checked={foodFrequency[key].Occasionally} onChange={handleCheckFoodFrequency} name={key} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <button className='bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-3 hover:shadow-md hover:bg-blue-600 cursor-pointer' onClick={handleSaveRecall}>Save Food Recall</button>
        </div>
    )
}

export default FoodRecall



