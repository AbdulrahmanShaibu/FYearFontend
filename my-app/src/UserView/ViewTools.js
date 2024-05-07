import React from "react";
import Home from "../Home";
import { useState } from 'react';
import {  Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const ViewTools = () => {

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        // These data will be replaced with API from backed
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

   

    const changeColor = {
        color: 'red',
        backgroundColor: 'rgba(73, 161, 157, 0.3)' // Adjust the alpha (opacity) value as needed
    };

    const Bold = {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'green'
    }

    return (
        <div style={{ ...changeColor }}>

            <Home />

            <div className="formWithContents" style={{
               width:'80%',
                padding: '250px',
                margin:'auto'
            }}
            >
                <div style={{
                    gridColumn: '1 / span 2'
                }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ ...Bold }}>ID</TableCell>
                                    <TableCell style={{ ...Bold }}>Name</TableCell>
                                    <TableCell style={{ ...Bold }}>Quantity</TableCell>
                                    <TableCell style={{ ...Bold }}>Availability</TableCell>
                                    {/* <TableCell>Status</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        {/* <TableCell>data</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* This is Event Table */}

            {/* <CopyrightFooter /> */}
        </div>
    );
}
export default ViewTools;