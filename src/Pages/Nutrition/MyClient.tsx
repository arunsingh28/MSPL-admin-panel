import React from 'react'
import Back from '../../Components/Back'
import { fetchMyClient } from '../../http/api'
import { ParentCompProps } from '../Dashboard'
import { useAppSelector } from '../../store/hook'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditProfile from '../../Components/UserView/EditProfile';
import { useNavigate } from 'react-router-dom'


export interface Iuser {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    profileTimeline: string;
    dob: Date;
    referal_code: string;
    planType: string;
    measurement: {
        height: number;
        weight: number;
    };
    nutritionist: string,
    isPaid: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: Number
    oldOtp: Number
}

const MyClient = ({ title, content }: ParentCompProps) => {

    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])


    const { user, token } = useAppSelector(state => state.auth)

    const [allUser, setAllUser] = React.useState<Iuser[] | null>(null)

    React.useEffect(() => {
        fetchMyClient(user._id, token)
            .then(res => {
                console.log(res.data)
                setAllUser(res.data.myClient)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [disableDelete, setDisableDelete] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [visiable, setVisiable] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    const navigate = useNavigate()

    const handleEditProfile = (id: string) => {
        setVisiable(true)
        setUserId(id)
    }

    const date = () => {
        const d = new Date()
        const month = d.getMonth() + 1
        const date = d.getDate()
        const year = d.getFullYear()
        return `${date}/${month}/${year}`
    }

    return (
        <div>
            <Back />
            <h1 className='text-2xl text-gray-800 font-semibold pb-2'>My Client</h1>
            <div className=''>
                {
                    visiable && <EditProfile id={userId} setVisiable={setVisiable} />
                }
                <span className='text-sm text-gray-600'>Showing {allUser?.length} Records</span>
                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 1 }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>SN</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Name</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Diet Status</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Last Assist</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Next Assist</TableCell>
                                    {/* <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}></TableCell> */}
                                    <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>View </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Edit</TableCell>
                                    {/* <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Delete</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    allUser && allUser?.map((row: Iuser, index: number) => {
                                        return (
                                            <>
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}
                                                    className={row.profileTimeline === 'init' ? 'bg-red-50' : 'bg-inherit'}
                                                >
                                                    <TableCell align="left">{index + 1}</TableCell>
                                                    <TableCell align="left">{row?.name || 'Lead'}</TableCell>
                                                    {/* <TableCell align="left">{(row as any)?.phone}</TableCell> */}
                                                    <TableCell align="left">{row?.isPaid ? <div className='flex items-center gap-2'><div className='h-3 w-3 bg-green-500 rounded-full' />Given</div> : <div className='flex items-center gap-2'><div className='h-3 w-3 bg-orange-500 rounded-full' /> Pending</div>}</TableCell>
                                                    <TableCell align="left">{date()}</TableCell>
                                                    <TableCell align="left">{date()}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="outlined" onClick={() => {
                                                            navigate(`/my-client/${row?._id}/meal-planner`)
                                                        }} disabled={row.profileTimeline === 'init' ? true : false} > <RemoveRedEyeIcon />View</Button>

                                                    </TableCell>
                                                    {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                    <TableCell align="center">
                                                        <Button variant="outlined" disabled={disableDelete} onClick={() => handleEditProfile(row?._id)}><EditIcon />Edit</Button>
                                                    </TableCell>

                                                    {/* <TableCell align="center">
                                                        <Button variant="outlined" sx={{ cursor: disableDelete ? 'not-allowed' : 'auto' }} color='error' disabled={disableDelete}><DeleteIcon />
                                                            {
                                                                isLoading ? <CircularProgress size={20} /> : 'Delete'
                                                            }
                                                        </Button>
                                                    </TableCell> */}
                                                </TableRow>
                                            </>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    )
}

export default MyClient



