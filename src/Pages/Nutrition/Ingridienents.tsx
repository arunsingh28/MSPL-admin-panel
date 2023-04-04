import React from 'react'
import FileUploader from '../../Components/FileUploader'
import { ParentCompProps } from '../Dashboard'
import { createIngridient } from '../../http/api'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import Back from '../../Components/Back'
import { useAppSelector } from '../../store/hook';

const Ingridienents = ({ title, content }: ParentCompProps) => {
    const { token } = useAppSelector(state => state.auth)
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    interface Ingridient {
        name: string,
        protein: string,
        carbs: string,
        fat: string,
        calories: string,
        quantity: string,
        unit: string,
    }

    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsLoading] = React.useState(false)

    const [ingridient, setIngridient] = React.useState<Ingridient>({
        name: '',
        protein: '',
        carbs: '',
        fat: '',
        calories: '',
        quantity: '',
        unit: '',
    })

    const handleChange = (event: SelectChangeEvent) => {
        setIngridient({ ...ingridient, unit: event.target.value as string });
    }

    React.useEffect(() => {
        if (ingridient.name !== '' && ingridient.protein !== '' && ingridient.carbs !== '' && ingridient.fat !== '' && ingridient.calories !== '' &&
            ingridient.quantity !== '' && ingridient.unit !== '') {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [ingridient])

    const handleCreate = () => {
        setIsLoading(true)
        if (ingridient.name === '' || ingridient.protein === '' || ingridient.carbs === '' || ingridient.fat === '' || ingridient.calories === '' ||
            ingridient.quantity === '' || ingridient.unit === '') {
            toast.error('Please fill all the details')
        }
        else {
            createIngridient(ingridient, token).then(res => {
                toast.success(res.data.message)
                setIngridient({
                    name: '',
                    protein: '',
                    carbs: '',
                    fat: '',
                    calories: '',
                    quantity: '',
                    unit: '',
                })
                // stop loading
                setIsLoading(false)
            }).catch(err => {
                console.log('err', err)
                toast.error('Something went wrong')
                // stop loading
                setIsLoading(false)
            }).finally(() => {
                // stop loading
                setIsLoading(false)
            })
        }
    }
    return (
        <div>
            <Back />
            <p className='text-2xl text-gray-700 font-semibold mb-4'>Create Ingridienents</p>
            <FileUploader type={"ingridienents"} />
            <div className='flex justify-center'>
                <div className="mt-6 grid grid-cols-3 w-1/3 justify-center items-center text-gray-400">
                    <hr className='border-gray-400' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-gray-400' />
                </div>
            </div>
            {/* single ingridient */}
            <h2 className='text-gray-700 text-md font-semibold'>Save ingridienent manually</h2>
            <div className='mt-5 flex gap-4'>
                <TextField type="text"
                    label="Ingridienent Name" variant="outlined"
                    value={ingridient.name}
                    onChange={(e) => setIngridient({ ...ingridient, name: e.target.value })}
                    placeholder='Enter Ingridienent Name' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ingridient.unit}
                        label="Unit"
                        onChange={handleChange}
                    >
                        <MenuItem value={"gram"}>Gram (Solid)</MenuItem>
                        <MenuItem value={"milliliter"}>Milliliter (Liquid)</MenuItem>
                        {/* <MenuItem value={30}>Day</MenuItem> */}
                    </Select>
                </FormControl>
            </div>
            <div className='mt-5 flex gap-4'>
                <TextField type="number"
                    label="Ingridienent's Quantity" variant="outlined"
                    value={ingridient.quantity}
                    onChange={(e) => setIngridient({ ...ingridient, quantity: e.target.value })}
                    placeholder='Quantity example 100' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />

                <TextField type="number"
                    label="Ingridienent's Carb" variant="outlined"
                    value={ingridient.carbs}
                    onChange={(e) => setIngridient({ ...ingridient, carbs: e.target.value })}
                    placeholder='Carb' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            <div className='mt-5 flex gap-4'>
                <TextField type="number"
                    label="Ingridienent's Fat" variant="outlined"
                    value={ingridient.fat}
                    onChange={(e) => setIngridient({ ...ingridient, fat: e.target.value })}
                    placeholder='Fat' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
                <TextField type="number"
                    label="Ingridienent's Calories" variant="outlined"
                    value={ingridient.calories}
                    onChange={(e) => setIngridient({ ...ingridient, calories: e.target.value })}
                    placeholder='Calories' className='w-full border h-12 rounded-md px-2 text-gray-700 mt-1' />
            </div>
            <div className='mt-5 flex gap-4'>
                <TextField type="number"
                    label="Ingridienent's Protein" variant="outlined"
                    value={ingridient.protein}
                    onChange={(e) => setIngridient({ ...ingridient, protein: e.target.value })}
                    placeholder='Protein' className='border h-12 rounded-md px-2 text-gray-700 mt-1 flex-1' />
                {/* save btn */}
                <div className='flex-1' />
            </div>
            <div className='mt-8'>
                <Button size='medium' sx={{ paddingX: 7, paddingY: 1.8, background: '#1b356b' }}
                    variant="contained" disabled={disable} className='flex-1' onClick={handleCreate}><SaveIcon className='mr-2' />
                    {
                        isLoading ? <CircularProgress size={20} color="inherit" /> : 'save'
                    }
                </Button>
            </div>
        </div>
    )
}

export default Ingridienents