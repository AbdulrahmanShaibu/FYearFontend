import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Table, TableHead, TableBody,
    TableRow, TableCell, Paper
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';
import { Edit } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';

const Employees = () => {

    const [staffs, setStaffs] = useState([]);
    const [staffData, setStaffData] = useState({
        StaffName: '',
        StaffEmail: '',
        StaffPhone: ''
    });

    const ListAPI = 'http://localhost:8080/api/v1/list/staff';
    const SaveAPI = 'http://localhost:8080/api/v1/post/staff';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/staff'
    const DeleteAPI = 'http://localhost:8080/api/v1/delete';

    useEffect(() => {
        axios.get(ListAPI)
            .then(response => {
                setStaffs(response.data); // Correctly set staffs state
                console.log('staffs response:', response.data);
            })
            .catch(error => {
                console.log('error while listing staffs:', error);
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(SaveAPI, staffData) // sending staffData in the post request
            .then(response => {
                setStaffData(response.data);
            })
            .catch(error => {
                console.log('error while adding staffs:', error);
            });
    };


    const handleUpdate = (id) => {
        axios.put(`${UpdateAPI}/${id}`)
            .then(response => {
                setStaffData(response.data);
            })
            .catch(error => {
                console.log('error while updating staff:', error);
            });
        console.log('Update clicked for staff with ID:', id);
    }

    const handleDelete = (id) => {
        axios.delete(`${DeleteAPI}/${id}`)
            .then(response => {
                // Refresh the list of staff after deletion
                axios.get(ListAPI)
                    .then(response => {
                        setStaffs(response.data);
                    })
                    .catch(error => {
                        console.log('error while listing staffs:', error);
                    });
            })
            .catch(error => {
                console.log('error while deleting staff:', error);
            });
    }



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
                    borderRadius: '0px', /* Changed border radius */
                    height: '380px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', /* Centering form vertically */
                }}>
                    <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                        <TextField
                            type='text' required
                            label="Staff Name"
                            name="StaffName"
                            value={staffData.StaffName}
                            variant="outlined"
                            style={{ marginBottom: '10px', width: '100%' }} /* Full width */
                            onChange={(e) => setStaffData({ ...staffData, StaffName: e.target.value })}
                        />
                        <TextField
                            type='email' required
                            label="Staff Email"
                            name="StaffEmail"
                            value={staffData.StaffEmail}
                            variant="outlined"
                            style={{ marginBottom: '10px', width: '100%' }} /* Full width */
                            onChange={(e) => setStaffData({ ...staffData, StaffEmail: e.target.value })}
                        />
                        <TextField
                            type='number'
                            label="Staff Phone"
                            name="StaffPhone"
                            value={staffData.StaffPhone}
                            variant="outlined" required
                            style={{ marginBottom: '20px', width: '100%' }} /* Full width */
                            onChange={(e) => setStaffData({ ...staffData, StaffPhone: e.target.value })}
                        />
                        <Button
                            style={{ width: '100%', fontWeight: 'bolder' }} /* Full width */
                            type="submit" variant="contained" color="primary">
                            Submit
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
                                <TableCell style={{ fontWeight: 'bold' }}>Update</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffs.map((staff, index) => (
                                <TableRow key={staff.StaffID}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{staff.StaffName}</TableCell>
                                    <TableCell>{staff.StaffEmail}</TableCell>
                                    <TableCell>{staff.StaffPhone}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleUpdate(staff.StaffID)}
                                            variant="contained"
                                            color="primary"
                                            startIcon={<Edit />}
                                            style={{ marginRight: 8 }}
                                        >Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDelete(staff.StaffID)}
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<Delete />}
                                        >
                                            Delete
                                        </Button>

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

export default Employees;
