import React, { useState, useEffect } from 'react';


const SessionTimeout = ({ timeoutInMinutes }) => {
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => setLogout(true), timeoutInMinutes * 60 * 1000); // Timeout in milliseconds
        };

        const events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];

        const resetHandler = () => {
            resetTimer();
        };

        for (let event of events) {
            window.addEventListener(event, resetHandler);
        }

        resetTimer();

        return () => {
            for (let event of events) {
                window.removeEventListener(event, resetHandler);
            }
            clearTimeout(timeout);
        };
    }, [timeoutInMinutes]);

    useEffect(() => {
        if (logout) {

            alert('Session timed out. Logging out...');
            <div style={{
                backgroundColor: 'red',
                fontSize: '30px'
            }}>Logging out...</div>
            console.log("Session timed out. Logging out...");
            window.location.href = '/register'; // Redirect to logout route
        }
    }, [logout]);

    return <div>Session Timeout Component</div>;
};

export default SessionTimeout;
