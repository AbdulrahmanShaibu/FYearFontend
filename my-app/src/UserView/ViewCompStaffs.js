import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Home from "../UCMS/Home";
import UserHome from './UserHome';

const ViewCompanyStaffs = () => {
    const [staffData, setStaffData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [cleaningCompanies, setCleaningCompanies] = useState([]); // Added this line
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchStaffData();
        fetchRoles();
        fetchCleaningCompanies(); // Added this line
    }, []);

    const fetchStaffData = () => {
        axios.get('http://localhost:8080/api/v1/users/list')
            .then(response => {
                setStaffData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching staff data:', error);
            });
    };

    const fetchRoles = () => {
        axios.get('http://localhost:8080/api/v1/users/list') // Adjust API endpoint based on your backend
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    };

    const fetchCleaningCompanies = () => {
        axios.get('http://localhost:8080/api/v1/list') // Adjust API endpoint based on your backend
            .then(response => {
                setCleaningCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching cleaning companies:', error);
            });
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const paginatedData = staffData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    if (loading) {
        return <div>Loading resources...</div>;
    }

    return (

        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
            <UserHome />
            <div style={{
                backgroundColor: 'white', textAlign: 'center',
                padding: '20px 0', borderRadius: '8px', marginBottom: '20px'
            }}>
                <h2 style={{
                    color: '#333333', fontWeight: 'normal',
                    fontFamily: 'Arial, sans-serif', fontSize: '20px'
                }}> Available Company Staffs</h2>
            </div>

            <Paper elevation={5} style={{
                margin: 'auto', maxWidth: '950px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px',
                overflow: 'hidden', justifyContent: 'center'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Cleaning Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((staff, index) => (
                            <TableRow key={staff.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{staff.username}</TableCell>
                                <TableCell>{staff.cleaningCompany ? staff.cleaningCompany.companyName : 'N/A'}</TableCell>
                                <TableCell>{staff.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

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
export default ViewCompanyStaffs
