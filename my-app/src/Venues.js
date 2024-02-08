import React from "react";
import Home from "./Home";
import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CopyrightFooter from "./Footer";


const Venues = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    const changeColor = {
        color: 'red',
        backgroundColor: 'lightblue'
    };

    return (
        <div> 
            {/* style={{backgroundColor: 'lightblue'}} */}
            <div>
                <Home />
                <div style={{
                    // display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: 'white'
                }}>
                    <Grid
                    //container justifyContent="center"
                    >
                        <Grid>
                            <Paper elevation={0} style={{
                                padding: '100px',
                                textAlign: 'center',
                                margin: 'auto',
                                width: 'fit-content',
                                // height:'fit-content'
                            }}>
                                <b>
                                    <Typography style={
                                        {
                                            fontSize: '24px',
                                            color: '#333',
                                            backgroundColor: 'lightblue',
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            textAlign: 'center'
                                        }
                                    }>
                                        Admin Venues Registration Form
                                    </Typography></b>
                                <form onSubmit={handleSubmit}
                                    style={{
                                        display: 'flex',
                                    }}>
                                    <TextField
                                        label="Venue Name"
                                        name="firstName"
                                        fullWidth
                                        margin="normal"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Venue Address"
                                        name="lastName"
                                        fullWidth
                                        margin="normal"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Contact Email"
                                        name="email"
                                        fullWidth
                                        margin="normal"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Description"
                                        name="password"
                                        fullWidth
                                        margin="normal"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Additional Details"
                                        name="password"
                                        fullWidth
                                        margin="normal"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <Button
                                        type="submit"
                                        // variant="contained"
                                        color="primary"
                                        fullWidth
                                        margin="normal"
                                        style={{
                                            marginTop: '15px',
                                            borderRadius: '10px'

                                        }}
                                    >
                                        Add Venue
                                    </Button>
                                </form>
                                <hr />
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* This is Event Table */}

                    <TableContainer style={{
                        margin: 'auto',
                        height: '100vh',
                        width: 'fit-content'
                    }}>
                        <h2 style={
                            {
                                fontSize: '24px',
                                color: '#333',
                                backgroundColor: '#f5f5f5',
                                padding: '10px',
                                border: '1px solid #ccc',
                                textAlign: 'center'
                            }
                        }>Current Venues Details</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Update Row</TableCell>
                                    <TableCell>Delete Row</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Venue 1</TableCell>
                                    <TableCell>venue1@example.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon />}
                                        // onClick={() => handleAdd(user.id)}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                        // onClick={() => handleUpdate(user.id)}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                        // onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>Venue 2</TableCell>
                                    <TableCell>venue2@example.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<AddIcon />}
                                        // onClick={() => handleAdd(user.id)}
                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                        // onClick={() => handleUpdate(user.id)}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                        // onClick={() => handleDelete(user.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <CopyrightFooter />
        </div>
    );
}
export default Venues;