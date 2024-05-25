import React, { useEffect, useState } from "react";
import Home from "./Home";
import './styles/form.css'
import {
    Button, Container, Grid, Table, TableRow, TableCell, TextField, Select, MenuItem, TableHead, TableBody, TablePagination
} from '@mui/material';
import { Add, Edit, Delete } from "@mui/icons-material";
import { Paper } from "@material-ui/core";
import axios from "axios";

const Venues = () => {
    const [tasks, setTasks] = useState({
        description: '',
        cleanerID: '',
    });

    const [taskData, setTaskData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/task/list')
            .then(response => {
                setTaskData(response.data);
            })
            .catch(error => {
                console.log('Error while listing data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTasks(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
    };

    const handleUpdate = (id) => {
        // Implement update functionality here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <Home />
            <br /> <br /> <br /> <br />
            <Paper elevation={2}>
                <Grid container style={{ display: 'flex' }}>
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: '20px', height: '110%', width: '55%' }}>
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <TextField
                                        fullWidth
                                        id="description"
                                        label="Task Description"
                                        variant="outlined"
                                        name="description"
                                        value={tasks.description}
                                        onChange={handleInputChange}
                                        margin="normal"
                                    />
                                </div>
                                <div class="form-group">
                                    <select
                                        class="form-control"
                                        id="cleanerID"
                                        name="cleanerID"
                                        value={tasks.cleanerID}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled selected>Select Cleaner ID</option>
                                        <option value="1">Cleaner ID 1</option>
                                        <option value="2">Cleaner ID 2</option>
                                    </select>
                                    <div class="invalid-feedback">Please select a cleaner ID.</div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    fullWidth
                                    style={{ marginTop: 10 }}
                                    className="btn btn-primary"
                                >
                                    Add Task
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid style={{ width: '50%', height: '100%' }}>
                        <div style={{ marginLeft: '-255px' }}>
                            <Table>
                                <TableHead className="thead-dark">
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Task ID</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Description</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Cleaner ID</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Update</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {taskData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{task.cleanerID}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleUpdate(task.id)}
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<Edit />}
                                                    style={{ marginRight: -50 }}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(task.id)}
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<Delete />}
                                                    style={{ marginRight: -50 }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={taskData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Venues;
