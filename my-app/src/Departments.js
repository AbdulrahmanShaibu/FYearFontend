import React, { useEffect, useState } from "react";
import {
    TextField, Button, Table,
    TableHead, TableBody, TableRow, TableCell,
    Paper, Select, MenuItem
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';


const Departments = () => {

    const ListAPI = 'http://localhost:8080/api/v1/list/department';
    const AddAPI = 'http://localhost:8080/api/v1/post/department';
    const DeleteAPI = 'http://localhost:8080/api/v1/delete/department/${departmentId}';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/department/{departmentId}';

    const [departmentData, setDepartmentData] = useState([]);
    const [department, setDepartment] = useState({ departmentName: '' });
    const [updatedDepartmentName, setUpdatedDepartmentName] = useState('');

    useEffect(() => {
        axios.get(ListAPI)
            .then(response => {
                console.log('Response data:', response.data);
                setDepartmentData(response.data);
            })
            .catch(error => {
                console.log('Error while listing the data', error);
            });
    }, []);

    const handleAddData = () => {
        axios.post(AddAPI, department)
            .then(response => {
                console.log('Added data response:', response.data);
                setDepartmentData([...departmentData, response.data]);
                setDepartment({ departmentName: '' }); // Clear input field after successful addition
            })
            .catch(error => {
                console.log('error while adding data to database', error);
            });
    }

    const handleDeleteData = (id) => {
        axios.delete(`${DeleteAPI.replace('${departmentId}', id)}`)
            .then(response => {
                console.log('deleted response:', response.data);
                // after deleting the department with the specified id. It uses the filter() method to 
                // remove the department with the matching departmentID from the list
                setDepartmentData(departmentData.filter(department => department.departmentID !== id));
            })
            .catch(error => {
                console.log('delete response failed:', error);
            });
    }

    const handleUpdate = (id, updatedName) => {
        const data = {
            departmentName: updatedName
        };

        axios.put(`${UpdateAPI.replace('{departmentId}', id)}`, data)
            .then(response => {
                console.log('updated response:', response.data)
                // Update the UI with the updated department name
                const updatedData = departmentData.map(department => {
                    if (department.departmentID === id) {
                        return { ...department, departmentName: updatedName };
                    }
                    return department;
                });
                setDepartmentData(updatedData);
            })
            .catch(error => {
                console.log('update failed:', error)
            })
    }

    const handleInputChange = (e) => {
        setUpdatedDepartmentName(e.target.value);
    }


    return (
        <div style={{}}>
            <div style={{
                display: 'block',
                margin: 'auto',
                marginTop: '150px',
                width: '950px'
            }}>
                <Home />
                <Paper style={{ maxWidth: '600px', width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#333' }}>
                                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Id</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Add Details</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Update</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departmentData.map((department, index) => (
                                <TableRow key={department.departmentID}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{department.departmentName}</TableCell>

                                    <TableCell>
                                        <div style={{
                                            display: 'flex',
                                            margin: 'auto',
                                            marginTop: '5px'
                                        }}>
                                            <input
                                                type="text"
                                                style={{ width: '150px' }}
                                                onChange={(e) => setDepartment({ departmentName: e.target.value })}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleAddData}
                                                style={{
                                                    backgroundColor: 'green',
                                                    borderRadius: '0px',
                                                    fontWeight: 'bolder'
                                                }}>Add</Button>
                                        </div>

                                    </TableCell>
                                    <TableCell style={{ display: 'flex' }}>
                                        <input
                                            type="text"
                                            style={{ width: '150px' }}
                                            value={updatedDepartmentName}
                                            onChange={handleInputChange}
                                        />
                                        <Button
                                            onClick={() => handleUpdate(department.departmentID, updatedDepartmentName)}
                                            variant="contained"
                                            color="primary"
                                            style={{ marginLeft: '20px', justifyContent: 'center' }}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDeleteData(department.departmentID)}
                                            style={{
                                                backgroundColor: 'red',
                                                fontWeight: 'bolder'
                                            }}>Delete</Button>
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

export default Departments;
