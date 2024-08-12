import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Home from './Home';
import { Container, Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BusinessIcon from '@mui/icons-material/Business';

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

    const [isDialog2Open, setDialog2Open] = useState(true);
    const handleCloseDialog2 = () => {
        setDialog2Open(false);
    };

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

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

    const handleDeleteClick = (id) => {
        setCompanyToDelete(id);
        setConfirmDialogOpen(true);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/v1/delete/company/${companyToDelete}`)
            .then(response => {
                setCompanyData(companyData.filter(company => company.companyId !== companyToDelete));
                showNotification('Company deleted successfully', 'success');
                setConfirmDialogOpen(false);
                console.log('Delete response data:', response.data);
            })
            .catch(error => {
                showNotification('Error deleting company', 'error');
                setConfirmDialogOpen(false);
                console.log('Error while deleting company', error);
            });
    };

    const handleConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
        setCompanyToDelete(null);
    };

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
        <div>Loading resources, please wait...</div>
    }

    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '60px' }}>
            <Home />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Dialog
                    open={isDialog2Open}
                    onClose={handleCloseDialog2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <InfoIcon fontSize="large" sx={{ color: '#1976d2' }} />
                        Cleaning Company Information
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" sx={{ fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
                            <BusinessIcon sx={{ marginRight: '8px', color: '#1976d2' }} />
                            Here you can manage all the information related to the cleaning companies.
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                            <InfoIcon sx={{ marginRight: '8px', color: '#1976d2' }} />
                            Ensure all details are correct to maintain company info accurately.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog2} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                    <Button
                        sx={{
                            width: '200px',
                            height: '50px',
                            fontWeight: 'bold',
                            backgroundColor: '#1976d2',
                            '&:hover': { backgroundColor: '#1565c0' },
                            borderRadius: '8px',
                            textTransform: 'none',
                        }}
                        onClick={handleOpenDialog}
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Add Company
                    </Button>
                </Box>
            </Container>

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
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button
                        onClick={isEditing ? handleUpdateCompany : handleAddCompany}
                        color="primary"
                        variant="contained"
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer sx={{ margin: '20px', padding: '5px', maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
                <Alert severity="info">
                    Manage your cleaning company efficiently. Use the button above to add a new cleaning company to the system, ensuring all relevant details are captured for effective management.
                </Alert>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Company Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Address</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Update</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'center' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((company) => (
                            <TableRow key={company.companyId}>
                                <TableCell sx={{ textAlign: 'center' }}>{company.companyName}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{company.address}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditCompany(company)}
                                        sx={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteClick(company.companyId)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialogOpen}
                onClose={handleConfirmDialogClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this company?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="primary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Page: {currentPage + 1}</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Rows per page: {rowsPerPage}</Typography>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        variant="contained"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 0}
                        sx={{ marginRight: '10px' }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage + 1 >= Math.ceil(companyData.length / rowsPerPage)}
                    >
                        Next
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default CleaningCompany;
