import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify'
import { saveLifestyle } from '../../../http/api'
import { useAppSelector } from '../../../store/hook';

interface LifestyleProps {
    DietPreference: string
    FoodAllergies: string
    FoodIntolerances: string
    DailyWaterIntake: string
    OutsideFoodConsumption: string
    SocialHabit: string
    DailyActivity: string
    SleepingHours: string
    TraningSchedule: any[]
    totalHourss: {
        Monday: string,
        Tuesday: string,
        Wednesday: string,
        Thursday: string,
        Friday: string,
        Saturday: string,
        Sunday: string
    }
    Other: string,
    Client: string
}

interface TableRow {
    time: string;
    days: string[];
}

interface TotalHrs {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: ''
}

const FoodLifeStyle = () => {

    const { token, user } = useAppSelector(state => state.auth)

    const client = user._id

    const [foodLifeStyle, setFoodLifeStyle] = React.useState<LifestyleProps>({
        DietPreference: '',
        FoodAllergies: '',
        FoodIntolerances: '',
        DailyWaterIntake: '',
        OutsideFoodConsumption: '',
        DailyActivity: '',
        SocialHabit: '',
        SleepingHours: '',
        TraningSchedule: [] as any,
        Other: '',
        totalHourss: {
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: ''
        },
        Client: client
    })

    // create array for timon
    const [trainingSchedule, setTrainingSchedule] = React.useState<TableRow[]>([
        { time: '', days: ['', '', '', '', '', '', ''] }
    ])

    const [totalHours, setTotalHours] = React.useState<TotalHrs>({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: ''
    })

    // handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        rowIndex: number,
        dayIndex: number
    ) => {
        const { value } = e.target;
        const updatedTableData = [...trainingSchedule];
        updatedTableData[rowIndex].days[dayIndex] = value;
        setTrainingSchedule(updatedTableData);
        // set the update setTrainingSchedule to the foodLifeStyle
        setFoodLifeStyle({
            ...foodLifeStyle,
            TraningSchedule: updatedTableData
        })
    };

    // add new row
    const handleAddRow = () => {
        const newRow: TableRow = { time: '', days: ['', '', '', '', '', '', ''] }; // initially empty data for each day
        setTrainingSchedule([...trainingSchedule, newRow]);
    };

    // remove row
    const handleRemoveRow = (rowIndex: number) => {
        const updatedTableData = [...trainingSchedule];
        // dont remove the last row
        if (updatedTableData.length === 1) {
            toast.error('Cannot remove the last row');
            return;
        }
        updatedTableData.splice(rowIndex, 1);
        setTrainingSchedule(updatedTableData);
    };


    const handleChangeHrs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTotalHours({
            ...totalHours,
            [name]: value
        })
        // set the update setTrainingSchedule to the foodLifeStyle
        setFoodLifeStyle({
            ...foodLifeStyle,
            totalHourss: totalHours
        })
    }

    // save the data to
    const saveLifestyleHabits = async () => {
        console.log({ foodLifeStyle })
        try {
            const { data } = await saveLifestyle(foodLifeStyle, token)
            console.log(data)
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

    }


    return (
        <div>
            {/* . FOOD & LIFESTYLE HABITS   */}
            <h1 className='text-gray-600 bg-gray-200 mt-4 py-2 px-2'>|V. FOOD & LIFESTYLE HABITS </h1>
            <div className='flex mr-4 mt-4'>
                <div className='flex w-full gap-2 justify-between'>
                    <div className='w-full'>
                        <label htmlFor="Preference" className='text-gray-600 text-[12px]'>Diet Preference</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' onChange={(e) => {
                            setFoodLifeStyle({
                                ...foodLifeStyle,
                                DietPreference: e.target.value
                            })
                        }}>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                            <option value="Ovo-vegetarian">Ovo-vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Jain">Jain</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="Water" className='text-gray-600 text-[12px]'>Daily Water Intake</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' onChange={(e) => {
                            setFoodLifeStyle({
                                ...foodLifeStyle,
                                DailyWaterIntake: e.target.value
                            })
                        }}>
                            <option value="<1L"> &lt; 1L </option>
                            <option value="Hypotension">2-4L</option>
                            <option value="None">&gt; 4L</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="BMI" className='text-gray-600 text-[12px]'>Outside Food consumption</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' onChange={(e) => {
                            setFoodLifeStyle({
                                ...foodLifeStyle,
                                OutsideFoodConsumption: e.target.value
                            })
                        }}>
                            <option value="Daily">Daily</option>
                            <option value="Twice a week">Twice a week</option>
                            <option value="Once a week">Once a week </option>
                            <option value="Occasionally">Occasionally</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                    {/* Gut Health */}
                    <div className='w-full'>
                        <label htmlFor="GutHealth" className='text-gray-600 text-[12px]'>Social Habits</label>
                        <select className='w-full border-2 border-gray-300 rounded-sm p-2' onChange={(e) => {
                            setFoodLifeStyle({
                                ...foodLifeStyle,
                                SocialHabit: e.target.value
                            })
                        }}>
                            <option value="Smoking">Smoking</option>
                            <option value="Alcohol">Alcohol</option>
                            <option value="Alcohol">Smoking + Alcohol </option>
                            <option value="None">None</option>
                            <option value="others">others</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* Food allergies */}
            <div className='flex mr-4 mt-5'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Food allergies</p>
                </div>
                <div className='w-full mr-20'>
                    <input type="text" value={foodLifeStyle.FoodAllergies} onChange={(e) => {
                        setFoodLifeStyle({
                            ...foodLifeStyle,
                            FoodAllergies: e.target.value
                        })
                    }} className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Food allergies' />
                </div>
            </div>
            {/* Food Intolerance / Sensitivity */}
            <div className='flex mr-4 mt-5'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Food Intolerance / Sensitivity</p>
                </div>
                <div className='w-full mr-20'>
                    <input type="text" value={foodLifeStyle.FoodIntolerances} onChange={(e) => {
                        setFoodLifeStyle({
                            ...foodLifeStyle,
                            FoodIntolerances: e.target.value
                        })
                    }}
                        className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Food Intolerance / Sensitivity' />
                </div>
            </div>

            {/* Sleeping Hours */}
            <div className='flex mr-4 mt-5'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Sleeping Hours</p>
                </div>
                <div className='w-full mr-20'>
                    <input type="text" value={foodLifeStyle.SleepingHours} onChange={(e) => {
                        setFoodLifeStyle({
                            ...foodLifeStyle,
                            SleepingHours: e.target.value
                        })
                    }} className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Sleeping Hour' />
                </div>
            </div>

            {/* Activity if any, */}
            <div className='flex mr-4 mt-5'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Activity if any,</p>
                </div>
                <div className='w-full mr-20'>
                    <input type="text" value={foodLifeStyle.DailyActivity} onChange={(e) => {
                        setFoodLifeStyle({
                            ...foodLifeStyle,
                            DailyActivity: e.target.value
                        })
                    }} className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Activity if any,' />
                </div>
            </div>


            {/* Training schedule for a week - Timings and duration of the training along with Rest days to be noted. */}
            <div className='mt-5'>
                <label htmlFor="Training schedule for a week - Timings and duration of the training along with Rest days to be noted." className='text-gray-600 '>Training schedule for a week - Timings and duration of the training along with Rest days to be noted.</label>
                <Table aria-label="simple table" className='mt-2'>
                    <TableHead>
                        <TableRow className='bg-gray-300'>
                            <TableCell align="left">Timings</TableCell>
                            <TableCell align="left">Monday</TableCell>
                            <TableCell align="left">Tuesday</TableCell>
                            <TableCell align="left">Wednesday</TableCell>
                            <TableCell align="left">Thrusday</TableCell>
                            <TableCell align="left">Friday</TableCell>
                            <TableCell align="left">Saturday</TableCell>
                            <TableCell align="left">Sunday</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='border'>
                        {
                            trainingSchedule && trainingSchedule.map((row, rowIndex) => {
                                return (
                                    <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <input type="time" className='border rounded-sm border-gray-400 h-10 px-1 w-full' value={row.time} onChange={(e: any) => {
                                                const { value } = e.target;
                                                const list = [...trainingSchedule];
                                                list[rowIndex].time = value;
                                                setTrainingSchedule(list);
                                            }}
                                                placeholder='Timing' />
                                        </TableCell>
                                        {
                                            row.days.map((item, dayIndex) => {
                                                return (
                                                    <TableCell align="left">
                                                        <input type="text" className='border rounded-sm border-gray-400 h-10 px-1 w-full' value={item} onChange={(e) => handleInputChange(e, rowIndex, dayIndex)} placeholder='Enter Hr' />
                                                    </TableCell>
                                                )
                                            })
                                        }
                                        <TableCell align="center">
                                            <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer hover:text-red-600 ' onClick={() => handleRemoveRow(rowIndex)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {/* total */}
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <p className='text-gray-500 font-semibold'>Total Hours</p>
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name='Monday' value={totalHours.Monday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Monday ' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name="Tuesday" value={totalHours.Tuesday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Tuesday ' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name='Wednesday' value={totalHours.Wednesday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Wednesday' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name="Thursday" value={totalHours.Thursday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Thrusday' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name='Friday' value={totalHours.Friday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Friday' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name='Saturday' value={totalHours.Saturday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Saturday' />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" name='Sunday' value={totalHours.Sunday} onChange={handleChangeHrs} className='border rounded-sm border-gray-400 h-10 px-1 w-full' placeholder='Total Hr in Sunday' />
                            </TableCell>
                        </TableRow>
                        <button className='px-4 py-2 bg-indigo-500 text-gray-50 rounded-sm ml-3' onClick={handleAddRow}>Add More</button>
                    </TableBody>
                </Table>
            </div>
            {/* end */}
            <div className='flex mr-4 mt-4'>
                <div className='w-96'>
                    <p className='text-[17px] text-gray-600'>Others / Remarks</p>
                </div>
                <div className='w-full ml-20'>
                    <textarea className='w-full border border-blue-300 h-16 p-1 rounded-sm' value={foodLifeStyle.Other} onChange={(e) => {
                        setFoodLifeStyle({
                            ...foodLifeStyle,
                            Other: e.target.value
                        })
                    }} placeholder='Write Family History...' />
                    {/* <input type="text" className='w-full border-2 border-gray-300 rounded-sm p-2' placeholder='Enter Client Contact Number' /> */}
                </div>
            </div>
            <button className='bg-blue-500 text-gray-100 px-10 py-3 rounded-sm mt-3 hover:shadow-md hover:bg-blue-600 cursor-pointer' onClick={saveLifestyleHabits}>Save Lifestyle Habits</button>
        </div>
    )
}

export default FoodLifeStyle