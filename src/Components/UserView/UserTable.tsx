import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import { useAppSelector, useAppDispatch } from '../../store/hook'
import { deleteClientState } from '../../store/slices/deleteClientSlice'
import { deleteClient } from '../../http/api'
import { toast } from 'react-toastify'

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
    isSelected: boolean;
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

const UserTable = ({ allUser }: any) => {


    const [newAllUser, setNewAllUser] = React.useState<Iuser[]>([])

    React.useEffect(() => {
        // add isSeletect property to the allUser array
        const newAllUser = allUser.map((user: Iuser) => {
            return {
                ...user,
                isSelected: false
            }
        })
        setNewAllUser(newAllUser)
    }, [allUser])


    const { user, token } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()


    const [disableDelete, setDisableDelete] = React.useState(false)


    const router = useNavigate()
    const [isLoading, setIsloading] = React.useState(false)
    const [visiable, setVisiable] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    React.useEffect(() => {
        // find the 71 in the role array and restrict the delete button
        const index = user?.role.findIndex((role: number) => role === 71)
        if (index === -1) {
            setDisableDelete(true)
        }
    }, [isLoading, user])

    const handleEditProfile = (id: string) => {
        setVisiable(true)
        setUserId(id)
    }

    const handleDeleteClient = async (id: string) => {
        setIsloading(true)
        try {
            const res = await deleteClient(id, token)
            if (res.status === 200) {
                setIsloading(false)
                // dispatch the delete client
                dispatch(deleteClientState({ id, delete: false }))
                toast.success(res.data.message)
            }
        } catch (error: any) {
            setIsloading(false)
            toast.error(error.response.data.message)
        }
    }


    // create toggle function for select row
    const handleRowSelect = (e: any) => {
        const { checked } = e.target
        const newAllUser = allUser.map((user: Iuser) => {
            return {
                ...user,
                isSelected: checked
            }
        })
        setNewAllUser(newAllUser)
    }

    // selecte multiple column 
    const handleColumnSelect = (e: any, index: number) => {
        const { checked } = e.target
        const newAllUser = [...allUser]
        newAllUser[index].isSelected = checked
        setNewAllUser(newAllUser)
    }

    return (
        <div>
            {
                visiable && <EditProfile id={userId} setVisiable={setVisiable} />
            }
            <span className='text-sm text-gray-600'>Showing {allUser?.length} Records</span>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 1 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>
                                    <input type="checkbox" className='w-4 h-4' onClick={handleRowSelect} />
                                </TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>SN</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Email</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Payment Status</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Status of Nutritionist</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>View </TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Edit</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                newAllUser && newAllUser?.map((row: Iuser, index: number) => {
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                className={row.profileTimeline === 'init' ? 'bg-red-50' : 'bg-inherit'}
                                            >
                                                <TableCell align="left">
                                                    <input type="checkbox" onClick={(e: any) => handleColumnSelect(e, index)} className='w-4 h-4' checked={row.isSelected} />
                                                </TableCell>
                                                <TableCell align="left">{index + 1}</TableCell>
                                                <TableCell align="left">{row?.name || 'Lead'}</TableCell>
                                                <TableCell align="left">{(row as any)?.phone}</TableCell>
                                                <TableCell align="left">{row?.email || 'Lead'}</TableCell>
                                                <TableCell align="left">{row?.isPaid ? <div className='flex items-center gap-2'><div className='h-3 w-3 bg-green-500 rounded-full' />Paid</div> : <div className='flex items-center gap-2'><div className='h-3 w-3 bg-orange-500 rounded-full' /> Unpaid</div>}</TableCell>
                                                <TableCell align="left">{row?.nutritionist ? <div className='flex items-center gap-2'><div className='h-3 w-3 bg-green-500 rounded-full' />Assigned</div> : <div className='flex items-center gap-2'><div className='h-3 w-3 bg-orange-500 rounded-full' />Unassigned</div>}</TableCell>

                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="center">
                                                    <Button variant="outlined" onClick={() => {
                                                        router(`/user/${row._id}`)
                                                    }} disabled={row.profileTimeline === 'init' ? true : false} > <RemoveRedEyeIcon />View</Button>

                                                </TableCell>
                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="center">
                                                    <Button variant="outlined" disabled={disableDelete} onClick={() => handleEditProfile(row?._id)}><EditIcon />Edit</Button>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Button onClick={() => handleDeleteClient(row._id)} variant="outlined" sx={{ cursor: disableDelete ? 'not-allowed' : 'auto' }} color='error' disabled={disableDelete}><DeleteIcon />
                                                        {
                                                            isLoading ? <CircularProgress size={20} /> : 'Delete'
                                                        }
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default UserTable