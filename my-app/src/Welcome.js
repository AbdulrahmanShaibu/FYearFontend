import CopyrightFooter from "./Footer";
import Home from "./Home";
import { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";



const Welcome = () => {

    const cardCss = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        // backgroundColor: 'green',
        color: 'black',
        fontWeight: 'bold',
        margin: '20px',
        height: '100px',
        width: '550px',
        fontSize: '20px'
    };

    const CardContainer = {
        display: 'flex',
        // justifyContent: 'space-between',
        margin: 'auto',
        width: '950px',
        height: '100px',
        // backgroundColor: 'white'
        backgroundColor: 'lightBlue',
    }

    const tableHeading = {
        color: 'white',
        fontWeight: 'bolder',
        backgroundColor: 'black'
    }

    const countAPI = 'http://localhost:8080/api/v1/count/department';
    const countCleaners = 'http://localhost:8080/api/v1/count/cleaners';
    const countClaims = 'http://localhost:8080/api/v1/count/claims';
    const countStaffs = 'http://localhost:8080/api/v1/staffs/count';
    const countTools = 'http://localhost:8080/api/v1/count/tools';
    const countSupervisors = 'http://localhost:8080/api/v1/count/supervisors';
    const countTasks = 'http://localhost:8080/api/v1/count/tasks';

    const [count, setCount] = useState(0);
    const [cleaners_count, setCleanersCount] = useState(0);
    const [claims_count, setClaimsCount] = useState(0);
    const [staffs_count, setStaffsCount] = useState(0);
    const [tools_count, setToolsCount] = useState(0);
    const [supervisorss_count, setSupervisorsCount] = useState(0);
    const [tasks_count, setTasksCount] = useState(0);

    // const total_claims = { claims_count } + { staffs_count }


    useEffect(() => {
        axios.get(countAPI)
            .then(response => {
                console.log('Count API Response:', response.data);
                console.log('Type of response.data:', typeof response.data);
                setCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countCleaners)
            .then(response => {
                console.log('Count Cleaner API Response:', response.data)
                setCleanersCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countClaims)
            .then(response => {
                console.log('Count Cleaner API Response:', response.data)
                setClaimsCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countStaffs)
            .then(response => {
                console.log('Count Staffs API Response:', response.data)
                setStaffsCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countTools)
            .then(response => {
                console.log('Count Cleaner API Response:', response.data)
                setToolsCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countSupervisors)
            .then(response => {
                console.log('Count Cleaner API Response:', response.data)
                setSupervisorsCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });

        axios.get(countTasks)
            .then(response => {
                console.log('Count Cleaner API Response:', response.data)
                setTasksCount(response.data);
            })
            .catch(error => {
                console.log('Error while counting data', error);
            });
    }, []);


    return (
        <div style={{ backgroundColor: 'white smoke', width: '100%' }}>
            <Home />
            <div style={{
                display: 'block',
                margin: 'auto',
                marginTop: '150px',
                // backgroundColor: 'green',
                width: '950px'
            }}>
                <div style={CardContainer}>

                    <div className="card" style={cardCss}>
                        Cleaners:0{cleaners_count}
                    </div>


                    <div className="card" style={cardCss}>
                        Departments: {count}
                    </div>


                    <div className="card" style={cardCss}>
                        Total Claims:{claims_count}
                    </div>

                    <div className="card" style={cardCss}>
                        Total Staffs:0{staffs_count}
                    </div>
                </div>

            </div>
            {/* <hr/> */}
            <TableContainer style={{
                // backgroundColor: 'red',
                margin: 'auto',
                marginTop: '80px',
                width: '60%'
            }}>
                <h2 style={
                    {
                        fontSize: '24px',
                        color: '#333',
                        backgroundColor: '#f5f5f5',
                        padding: '10px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: 'bolder'
                        // marginTop: '100px'
                    }
                }>Details List</h2>
                <Table>

                    <TableRow >
                        <TableCell style={{ ...tableHeading }}>Available Cleaners</TableCell>
                        <TableCell style={{ ...tableHeading }}>Registered Departments</TableCell>
                        <TableCell style={{ ...tableHeading }}>Submitted Claims</TableCell>
                        <TableCell style={{ ...tableHeading }}>Assigned Tasks</TableCell>
                        <TableCell style={{ ...tableHeading }}>All Tools</TableCell>
                        <TableCell style={{ ...tableHeading }}>Available Supervisors</TableCell>
                        {/* <TableCell>Status</TableCell> */}
                    </TableRow>


                    <TableBody>

                        <TableRow>
                            <TableCell>{cleaners_count}</TableCell>
                            <TableCell>{count}</TableCell>
                            <TableCell>
                                {/* available staffs:{staffs_count}<br /> */}
                                reported claims:{claims_count}
                            </TableCell>
                            <TableCell>{tasks_count}</TableCell>
                            <TableCell>{tools_count}</TableCell>
                            <TableCell>{supervisorss_count}</TableCell>
                            {/* <TableCell>present</TableCell> */}
                        </TableRow>

                    </TableBody>
                </Table>

                <div style={{ textAlign: 'center' }}>
                    <Link to="/generated_report">
                        <button style={{
                            fontWeight: 'bold',
                            backgroundColor: '#1976d2',
                            padding: '10px 20px', // Adjust padding for better button size
                            borderRadius: '5px', // Adds rounded corners
                            border: 'none', // Removes default border
                            cursor: 'pointer', // Adds pointer cursor on hover
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Adds slight shadow for depth
                            marginTop: '45px'

                        }}>Generate Report</button>
                    </Link>
                </div>
                {/* </div> */}

            </TableContainer>

            <br /> <br />
            <CopyrightFooter />
        </div>
    );
}
export default Welcome;