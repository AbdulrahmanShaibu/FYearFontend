import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, FormControl } from '@mui/material';
import { Paper } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsDetails = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [supervisorData, setSupervisorData] = useState([]);
    const [supervisors, setSupervisors] = useState({
        supervisorName: '',
        departmentID: '',
        department: {
            departmentName: ''
        }
    });
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    const [updateDepartmentNameInput, setupdateDepartmentNameInput] = useState('');
    const [updateSupervisorNameInput, setupdateSupervisorNameInput] = useState('');

    const [loading, setLoading] = useState(true);


    const DeleteAPI = 'http://localhost:8080/api/v1/delete/supervisors/${id}'
    const UpdateAPI = 'http://localhost:8080/api/v1/update/supervisors/${id}'

    // Handler function for form elements for department name
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the departments state
        setDepartments([
            ...departments,
            [name], value
        ]);
    };


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/list/supervisors')
            .then(response => {
                setSupervisorData(response.data);
                console.log('supervisors list:', response.data);
            })
            .catch(error => {
                console.log('Error while listing the data', error);
            });

        axios.get('http://localhost:8080/api/v1/list/department') // Fetch departments
            .then(response => {
                setDepartments(response.data);
                console.log('departments list:', response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error while listing the departments', error);
            });
    }, []);

    const handleAddData = () => {
        axios.post('http://localhost:8080/api/v1/post/supervisors', {
            ...supervisors,
            departmentID: departmentId // Assign selected department ID
        })
            .then(response => {
                setSupervisorData([...supervisorData, response.data]);
                setSupervisors({ supervisorName: '' });
                setDepartmentId(''); // Clear department ID
                showNotification('Supervisor added successfully', 'success');
                console.log('added supervisor details:', response.data);
                console.log('Supervisor added successfully', 'success');
            })
            .catch(error => {
                showNotification('Error adding supervisor', 'error');
                console.log('Supervisor failed to be added', 'failure', error);
            });
    }

    const handleAddDelete = (id) => {
        axios.delete(`${DeleteAPI.replace('${id}', id)}`)
            .then(response => {
                setSupervisorData(supervisorData.filter(supervisor => supervisor.supervisorID !== id))
                console.log('delete response data:', response.data)
                console.log('supervisor deleted successifully')
            })
            .catch(error => {
                console.log('error while deleting supervisors', error)
            })
    }

    // 
    const handleUpdateData = (id, updatedDepartmentName, updatedSupervisorName) => {
        const data = {
            supervisorName: updatedSupervisorName,
            department: {
                departmentName: updatedDepartmentName
            }
        }
        axios.put(`${UpdateAPI.replace('${id}', id)}`, data)
            .then(response => {
                // Update logic
                const updatedData = supervisorData.map(supervisor => {
                    if (supervisor.supervisorID === id) {
                        return {
                            ...supervisors,
                            supervisorName: updatedSupervisorName,
                            departmentName: updatedDepartmentName
                        }
                    }
                    return supervisors;
                })
                setSupervisorData(updatedData)
                console.log('update supervisor responses:', response.data)
                console.log('update supervisor worked')
            })
            .catch(error => {
                console.warn('update supevisor failed:', error)
            })
    }


    const showNotification = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
            <div style={{ backgroundColor: 'white', color: 'white', textAlign: 'center', padding: '20px 0', borderRadius: '8px', marginBottom: '20px' }}>
                <h2
                    style={{
                        color: ' #333333',
                        fontWeight: 'normal',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '20px'
                    }}
                >Supervisor Information</h2>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            <div style={{
                marginBottom: '20px',
                textAlign: 'center',
                display: 'flex',
                gap: '10px',
                paddingLeft: '280px',
            }}>
                <TextField
                    label="Supervisor Name"
                    value={supervisors.supervisorName}
                    onChange={(e) => setSupervisors({ ...supervisors, supervisorName: e.target.value })}
                />
                <select
                    style={{ width: '200px', height: '60px' }}
                    label="Department"
                    value={departments.departmentName}
                    onChange={handleInputChange}
                >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                        <option key={department.departmentID} value={department.departmentName}>
                            {department.departmentName}
                        </option>
                    ))}
                </select>
                <TextField
                    // style={{height:'45px'}}
                    disabled={true}
                    label="Add Department ID"
                    type='number'
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                />

                <Button
                    style={{ backgroundColor: 'green', fontWeight: 'bolder', height: '45px', marginTop: '5px' }}
                    onClick={handleAddData} variant="contained"
                    startIcon={<AddIcon />}>
                    Add Supervisor
                </Button>
            </div>

            {/* Update Form */}
            {/* <h2 style={{ margin: 'auto' }}>Update Form</h2> */}

            <TableContainer component={Paper} style={{
                margin: 'auto', maxWidth: '950px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Id</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Department Name</TableCell>
                            <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Update Supervisor Details</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Delete Details</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {supervisorData.map(supervisor => (
                            <TableRow key={supervisor.supervisorID}>
                                <TableCell>{supervisor.supervisorID}</TableCell>
                                <TableCell>{supervisor.supervisorName}</TableCell>

                                {/* This the common error */}
                                <TableCell>
                                    {supervisor.department ? supervisor.department.departmentName || 'No Department' : 'No Department'}
                                </TableCell>

                                {/* <TableCell>{supervisor.department.departmentName}</TableCell> */}
                                <TableCell style={{ backgroundColor: 'whitesmoke' }}>
                                    <form style={{ display: 'flex' }}>
                                        <input
                                            style={{
                                                width: '160px',
                                                height: '35px',
                                                borderRadius: '5px',
                                                backgroundColor: 'white',
                                                marginRight: '10px' // Added margin for spacing between inputs
                                            }}
                                            placeholder="Update Supervisor"
                                            value={updateSupervisorNameInput}
                                            onChange={(e) => setupdateSupervisorNameInput(e.target.value)}
                                        />
                                        <input
                                            style={{
                                                width: '160px',
                                                height: '35px',
                                                borderRadius: '5px',
                                                backgroundColor: 'white',
                                                marginRight: '10px' // Added margin for spacing between inputs
                                            }}
                                            placeholder="Update Department"
                                            value={updateDepartmentNameInput}
                                            onChange={(e) => setupdateDepartmentNameInput(e.target.value)}
                                        />
                                        <Button
                                            style={{
                                                height: '35px',
                                                borderRadius: '5px',
                                                backgroundColor: '#1976d2',
                                                color: 'white',
                                                fontWeight: 'bolder',
                                                padding: '0 15px'
                                            }}
                                            onClick={() => handleUpdateData(supervisor.supervisorID,
                                                updateDepartmentNameInput, updateSupervisorNameInput)}
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                    </form>
                                </TableCell>


                                <TableCell style={{ backgroundColor: 'white' }}>
                                    <Button
                                        style={{ marginTop: '-25px', color: 'red', backgroundColor: 'white', fontWeight: 'bolder' }}
                                        onClick={() => handleAddDelete(supervisor.supervisorID)}
                                        variant="contained" color="secondary"
                                        startIcon={<DeleteIcon style={{ color: 'red' }} />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default NewsDetails;
