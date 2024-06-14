import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Table, TableHead, TableBody,
    TableRow, TableCell, Paper,
    Select,
    MenuItem,
    CircularProgress, // Added for loading indicator
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete'; // Changed to DeleteIcon for consistency

const Staffs = () => {
    const [staffs, setStaffs] = useState([]);
    const [clientsites, setClientSites] = useState([]);
    const [staffData, setStaffData] = useState({
        StaffName: '',
        StaffEmail: '',
        StaffPhone: '',
        id: ''            //ClientSite Id
    });
    const [loading, setLoading] = useState(false); // Added loading state

    const ListAPI = 'http://localhost:8080/api/v1/staffs/list';
    const SaveAPI = 'http://localhost:8080/api/v1/post/staff';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/staff';
    const DeleteAPI = 'http://localhost:8080/api/v1/delete';
    const AllClientSites = 'http://localhost:8080/api/v1/get/client-sites';

    useEffect(() => {
        setLoading(true); // Set loading state when fetching data
        axios.get(ListAPI)
            .then(response => {
                setStaffs(response.data);
            })
            .catch(error => {
                console.error('Error fetching staffs:', error);
            })
            .finally(() => setLoading(false)); // Clear loading state
        axios.get(AllClientSites)
            .then(response => {
                setClientSites(response.data);
            })
            .catch(error => {
                console.error('Error fetching clientsites:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state when submitting form
        axios.post(SaveAPI, staffData)
            .then(response => {
                setStaffs([...staffs, response.data]);
                setStaffData({
                    StaffName: '',
                    StaffEmail: '',
                    StaffPhone: '',
                    id: ''
                });
            })
            .catch(error => {
                console.error('Error adding staff:', error);
            })
            .finally(() => setLoading(false)); // Clear loading state
    };

    const handleUpdate = (id) => {
        setLoading(true); // Set loading state when updating
        axios.put(`${UpdateAPI}/${id}`, staffData)
            .then(response => {
                setStaffs(staffs.map(staff => (staff.StaffID === id ? response.data : staff)));
            })
            .catch(error => {
                console.error('Error updating staff:', error);
            })
            .finally(() => setLoading(false)); // Clear loading state
    };

    const handleDelete = (id) => {
        setLoading(true); // Set loading state when deleting
        axios.delete(`${DeleteAPI}/${id}`)
            .then(() => {
                setStaffs(staffs.filter(staff => staff.StaffID !== id));
            })
            .catch(error => {
                console.error('Error deleting staff:', error);
            })
            .finally(() => setLoading(false)); // Clear loading state
    };

    const getCompanyName = (id) => {
        const client_site = clientsites.find(client_site => client_site.id === id);
        return client_site ? client_site.name : '';
    };

    return (
        <div>
            <div style={{
                display: 'block',
                margin: 'auto',
                marginTop: '150px',
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
                width: '55%',
                gap: '5px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '0px',
                    height: '380px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                        <TextField
                            type='text' required
                            label="Staff Name"
                            name="StaffName"
                            value={staffData.StaffName}
                            variant="outlined"
                            style={{ marginBottom: '10px', width: '100%' }}
                            onChange={(e) => setStaffData({ ...staffData, StaffName: e.target.value })}
                        />
                        <TextField
                            type='email' required
                            label="Staff Email"
                            name="StaffEmail"
                            value={staffData.StaffEmail}
                            variant="outlined"
                            style={{ marginBottom: '10px', width: '100%' }}
                            onChange={(e) => setStaffData({ ...staffData, StaffEmail: e.target.value })}
                        />
                        <TextField
                            type='tel' // Changed type to 'tel' for phone numbers
                            label="Staff Phone"
                            name="StaffPhone"
                            value={staffData.StaffPhone}
                            variant="outlined"
                            style={{ marginBottom: '20px', width: '100%' }}
                            onChange={(e) => setStaffData({ ...staffData, StaffPhone: e.target.value })}
                        />
                        <Select
                            value={staffData.id}
                            onChange={(e) => setStaffData({ ...staffData, id: e.target.value })}
                            style={{ width: '100%', marginBottom: '20px' }}
                        >
                            {clientsites.map((client_site) => (
                                <MenuItem key={client_site.id} value={client_site.id}>{client_site.name}</MenuItem>
                            ))}
                        </Select>
                        <Button
                            style={{ width: '100%', fontWeight: 'bold' }}
                            type="submit" variant="contained" color="primary">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'} {/* Show loading indicator */}
                        </Button>
                    </form>
                </div>
                <Paper style={{ maxWidth: '600px', width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Client Site</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Update</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffs.map((staff, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{staff.StaffName}</TableCell>
                                    <TableCell>{staff.StaffEmail}</TableCell>
                                    <TableCell>{staff.StaffPhone}</TableCell>
                                    <TableCell>{staff.clientSite.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleUpdate(staff.StaffID)}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<Edit />}
                                            style={{ marginRight: 8 }}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDelete(staff.StaffID)}
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />} // Changed to DeleteIcon
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'} {/* Show loading indicator */}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    );
};

export default Staffs;

