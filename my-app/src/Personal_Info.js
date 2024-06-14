import React, { useState, useEffect } from 'react';
import Home from "./UCMS/Home";
import './styles/event_form.css';
import { Button, Paper } from "@mui/material";
import { useLocation } from 'react-router-dom';

const FetchPersonalDetails = () => {

    // refer to RegistrationForm Component at line 99
    const location = useLocation();
    const { state } = location;
    const { firstname, email } = state || {};

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const currentDateTime = new Date().toLocaleString(); // Get the current date and time
            setCurrentTime(currentDateTime);
        };
        // Update the time immediately 
        updateTime();
    }, []); // Run only once on mount

    return (
        <div style={{ backgroundColor: 'rgb(100, 200, 200)' }}>
            <Home /><br /><br /><br />
            {/* <div className="ProfileHeading">My Profile</div> */}

            <Paper elevation={20} style={{ height: '90vh', backgroundColor: 'whitesmoke' }}>
                <div className="UserProfileContainer">
                    <div className="ImageProfile">
                        <img style={{
                            height: '130px',
                            width: '135px'
                        }} src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User Profile Image" />
                        {/* <div className="DetailLabel">Username:{firstname}</div> */}
                        {/* <div className="DetailLabel">Email:{email}</div> */}
                    </div>
                    <div className="UserProfileDetails">
                        <div><h5 style={{ fontWeight: 'bolder',
                         color: 'green',
                         justifyContent:'space-between'
                          }}>STATUS</h5>Joined few minutes ago</div>
                        <div>
                            <p style={{ color: 'black' }}>Current Time: {currentTime}</p>
                        </div>

                    </div>
                </div>
            </Paper>

        </div>
    );

}
export default FetchPersonalDetails;