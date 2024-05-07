import React, { useState } from "react";
import Home from "./Home";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogTitle, Typography } from "@mui/material";
import {
    Table, TableHead, TableBody, TableRow, TableCell
} from '@material-ui/core';
import CleanersFormComponent from "./CleanersForm";

const Organisers = () => {

    const [isFormOpen, setFormOpen] = useState(false);
    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    const saveData = () => {
        alert('demo for saving data!');
    };

    return (
        <div>
            <Home />

            <div style={{
                overflowX: 'auto', backgroundColor: 'whitesmoke',
                marginTop: '100px'
            }} className='table-Contents'>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'green',
                    backgroundColor: 'white',
                    paddingTop: '20px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    width: 'fit-content',
                    margin: 'auto'
                }}>Cleaners List</h2>
                <table style={{
                    width: '70%',
                    margin: 'auto',
                    backgroundColor: 'white',
                    borderCollapse: 'collapse',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <thead style={{ backgroundColor: 'lightgray' }}>
                        <tr>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>Cleaner ID</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>Cleaner Name</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>Gender</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>DepartmentID</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>ToolsID</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>Add Details</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRight: '1px solid #fff' }}>Update Details</th>
                            <th style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>Delete Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>Jill</td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>Smith</td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>Data</td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>Data</td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>Data</td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}><CleanersFormComponent /></td>
                            <td style={{ padding: '10px', borderRight: '1px solid #ccc' }}>
                                <IconButton color="success">
                                    <EditIcon style={{ height: '25px' }} /><div style={{ fontSize: '16px' }}>Edit</div>
                                </IconButton>
                            </td>
                            <td style={{ padding: '10px' }}>
                                <IconButton color="black">
                                    <DeleteIcon style={{ height: '24px', color: 'red' }} /><div style={{ fontSize: '16px' }}>Delete</div>
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div >
    );
}
export default Organisers;