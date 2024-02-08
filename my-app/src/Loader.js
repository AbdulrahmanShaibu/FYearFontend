import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RegistrationForm from './RegistrationForm';
import FirstView from './FirstView';
import Start from './Start';

function CircularProgressWithLabel(props) {
    return (
    
        <Box sx={{ position: 'relative', display: 'inline-flex', width: '600px' }}>
            {/* <CircularProgress variant="determinate" {...props} /> */}
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary" style={{
                    width: '500px',
                    fontSize: '30px'
                }}>
                    {`${Math.round(props.value)}%`}<b style={{
                        color: 'green'
                    }}></b>
                </Typography>
            </Box>
        </Box>
    );
}

function CircularWithValueLabel() {
    const [progress, setProgress] = useState(5);
    const [showAnotherPage, setShowAnotherPage] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 500);

        // After a certain time, you can show AnotherPageComponent
        setTimeout(() => {
            clearInterval(timer);
            setShowAnotherPage(true);
        }, 5000); // Change the delay as needed

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            {showAnotherPage ? (
                <Start />
                // <RegistrationForm/>
            ) : (
                <CircularProgressWithLabel value={progress} />
            )}
        </div>
    );
}

export default CircularWithValueLabel;
