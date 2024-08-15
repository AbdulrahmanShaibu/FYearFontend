import React, { useEffect, useState } from 'react';
import { Alert, Paper, Typography } from '@mui/material';
import {
    Table, TableBody, TableCell,
    TableHead, TableRow,
} from '@mui/material';
import axios from 'axios';
import Home from '../UCMS/Home';
import UserHome from './UserHome';

const ViewCleaningCompany = () => {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

    const paginatedData = companyData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/list')
            .then(response => {
                setCompanyData(response.data);
                console.log('Companies list:', response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error while listing the companies', error);
            });
    }, []);

    return (

        <div style={{ minHeight: '97vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UserHome />
            <Paper style={{
                maxWidth: '900px',
                width: '100%',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
            }}>
                <div style={{ padding: '24px 16px' }}>
                    <Alert severity="info" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                        {/* <Typography variant="h6" component="strong"> */}
                            Available Cleaning Companies
                        {/* </Typography> */}
                    </Alert>
                </div>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f1f1f1' }}>
                            <TableCell style={{ fontWeight: 'bold' }}>S/N</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((company, index) => (
                            <TableRow key={company.companyId} style={{
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: '#e0f7fa',
                                }
                            }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: '500', color: '#1976d2' }}>Rows per page:</span>
                <select
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    style={{
                        marginLeft: '10px',
                        padding: '6px 12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #1976d2',
                        backgroundColor: '#ffffff',
                        color: '#1976d2',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        '&:hover': {
                            backgroundColor: '#e3f2fd',
                        }
                    }}
                >
                    {[5, 10, 25].map(rows => (
                        <option key={rows} value={rows}>{rows}</option>
                    ))}
                </select>
            </div>
        </div>

    )
}
export default ViewCleaningCompany