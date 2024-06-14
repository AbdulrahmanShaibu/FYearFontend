import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Paper } from '@mui/material';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Home from './Home';
import { Delete } from '@mui/icons-material';

const CleaningCompany = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');
    const [companyData, setCompanyData] = useState([]);
    const [company, setCompany] = useState({
        companyName: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCompanyId, setCurrentCompanyId] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

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

    const validateCompany = (company) => {
        const errors = {};
        if (!company.companyName.trim()) {
            errors.companyName = 'Company Name is required';
        }
        if (!company.address.trim()) {
            errors.address = 'Address is required';
        }
        return errors;
    };

    const handleAddCompany = () => {
        const validationErrors = validateCompany(company);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.post('http://localhost:8080/api/v1/post/company', company)
            .then(response => {
                setCompanyData([...companyData, response.data]);
                setCompany({ companyName: '', address: '' });
                setErrors({});
                showNotification('Company added successfully', 'success');
                setDialogOpen(false);
                console.log('Added company details:', response.data);
            })
            .catch(error => {
                showNotification('Error adding company', 'error');
                console.log('Company failed to be added', error);
            });
    }

    const handleEditCompany = (company) => {
        setCompany(company);
        setCurrentCompanyId(company.companyId);
        setIsEditing(true);
        setDialogOpen(true);
    }

    const handleUpdateCompany = () => {
        const validationErrors = validateCompany(company);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.put(`http://localhost:8080/api/v1/update/company/${currentCompanyId}`, company)
            .then(response => {
                const updatedData = companyData.map(comp => {
                    if (comp.companyId === currentCompanyId) {
                        return { ...comp, ...company };
                    }
                    return comp;
                });
                setCompanyData(updatedData);
                setCompany({ companyName: '', address: '' });
                setErrors({});
                setIsEditing(false);
                setDialogOpen(false);
                showNotification('Company updated successfully', 'success');
                console.log('Updated company details:', response.data);
            })
            .catch(error => {
                showNotification('Error updating company', 'error');
                console.warn('Update company failed:', error);
            });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/delete/company/${id}`)
            .then(response => {
                setCompanyData(companyData.filter(company => company.companyId !== id));
                showNotification('Company deleted successfully', 'success');
                console.log('Delete response data:', response.data);
            })
            .catch(error => {
                showNotification('Error deleting company', 'error');
                console.log('Error while deleting company', error);
            });
    }

    const showNotification = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setCompany({ companyName: '', address: '' });
        setIsEditing(false);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const paginatedData = companyData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    if (loading) {
        return <div>Loading resources...</div>;
    }

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '60px' }}>
            <Home />
            <div style={{
                backgroundColor: 'white', textAlign: 'center',
                padding: '20px 0', borderRadius: '8px', marginBottom: '20px'
            }}>
                <h2 style={{
                    color: '#333333', fontWeight: 'normal',
                    fontFamily: 'Arial, sans-serif', fontSize: '20px'
                }}>Cleaning Company Information</h2>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            <div style={{
                marginBottom: '20px', textAlign: 'center',
                display: 'flex', gap: '10px', justifyContent: 'center'
            }}>
                <Button
                    style={{ width: '200px', height: '40px', fontWeight: 'bold' }}
                    onClick={handleOpenDialog}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add Company
                </Button>
            </div>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Update Company' : 'Add New Company'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Company Name"
                        fullWidth
                        margin="normal"
                        value={company.companyName}
                        onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
                        error={!!errors.companyName}
                        helperText={errors.companyName}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        value={company.address}
                        onChange={(e) => setCompany({ ...company, address: e.target.value })}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={isEditing ? handleUpdateCompany : handleAddCompany} color="primary">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Paper elevation={5} style={{
                margin: 'auto', maxWidth: '950px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px', overflow: 'hidden',
                justifyContent: 'center'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >S/N</TableCell>
                            <TableCell >Company Name</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Edit</TableCell>
                            <TableCell >Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((company, index) => (
                            <TableRow key={company.companyId}>
                                <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{company.companyName}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{company.address}</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <Button
                                        onClick={() => handleEditCompany(company)}
                                        //  variant="contained"
                                        startIcon={<EditIcon />}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>
                                    <Button
                                        style={{ color: 'blue', backgroundColor: 'white' }}
                                        onClick={() => handleDelete(company.companyId)}
                                        variant="contained"
                                        startIcon={<Delete style={{ color: 'red' }} />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
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
    );
};
export default CleaningCompany;
