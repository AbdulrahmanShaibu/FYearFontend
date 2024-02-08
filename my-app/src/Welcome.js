import CopyrightFooter from "./Footer";
import Home from "./Home";
import { useState } from 'react';
import { Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";


const Welcome = () => {

    const cardCss = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        // backgroundColor: 'green',
        color: 'black',
        margin: '20px',
        height: '100px',
        width: '500px',
    };

    const CardContainer = {
        display: 'flex',
        // justifyContent: 'space-between',
        margin: 'auto',
        width: '950px',
        height: '100px',
        // backgroundColor: 'white'
        backgroundColor: 'green',
    }

    return (
        <div style={{ backgroundColor: 'rgb(100, 200, 200)' }}>
            <Home />
            <div style={{
                display: 'block',
                margin: 'auto',
                marginTop: '150px',
                // backgroundColor: 'green',
                width: '950px'
            }}>
                <div style={CardContainer}>
                    <div className="card" style={cardCss}>Events</div>
                    <div className="card" style={cardCss}>Users</div>
                    <div className="card" style={cardCss}>Venues</div>
                    <div className="card" style={cardCss}>Organisers</div>
                </div>

            </div>
            {/* <hr/> */}
            <TableContainer component={Paper} style={{
                // backgroundColor: 'red',
                margin: 'auto',
                marginTop: '80px',
                width: '700px'
            }}>
                <h2 style={
                    {
                        fontSize: '24px',
                        color: '#333',
                        backgroundColor: '#f5f5f5',
                        padding: '10px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        width: '700px',
                        // marginTop: '100px'
                    }
                }>Events List</h2>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ color: 'red', fontWeight: '50px' }}>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>New Column</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        <TableRow>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>present</TableCell>
                            <TableCell>present</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>data</TableCell>
                            <TableCell>present</TableCell>
                            <TableCell>present</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>


                {/* <div style={{ backgroundColor: 'red', width: '50px' }}> */}
                <Link to={'/generated_report'}>
                    <button style={{
                        textAlign: 'center',
                        marginLeft: '270px'

                    }}>Generate Report</button>
                </Link>
                {/* </div> */}

            </TableContainer>

            <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <CopyrightFooter />
        </div>
    );
}
export default Welcome;