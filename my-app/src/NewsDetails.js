import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, FormControl } from '@mui/material';
import { Paper } from '@mui/material';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const NewsDetails = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [supervisorData, setSupervisorData] = useState([]);
    const [supervisors, setSupervisors] = useState({
        supervisorName: '',
        department: []
    });
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/list/supervisors')
            .then(response => {
                const supervisors = response.data.map(supervisor => {
                    return {
                        ...supervisor,
                        departmentNames: []
                    };
                });
                setSupervisorData(supervisors);
                console.log('supervisors list:', supervisors);
            })
            .catch(error => {
                console.log('Error while listing the data', error);
            });

        axios.get('http://localhost:8080/api/v1/list/department')
            .then(response => {
                setDepartments(response.data);
                console.log('departments list:', response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error while listing the departments', error);
            });
    }, []);

    useEffect(() => {
        if (supervisorData.length > 0 && departments.length > 0) {
            const updatedSupervisorData = supervisorData.map(supervisor => {
                const departmentNames = supervisor.department.map(deptId => {
                    const dept = departments.find(d => d.departmentID === deptId);
                    return dept ? dept.departmentName : "Unknown Department";
                });
                return {
                    ...supervisor,
                    departmentNames
                };
            });
            setSupervisorData(updatedSupervisorData);
        }
    }, [supervisorData, departments]);

    const handleAddData = () => {
        axios.post('http://localhost:8080/api/v1/post/supervisors', {
            ...supervisors,
            department: [departmentId]
        })
            .then(response => {
                setSupervisorData([...supervisorData, response.data]);
                setDepartmentId('');
                setSupervisors({ supervisorName: '', department: [] });
                showNotification('Supervisor added successfully', 'success');
                console.log('added supervisor details:', response.data);
            })
            .catch(error => {
                showNotification('Error adding supervisor', 'error');
                console.log('Supervisor failed to be added', error);
            });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/delete/supervisors/${id}`)
            .then(response => {
                setSupervisorData(supervisorData.filter(supervisor => supervisor.supervisorID !== id));
                showNotification('Supervisor deleted successfully', 'success');
                console.log('delete response data:', response.data);
            })
            .catch(error => {
                showNotification('Error deleting supervisor', 'error');
                console.log('error while deleting supervisors', error);
            });
    }

    const handleUpdateData = (id, updatedSupervisorName) => {
        const data = {
            supervisorName: updatedSupervisorName,
            department: []
        }
        axios.put(`http://localhost:8080/api/v1/update/supervisors/${id}`, data)
            .then(response => {
                const updatedData = supervisorData.map(supervisor => {
                    if (supervisor.supervisorID === id) {
                        return {
                            ...supervisor,
                            supervisorName: updatedSupervisorName,
                        }
                    }
                    return supervisor;
                })
                setSupervisorData(updatedData);
                showNotification('Supervisor updated successfully', 'success');
                console.log('update supervisor responses:', response.data);
            })
            .catch(error => {
                showNotification('Error updating supervisor', 'error');
                console.warn('update supervisor failed:', error);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = supervisorData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
            <div style={{
                backgroundColor: 'white', color: 'white', textAlign: 'center',
                padding: '20px 0', borderRadius: '8px', marginBottom: '20px'
            }}>
                <h2 style={{
                    color: '#333333', fontWeight: 'normal',
                    fontFamily: 'Arial, sans-serif', fontSize: '20px'
                }}>Supervisor Information</h2>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            <div style={{
                marginBottom: '20px', textAlign: 'center',
                display: 'flex', gap: '10px', marginLeft: '30%'
            }}>
                <TextField
                    label="Supervisor Name"
                    value={supervisors.supervisorName}
                    onChange={(e) => setSupervisors({ ...supervisors, supervisorName: e.target.value })}
                />
                <select
                    style={{ width: '200px', height: '40px' }}
                    label="Department"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                        <option key={department.departmentID} value={department.departmentID}>
                            {department.departmentName}
                        </option>
                    ))}
                </select>
                <Button
                    style={{ width: '200px', height: '40px', fontWeight: 'bold' }}
                    onClick={handleAddData}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add Supervisor
                </Button>
            </div>

            <TableContainer component={Paper} style={{
                margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px', overflow: 'hidden'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Id</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Supervisor Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Department Names</TableCell>
                            <TableCell style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Update Supervisor Details</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white', backgroundColor: '#332' }}>Delete Details</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {currentItems.map((supervisor, index) => (
                            <TableRow key={supervisor.supervisorID}>
                                <TableCell>{supervisor.supervisorID}</TableCell>
                                <TableCell>{supervisor.supervisorName}</TableCell>
                                <TableCell>
                                    {supervisor.departmentNames.length > 0 ?
                                        supervisor.departmentNames.join(", ") : "No department"}
                                </TableCell>

                                <TableCell style={{ backgroundColor: 'whitesmoke' }}>
                                    <form style={{ display: 'flex' }}>
                                        <TextField
                                            style={{ width: '160px', marginRight: '10px' }}
                                            placeholder="Update Supervisor"
                                            value={supervisor.supervisorName}
                                            onChange={(e) => handleUpdateData(supervisor.supervisorID, e.target.value)}
                                        />
                                    </form>
                                </TableCell>

                                <TableCell style={{ backgroundColor: 'white' }}>
                                    <Button
                                        style={{ marginTop: '-25px', color: 'red', backgroundColor: 'white', fontWeight: 'bolder' }}
                                        onClick={() => handleDelete(supervisor.supervisorID)}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon style={{ color: 'red' }} />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                    variant="contained"
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </Button>
                <Button
                    disabled={currentItems.length < itemsPerPage}
                    onClick={() => paginate(currentPage + 1)}
                    variant="contained"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default NewsDetails;
