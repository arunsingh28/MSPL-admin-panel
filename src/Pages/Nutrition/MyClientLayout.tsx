import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../http/api'
import { useAppSelector } from '../../store/hook';
import Back from '../../Components/Back'
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import Chart from 'chart.js/auto'
import { Outlet, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Iuser {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    dob: Date;
    BMI: number;
    BMR: number;
    gender: string;
    referal_code: string;
    planType: string;
    measurement: {
        height: number;
        weight: number;
    };
    isPaid: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: Number
    oldOtp: Number
}

const MyClientTask = () => {
    const { token } = useAppSelector(state => state.auth)
    const location = useParams<{ id: any }>()

    const { id } = location

    const [clientData, setClientData] = React.useState<Iuser>()

    React.useEffect(() => {
        getUserById(id, token)
            .then(res => setClientData(res.data))
            .catch(err => console.log(err))
    }, [token, id])

    const chartRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        const myChartRef = new Chart(chartRef.current!, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        hoverBorderDashOffset(ctx, options) {
                            return 0;
                        },
                        label: 'Calories',
                        stack: 'Stack',
                        data: [1400, 800, 1200, 800, 871, 600, 900],
                        fill: false,
                        backgroundColor: '#4f4fef',
                        borderColor: '#5f5ff9',
                    }
                ]
            }
        })
        return () => {
            myChartRef.destroy()
        }
    }, [])

    const [selected, setSelected] = React.useState({
        meal: true,
        traker: false,
        notes: false,
        assisment: false
    })

    return (
        <div className='overflow-hidden'>
            <h1 className='text-3xl font-semibold text-[#0d0d25]'>{clientData?.name.toLocaleUpperCase()}</h1>
            <div className='mt-5'>
                <div className='flex gap-3 text-gray-700'>
                    <Link to="meal-planner" className="cursor-pointer" onClick={() => {
                        setSelected({ meal: true, traker: false, notes: false, assisment: false })
                    }}><h1 className={!selected.meal ? 'text-sm font-semibold text-gray-500 cursor-pointer hover:text-gray-700 hover:border-b-2 hover:border-green-500' : 'border-b-2 cursor-pointer border-green-500 text-sm font-semibold'}>Meal Planner</h1></Link>
                    <Link to={`progress-tracker`} className="cursor-pointer" onClick={() => {
                        setSelected({ meal: false, traker: true, notes: false, assisment: false })
                    }}><h1 className={!selected.traker ? 'text-sm font-semibold text-gray-500 cursor-pointer hover:text-gray-700 hover:border-b-2 hover:border-green-500' : 'border-b-2 border-green-500 cursor-pointer text-sm font-semibold'}>Progress Tracker</h1></Link>
                    <Link to={`notes`} className="cursor-pointer" onClick={() => {
                        setSelected({ meal: false, traker: false, notes: true, assisment: false })
                    }}><h1 className={!selected.notes ? 'text-sm font-semibold text-gray-500 cursor-pointer hover:text-gray-700 hover:border-b-2 hover:border-green-500' : 'border-b-2 cursor-pointer border-green-500 text-sm font-semibold'}>Notes</h1></Link>
                    <Link to={`assisment-form`} className="cursor-pointer" onClick={() => {
                        setSelected({ meal: false, traker: false, notes: false, assisment: true })
                    }}><h1 className={!selected.assisment ? 'text-sm font-semibold text-gray-500 cursor-pointer hover:text-gray-700 hover:border-b-2 hover:border-green-500' : 'border-b-2 border-green-500 text-sm  cursor-pointer font-semibold'}>Assisment Form</h1></Link>
                </div>
            </div>
            {/* weeks  its hidden*/}
            <div className='w-full mt-2 hidden'>
                <div className='flex overflow-auto'>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <FileDownloadDoneOutlinedIcon sx={{ color: '#1abc22' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 1</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <FileDownloadDoneOutlinedIcon sx={{ color: '#1abc22' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 2</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <FileDownloadDoneOutlinedIcon sx={{ color: '#1abc22' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 3</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <FileDownloadDoneOutlinedIcon sx={{ color: '#1abc22' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 4</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <FileDownloadDoneOutlinedIcon sx={{ color: '#1abc22' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 5</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <HourglassEmptyOutlinedIcon sx={{ color: '#f9891a' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 6</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                    <div className='h-16 border w-32 flex flex-col items-center justify-center'>
                        <h1 className='text-gray-700'>
                            <HourglassEmptyOutlinedIcon sx={{ color: '#f9891a' }} fontSize="small" />
                            <span className='font-semibold text-sm text-gray-600'> Week 7</span>
                        </h1>
                        <p className='text-[10px] text-gray-500'>MAR 14 - MAR 20</p>
                    </div>
                </div>
            </div>
            {/* <canvas ref={chartRef} /> */}
            {/* chart */}
            <div className='mt-5'>
                <Outlet />
            </div>
        </div >
    )
}

export default MyClientTask