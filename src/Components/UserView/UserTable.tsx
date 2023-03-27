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
import { Link } from 'react-router-dom';

interface Iuser {
    _id: string;
    name: string;
    email: string;
    phone: Number;
    password: string;
    dob: Date;
    referal_code: string;
    planType: string;
    measurement: {
        height: number;
        weight: number;
    };
    // bca: mongoose.Schema.Types.ObjectId;
    isPaid: boolean;
    isVerified: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    otp: Number
    oldOtp: Number
}

const UserTable = ({ allUser }: any) => {

    const [isLoading, setIsloading] = React.useState(false)



    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Email</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Payment Status</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>Status</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>View </TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Edit</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Delete</TableCell>
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
                                            >
                                                <TableCell align="left">{row?.name}</TableCell>
                                                <TableCell align="left">{(row as any)?.phone}</TableCell>
                                                <TableCell align="left">{row?.email}</TableCell>
                                                <TableCell align="left">{row?.isPaid ? <div className='flex items-center gap-2'><div className='h-3 w-3 bg-green-500 rounded-full' />Paid</div> : <div className='flex items-center gap-2'><div className='h-3 w-3 bg-orange-500 rounded-full' /> Unpaid</div>}</TableCell>
                                                <TableCell align="left">{row?.isBlocked ? <div className='flex items-center gap-2'><div className='h-3 w-3 bg-green-500 rounded-full' />Active</div> : <div className='flex items-center gap-2'><div className='h-3 w-3 bg-orange-500 rounded-full' />Unactive</div>}</TableCell>

                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <Link to={`/user/${row?._id}`}>
                                                    <TableCell align="center">
                                                        <Button variant="outlined"> <RemoveRedEyeIcon />View</Button>
                                                    </TableCell>
                                                </Link>
                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="center">
                                                    <Button variant="outlined" ><EditIcon />Edit</Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant="outlined" color='error'><DeleteIcon />
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