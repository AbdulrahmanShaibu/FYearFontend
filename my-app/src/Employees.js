import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper, Select, MenuItem } from '@mui/material';
import Home from "./Home";

const Employees = () => {

    const [formData, setFormData] = useState({ name: '', role: '' });
    const [tableData, setTableData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData((prevData) => [...prevData, formData]);
        setFormData({ name: '', role: '' });
    };

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
                width: '55%'
            }}>

                <form onSubmit={handleSubmit} style={{
                    marginBottom: '-10px',
                    backgroundColor: 'white'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        margin: 'auto',
                        fontWeight: 'bolder',
                        backgroundColor: 'lightblue', // Green color
                        color: 'white',
                        padding: '10px 0', // Added padding for better appearance
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Added shadow for depth
                        width: 'fit-content' // Adjusted width to fit content
                    }}>Employee Form</h2>

                    <TextField
                        label="Employee Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ marginRight: '10px' }}
                    />
                    <Select
                        labelId="employee-role-label"
                        id="employee-role-select"
                        label="Employee Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <MenuItem value="role1">Role 1</MenuItem>
                        <MenuItem value="role2">Role 2</MenuItem>
                        <MenuItem value="role3">Role 3</MenuItem>
                    </Select>
                    <Button
                        style={{
                            width: '210px',
                            // margin:'auto'
                        }}
                        type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
                <Paper style={{ maxWidth: '600px', width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Employee Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Role Assigned</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Update Details</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Delete Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                        <button>Update</button>
                                    </TableCell>
                                    <TableCell>
                                        <button>Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}
export default Employees