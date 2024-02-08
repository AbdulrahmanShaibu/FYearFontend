import React from 'react';
import './styles/Documentation.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SystemDocumentation = () => {
    return (
        <div className="documentation-container">
            <div className="documentation">
                <h2 className='title'>University Cleaners Management System</h2><br/>
                <p className='description'>
                    Welcome to the University Cleaners Management System. 
                    This system is designed to streamline the management of cleaning staff, schedules, and tasks within a university campus.
                </p>
                <h3>System Architecture</h3>
                <p className='description'>
                    The system employs a client-server architecture with a frontend developed in React and a backend implemented 
                    wein Springboot, utilizing a MySql database for the system data storage.
                </p>
                <h3 className='section-heading '>System Functionality</h3>
                <ul>
                    <li>Tools Management</li>
                    <li>Cleaners Management</li>
                    <li>Tasks Assignment</li>
                    <li>Schedule Management</li>
                    <li>Reporting Claims</li>
                </ul>
                <h3 className='section-heading '>Deployment</h3>
                <p>
                    The system can be deployed on various cloud platforms such as AWS, Azure, or Google Cloud Platform, utilizing Docker containers for scalability.
                </p>
                <h3 className='section-heading '>Conclusion</h3>
                <p className='description'>
                    The University Cleaners Management System provides a comprehensive 
                    solution for managing cleaning operations in a university campus environment, optimizing staff management, task assignment, scheduling, and reporting functionalities.
                </p>
                <Link to='/home' style={{ marginLeft: '320px' }}><ArrowBackIcon /></Link>
            </div>
        </div>
    );
};

export default SystemDocumentation;
