import React, { useState } from 'react';
import {
    Table, TableHead, TableBody,
    TableRow, TableCell, Paper
} from '@mui/material';
import Home from '../Home';

const ViewEmployees = () => {

    const [formData, setFormData] = useState({ name: '', role: '' });
    const [tableData, setTableData] = useState([]);

    return (
        <div>
            <div style={{
                display: 'block',
                margin: 'auto',
                marginTop: '150px',
                // backgroundColor: 'green',
                width: '950px'
            }}>
                <Home />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'whitesmoke',
                margin: 'auto',
                width: '40%'
            }}>

                <div>
                    <Paper style={{ maxWidth: '500px', width: '100%' }}>
                        <h2 style={{
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            backgroundColor: 'green',
                            width: '100%',
                            fontWeight: 'bolder',
                            height: '40px',
                            color: 'white',
                            fontSize: '18px'
                        }}>View Employees</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Employee Name</TableCell>
                                    <TableCell style={{ fontWeight: 'bold' }}>Role Assigned</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

            </div>
        </div>
    )
}
export default ViewEmployees