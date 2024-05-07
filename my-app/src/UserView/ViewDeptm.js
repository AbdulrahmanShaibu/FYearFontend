import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
    Table, TableHead, TableBody,
    TableRow, TableCell, Paper
} from '@mui/material';
import Home from "../Home";

const ViewDepartments = () => {

    const ListAPI = 'http://localhost:8080/api/v1/list/department';
    const [departmentData, setDepartmentData] = useState([]);


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


    return (

        <div style={{ backgroundColor: 'whitesmoke', width: '100%', margin: 'auto' }}>
            <div style={{
                margin: 'auto',
                marginTop: '150px',
                marginLeft: '470px',
            }}>

                <div>

                    <Home />

                    {/* <h2>data data</h2> */}
                    <Paper style={{ width: '50%', backgroundColor: 'green', }}>
                        <Table style={{ backgroundColor: 'white', width: '95%' }}>
                            <TableHead>
                                <TableRow style={{ backgroundColor: 'green' }}>
                                    <TableCell style={{
                                        fontWeight: 'bolder',
                                        color: 'white',
                                        fontSize: '16px'
                                    }}>Department Id</TableCell>
                                    <TableCell style={{
                                        fontWeight: 'bolder',
                                        color: 'white',
                                        fontFamily: 'Arial',
                                        fontSize: '16px'
                                    }}>View Department Names</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {departmentData.map(department => (
                                    <TableRow key={department.departmentID}>
                                        <TableCell>{department.departmentID}</TableCell>
                                        <TableCell>{department.departmentName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                </div>

            </div>
        </div>
    )
}
export default ViewDepartments
