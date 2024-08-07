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
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
            <UserHome />
            <Paper elevation={5} style={{
                margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px', overflow: 'hidden',
                justifyContent: 'center'
            }}>
                <div style={{ margin: '16px 0' }}>
                    <Alert severity="info">
                        <Typography variant="h6" component="strong">
                            Available Cleaning Companies
                        </Typography>
                    </Alert>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >S/N</TableCell>
                            <TableCell >Company Name</TableCell>
                            <TableCell >Address</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((company, index) => (
                            <TableRow key={company.companyId}>
                                <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{company.companyName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{company.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Paper>

            {/* Rows per page selection */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <span>Rows per page: </span>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange} style={{ marginLeft: '5px' }}>
                    {[5, 10, 25].map(rows => (
                        <option key={rows} value={rows}>{rows}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default ViewCleaningCompany