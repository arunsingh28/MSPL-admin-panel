import React from 'react'
import {Modal,Box} from '@mui/material'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
 };


const PermissionTable = ({openState,handleState}:any) => {
    return (
        <div>
            <Modal
                open={openState}
                onClose={handleState}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <h2 id="modal-modal-title" className='text-2xl font-semibold'>Permission Codes</h2>
                    <table className='border w-full my-5'>
                        <thead className='border'>
                            <tr className='border bg-gray-100 text-start'>
                                <th>Permission Code</th>
                                <th>Permission Name</th>
                            </tr>
                        </thead>
                        <tbody className='border text-center'>
                            <tr className='border'>
                                <td>99</td>
                                <td>Home in Menu*</td>
                            </tr>
                            <tr className='border'>
                                <td>101</td>
                                <td>School Circle</td>
                            </tr>
                            <tr className='border'>
                                <td>101 + 1011</td>
                                <td>School Circle + Modify Opration + View Oprataion</td>
                            </tr>
                            <tr className='border'>
                                <td>101 + 1012</td>
                                <td>School Circle + Create Opration</td>
                            </tr>
                            <tr className='border'>
                                <td>901</td>
                                <td>Core Circle</td>
                            </tr>
                            <tr className='border'>
                                <td>901 + 902</td>
                                <td>Core Circle + Create New Account + Configration</td>
                            </tr>
                            <tr className='border'>
                                <td>901 + 903</td>
                                <td>Core Circle + View Other Accounts</td>
                            </tr>
                            <tr className='border'>
                                <td>901 + 904</td>
                                <td>Core Circle + Modify Account Configration</td>
                            </tr>
                            <tr className='border'>
                                <td>102</td>
                                <td>Gym Circle</td>
                            </tr>
                            <tr className='border'>
                                <td>102 + 1022</td>
                                <td>Gym Circle + Create Opration</td>
                            </tr>
                            <tr className='border'>
                                <td>102 + 1023</td>
                                <td>Gym Circle + Modify Opration</td>
                            </tr>
                            <tr className='border'>
                                <td>100</td>
                                <td>Academy Circle</td>
                            </tr>
                            <tr className='border'>
                                <td>100 + 1014</td>
                                <td>Academy Circle + Create Opration</td>
                            </tr>
                            <tr className='border'>
                                <td>100 + 1015 </td>
                                <td>Academy Circle + Modify Opration</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Modal>
        </div>
    )
}

export default PermissionTable