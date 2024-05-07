import React from "react";
import { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, FormControl,
    Select, MenuItem, Button
} from '@material-ui/core';
import Edit from "@mui/icons-material/Edit";
import Home from "./Home"
import { TextField } from "@mui/material";
import { DeleteForever, DeleteOutline } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";

const CleaningAreas = () => {

    const [selectedCode, setSelectedCode] = useState('');

    const handleCodeChange = (event) => {
        setSelectedCode(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log('Selected code:', selectedCode);
    };

    const colorHeading = {
        decorate: {
            color: 'white',
            fontWeight: 'bolder',
            backgroundColor: '#333',

        },
        styleButtons: {
            color: 'white',
            backgroundColor: 'green',
            width: '10px',
            fontWeight: 'bolder',
        }
    }

    return (
        <div style={{
            display: 'block',
            margin: 'auto',
            marginTop: '150px',
            width: '950px'
        }}>
            <Home />

            <div>
                <TableContainer component={Paper}>
                    {/* <h4 style={{ margin: "auto", textAlign: 'center', fontWeight: 'bolder', color: 'black' }}>Cleaning Areas</h4><br /> */}
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell style={{ ...colorHeading.decorate }}>Area Id</TableCell>
                                <TableCell style={{ ...colorHeading.decorate }}>Area Name</TableCell>
                                <TableCell style={{ ...colorHeading.decorate }}>Location</TableCell>
                                <TableCell style={{ ...colorHeading.styleButtons }}>Add Details</TableCell>
                                <TableCell style={{ ...colorHeading.styleButtons }}>Update</TableCell>
                                <TableCell style={{ ...colorHeading.styleButtons }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>
                                    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                                        <div style={{ display: 'grid', gap: '5px' }}>
                                            <input
                                                placeholder='area id'
                                                type="number"
                                            //style={{ width: '75px' }}
                                            />
                                            <input
                                                placeholder='area name'
                                                type="text"
                                            // style={{ width: '75px' }}
                                            />
                                        </div>
                                        <div style={{ display: 'grid', gap: '5px' }}>
                                            <Select
                                                value={selectedCode}
                                                onChange={handleCodeChange}
                                            >
                                                <MenuItem value="code1">Location 1</MenuItem>
                                                <MenuItem value="code2">Location 2</MenuItem>
                                                <MenuItem value="code3">Location 3</MenuItem>
                                            </Select>

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{ height: '25px', fontWeight: 'bolder' }}
                                                color="primary">Add</Button>
                                        </div>
                                    </form>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        style={{
                                            color: 'white', backgroundColor: 'green',
                                            fontWeight: 'bold'
                                        }}><Edit />Update</Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        style={{ color: 'red', backgroundColor: 'whitesmoke', fontWeight: 'bolder' }}>
                                        <Delete />Delete</Button>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default CleaningAreas