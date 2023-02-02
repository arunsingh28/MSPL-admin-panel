import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import React from 'react';
import { Ischool, schoolDelete, schoolGetById } from '../http/api'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import errorSound from '../Assets/sounds/error-sound.mp3'
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


const EditSchoolTable = ({ allSchool }: any) => {

    const [playActive] = useSound(errorSound, { volume: 1 })

    const [schoolData] = React.useState(allSchool)

    // model
    const [deleteModal, setDeleteModal] = React.useState(false);

    const handleModalOpen = () => {
        playActive()
        setDeleteModal(true)
    };
    const handleModalClose = () => setDeleteModal(false);

    const [isloading, setisLoading] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const buttonEle = React.useRef(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (id: string) => {
        setisLoading(true)
        console.log('delete', id)
        schoolDelete(id).then((res) => {
            setisLoading(false)
            setDeleteModal(false)
        }).catch((err) => {
            setisLoading(false)
            setDeleteModal(false)
        })
    }
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
                                <TableCell align="center"  sx={{ fontWeight: '600', color: '#444' }}>View </TableCell>
                                <TableCell align="center" sx={{ fontWeight: '600', color: '#444' }}>Action</TableCell>
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
                                                key={row._id}
                                            >
                                                <TableCell align="left">{row.schoolName}</TableCell>
                                                <TableCell align="center">{row.schoolAddress.schoolCity}</TableCell>
                                                <TableCell align="center">{row.contestPerson.contactName}</TableCell>
                                                <TableCell align="left">{row.contestPerson.contactPhone}</TableCell>
                                                <TableCell align="left">{row.contestPerson.contactEmail}</TableCell>
                                                <TableCell align="center">
                                            
                                                            <Button id={row._id} variant="outlined" onClick={() => handleViewPage(row._id.toString())}>
                                                            <RemoveRedEyeIcon />
                                                                View</Button>
                                             
                                                </TableCell>
                                                {/* <TableCell align="center">{row.sports.isBadminton}</TableCell> */}
                                                <TableCell align="right">
                                                    <Button
                                                        key={index}
                                                        ref={buttonEle}
                                                        // id="action-button"
                                                        aria-controls={open ? 'action-button' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        variant="contained"
                                                        disableElevation
                                                        onClick={handleClick}
                                                        endIcon={<KeyboardArrowDownIcon />}
                                                        sx={{ paddingX: 3, paddingY: 1, background: '#1b356b' }}
                                                    >
                                                        Options
                                                        {/* {row._id} */}
                                                    </Button>
                                                    {
                                                        schoolData && schoolData.map((row: Ischool, index: number) => {
                                                            return(
                                                                <StyledMenu
                                                                // key={index}
                                                                // id="demo-customized-menu"
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'action-button',
                                                                }}
                                                                anchorEl={anchorEl}
                                                                open={open}
                                                                onClose={handleClose}
                                                            >
                                                                <MenuItem >
                                                                    <RemoveRedEyeIcon />
                                                                    <button id={row._id} value={row._id}>{row._id}</button>
                                                                </MenuItem>
                                                                <MenuItem id={row._id} onClick={handleClose} >
                                                                    <EditIcon />
                                                                    Edit
                                                                </MenuItem>
                                                                <MenuItem id={row._id} onClick={handleModalOpen} >
                                                                    <DeleteIcon />
                                                                    Delete
                                                                </MenuItem>
                                                                <Divider sx={{ my: 0.5 }} />
                                                                <MenuItem id={row._id} onClick={handleClose} >
                                                                    <ArchiveIcon />
                                                                    Deactivate
                                                                </MenuItem>
                                                            </StyledMenu>
                                                            )
                                                        })
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            {/* delete school warning model */}
                                            {
                                                deleteModal ? <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" align='center' variant="h6" sx={{ fontWeight: '600' }} component="h2">
                                                            Are You Sure ?
                                                        </Typography>
                                                        <div className='flex justify-around mt-5'>
                                                            <Button size='large' color='success' variant="outlined" sx={{ paddingX: 6 }} onClick={() => handleDelete(row._id)}>
                                                                {
                                                                    isloading ? <CircularProgress color='success' size={20} /> : 'YES'
                                                                }
                                                            </Button>
                                                            <Button size='large' color='error' variant="contained" sx={{ paddingX: 6 }} onClick={handleModalClose}>NO</Button>
                                                        </div>
                                                    </Box>
                                                </Modal> : null
                                            }
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