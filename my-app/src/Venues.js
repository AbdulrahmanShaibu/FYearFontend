import React, { useState } from "react";
import Home from "./Home";
import { Button, TextField, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import CopyrightFooter from "./Footer";


const Venues = () => {
    const [formData, setFormData] = useState({
        Description: '',
        CleanerID: '' // Corrected
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    const style = {
        table: {
            backgroundColor: '#333',
            color: 'white'
        }
    }

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <Home />
            <br />
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={6} sm={6}>
                    <Paper elevation={1} style={{ padding: '50px' }}>
                        <Typography
                            variant="h5"
                            style={{
                                textAlign: 'center',
                                marginBottom: '20px',
                                fontWeight: 'bold',
                                color: '#333', // Dark color for better readability
                                letterSpacing: '1px', // Spacing between letters
                                borderBottom: '2px solid blue', // Pink underline
                                paddingBottom: '10px' // Padding under the underline
                            }}
                        >
                            Cleaners Task Form
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Task Descriptions"
                                name="Description"
                                fullWidth
                                margin="normal"
                                value={formData.Description}
                                onChange={handleInputChange}
                            />
                            <Select
                                label="Cleaner ID"
                                name="CleanerID"
                                fullWidth
                                margin="normal"
                                value={formData.CleanerID}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">Cleaner ID 1</MenuItem>
                                <MenuItem value="2">Cleaner ID 2</MenuItem>
                            </Select>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '25px' }}
                                startIcon={<AddIcon />}
                            >
                                Add Task
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            {/* Event Table */}
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={6} sm={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style.table}>Task ID</TableCell>
                                    <TableCell style={style.table}>Descriptions</TableCell>
                                    <TableCell style={style.table}>Cleaner ID</TableCell>
                                    <TableCell style={style.table}>Update Details</TableCell>
                                    <TableCell style={style.table}>Delete Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Venue 1</TableCell>
                                    <TableCell>venue1@example.com</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <CopyrightFooter />
        </div>
    );
}

export default Venues;
