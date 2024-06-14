import React, { useState, useEffect } from "react";
import axios from 'axios';
import Home from "./Home";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
    DialogTitle, Typography, Paper, Table, TableHead,
    TableBody, TableRow, TableCell, InputLabel, Select,
    Container, MenuItem, FormControl, TablePagination,
    Snackbar, Alert
} from "@mui/material";

const ClaimType = () => {
    const [isFormOpen, setFormOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [cleaners, setCleaners] = useState([]);
    const [tools, setTools] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [newCleaner, setNewCleaner] = useState({ cleanerName: '', gender: '', departmentName: '', toolId: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentCleanerId, setCurrentCleanerId] = useState(null);
    const [error, setError] = useState(null); // State for error handling

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchCleaners();
        fetchDepartments();
        fetchTools();
    }, []);

    const fetchCleaners = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list/cleaner');
            setCleaners(response.data);
        } catch (error) {
            setError('Error fetching cleaners');
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list/department');
            setDepartments(response.data);
        } catch (error) {
            setError('Error fetching departments');
        }
    };

    const fetchTools = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list/tools');
            setTools(response.data);
        } catch (error) {
            setError('Error fetching tools');
        }
    };

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setNewCleaner({ cleanerName: '', gender: '', departmentName: '', toolId: '' });
        setIsEditing(false);
        setCurrentCleanerId(null);
        setError(null); // Clear error on form close
    };

    const saveCleaner = async () => {
        try {
            if (!newCleaner.cleanerName || !newCleaner.gender || !newCleaner.departmentName || !newCleaner.toolId) {
                setError('All fields are required');
                return;
            }
            if (isEditing) {
                await axios.put(`http://localhost:8080/api/v1/update/cleaner/${currentCleanerId}`, newCleaner);
                setSnackbarMessage('Cleaner updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/v1/save/cleaner', newCleaner);
                setSnackbarMessage('Cleaner saved successfully');
            }
            fetchCleaners();
            closeForm();
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setError('Error saving cleaner');
            setSnackbarMessage('Error saving cleaner');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const deleteCleaner = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/delete/cleaner/${id}`);
            fetchCleaners();
            setSnackbarMessage('Cleaner deleted successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setError('Error deleting cleaner');
            setSnackbarMessage('Error deleting cleaner');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const editCleaner = (cleaner) => {
        setNewCleaner({
            cleanerName: cleaner.cleanerName,
            gender: cleaner.gender,
            departmentName: cleaner.department ? cleaner.department.departmentName : '',
            toolId: cleaner.tool ? cleaner.tool.toolId : '',
        });
        setCurrentCleanerId(cleaner.cleanerID);
        setIsEditing(true);
        setFormOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Home />

            <Container sx={{ mt: 10, backgroundColor: 'whitesmoke', borderRadius: 2, p: 2 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'green', p: 2, borderBottom: 1 }}>
                    Cleaners List
                </Typography>
                <Button variant="contained" color="primary" onClick={openForm}>
                    Add Cleaner
                </Button>
                <Paper sx={{ overflowX: 'auto', p: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Cleaner ID</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Cleaner Name</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Gender</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Department Name</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Tool Name</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Update Details</TableCell>
                                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>Delete Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cleaners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cleaner, index) => (
                                <TableRow key={cleaner.cleanerID}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{cleaner.cleanerName}</TableCell>
                                    <TableCell>{cleaner.gender}</TableCell>
                                    <TableCell>{cleaner.department ? cleaner.department.departmentName : 'N/A'}</TableCell>
                                    <TableCell>{cleaner.tool ? cleaner.tool.toolName : 'N/A'}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => editCleaner(cleaner)}>
                                            <EditIcon /><Typography variant="caption">Edit</Typography>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => deleteCleaner(cleaner.cleanerID)}>
                                            <DeleteIcon /><Typography variant="caption">Delete</Typography>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={cleaners.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>

            <Dialog open={isFormOpen} onClose={closeForm} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? "Edit Cleaner Details" : "Add Cleaner Details"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Cleaner Name"
                                fullWidth
                                variant="outlined"
                                required
                                value={newCleaner.cleanerName}
                                onChange={(e) => setNewCleaner({ ...newCleaner, cleanerName: e.target.value })}
                                error={error && !newCleaner.cleanerName}
                                helperText={error && !newCleaner.cleanerName && error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={newCleaner.gender}
                                    onChange={(e) => setNewCleaner({ ...newCleaner, gender: e.target.value })}
                                    error={error && !newCleaner.gender}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    value={newCleaner.departmentName}
                                    onChange={(e) => setNewCleaner({ ...newCleaner, departmentName: e.target.value })}
                                    error={error && !newCleaner.departmentName}
                                    label="Department"
                                >
                                    {departments.map((dept) => (
                                        <MenuItem key={dept.departmentID} value={dept.departmentName}>
                                            {dept.departmentName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <label>Tool</label>
                                <select
                                    style={{ height: '50px' }}
                                    value={newCleaner.toolId}
                                    onChange={(e) => setNewCleaner({ ...newCleaner, toolId: e.target.value })}
                                    error={error && !newCleaner.toolId}
                                    label="Tool"
                                >
                                    {tools.map((tool) => (
                                        <option key={tool.toolId} value={tool.toolId}>{tool.toolName}</option>
                                    ))}
                                </select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                            <Button onClick={saveCleaner} variant="contained" color="primary">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ClaimType;

