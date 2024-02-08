import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import { Button } from '@mui/material';
//import './styles/news.css'

const NewsDetails = () => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showNotification = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const showSuccessNotification = () => {
        const currentDateTime = new Date().toLocaleString(); // Get the current date and time
        const message = `No news available now - ${currentDateTime}`;
        showNotification(message, 'info');
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>
            <div style={{
                height: '51px',
                backgroundColor: 'lightBlue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2em',
                fontWeight: 'bold',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
                News and Updates Information
            </div>
            <br />
            <div style={{
                height: '50px',
                width: '500px',
                margin: 'auto',
                backgroundColor: 'lightGrey',
                textAlign: 'center',
                lineHeight: '50px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
                No New Updates Release
            </div>
            <br />

            <div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>

                <Button
                    onClick={showSuccessNotification}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: 'auto'
                    }}
                >
                    <span role="img" aria-label="calendar" style={{ marginRight: '5px' }}>
                        📅
                    </span>
                    Check for New Updates
                </Button>
            </div>
        </div>
    );
}

export default NewsDetails;
