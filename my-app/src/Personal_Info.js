import React, { useState, useEffect } from 'react';
import Home from "./Home";
import './styles/event_form.css';
import { Button } from "@mui/material";
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
        <div style={{ backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>
            <Home /><br /><br /><br />
            <div class="ProfileHeading">My Profile</div>
            <div class="UserProfileContainer">
                <div class="ImageProfile">
                    <img style={{
                        height: '130px',
                        width: '135px'
                    }} src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=" alt="User Profile Image" />
                </div>
                <div class="UserProfileDetails">

                    <div class="DetailLabel">Username:{firstname}</div>
                    {/* <div class="DetailValue">{firstname}</div> */}
                    <div class="DetailLabel">Email:{email}</div>
                    {/* <div class="DetailValue">{email}</div> */}
                    <div class="DetailLabel">Status:Joined few minutes ago</div>
                    {/* <div class="DetailValue">Few Minutes ago</div> */}
                    <div>
                        <p>Current Time: {currentTime}</p>
                    </div>

                </div>
            </div>

        </div>
    );

}
export default FetchPersonalDetails;