import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
    setting:{
        visible:boolean,
        message:string
        type: 'error' | 'info' | 'success' | 'warning' | any
    }
}

const Notification = ({setting}:Props) => {
    console.log({setting})
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = React.useState(setting.visible);

    React.useEffect(() => {
        setOpen(setting.visible)
    },[setting.visible])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (

        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={setting.type} sx={{ width: '100%' }}>
                   {setting.message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default Notification