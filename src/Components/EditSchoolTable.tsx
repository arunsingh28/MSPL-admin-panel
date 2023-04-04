import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { Ischool, schoolDelete, schoolGetAll } from '../http/api'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import errorSound from '../Assets/sounds/error-sound.mp3'
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const EditSchoolTable = ({ allSchool }: any) => {

    const isMute = useSelector((state: any) => state.auth.user?.isMute.deleteNotification)
    const { token } = useSelector((state: any) => state.auth)

    const [playActive] = useSound(errorSound, { volume: 1 })

    const [schoolData, setAllSchool] = React.useState(allSchool)


    // const handleModalOpen = (id:string) => {
    //     alert(id)
    //     playActive() 
    // };

    const [isLoading, setIsloading] = React.useState(false)

    const handleDelete = (id: string) => {
        setIsloading(true)
        if (isMute === true) {
            playActive()
        }
        // eslint-disable-next-line no-restricted-globals
        const disicion = confirm('Are you sure ?')
        if (disicion === true) {
            schoolDelete(id, token).then((res: any) => {
                setIsloading(false)
                schoolGetAll(token).then((res: any) => {
                    setAllSchool(res.data.school)
                }).catch((err: any) => {
                    setIsloading(false)
                })
            }).catch((err: any) => {
                setIsloading(false)
            })
        } else {
            setIsloading(false)
            return
        }
    }

    React.useEffect(() => {
    }, [schoolData, allSchool, isLoading])

    const navigate = useNavigate();


    const handleViewPage = (id: string) => {
        return navigate(`/view-school/${id}`)
    }

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>School's Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>School's Address</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Contact Person</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>School's Phone</TableCell>
                                <TableCell align="left" sx={{ fontWeight: '600', color: '#444' }}>School's Email</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>View </TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Edit</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                schoolData && schoolData.map((row: Ischool, index: number) => {
                                    return (
                                        <>
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                            >
                                                <TableCell align="left">{row.schoolName}</TableCell>
                                                <TableCell align="center">{row.schoolAddress.schoolCity}</TableCell>
                                                <TableCell align="center">{row.contestPerson.contactName}</TableCell>
                                                <TableCell align="left">{row.contestPerson.contactPhone}</TableCell>
                                                <TableCell align="left">{row.contestPerson.contactEmail}</TableCell>

                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="center">
                                                    <Button variant="outlined" onClick={() => handleViewPage(row._id.toString())}>
                                                        <RemoveRedEyeIcon />View</Button>
                                                </TableCell>
                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="right">
                                                    <Button variant="outlined" ><EditIcon />Edit</Button>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant="outlined" color='error' onClick={() => handleDelete(row._id)}><DeleteIcon />
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

export default EditSchoolTable


