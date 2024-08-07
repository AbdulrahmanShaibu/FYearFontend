import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Table, TableHead, TableBody,
    TableRow, TableCell, Paper, Select, MenuItem,
    CircularProgress, Container, Grid, Box, Dialog,
    DialogActions, DialogContent, DialogTitle, IconButton,
    Alert,
    AlertTitle,
    Typography
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';
import { Edit, Add, Close } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const Staffs = () => {
    const [staffs, setStaffs] = useState([]);
    const [clientsites, setClientSites] = useState([]);
    const [staffData, setStaffData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        clientSiteId: ''
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const ListAPI = 'http://localhost:8080/api/v1/all-jwt-users';
    const SaveAPI = 'http://localhost:8080/api/v1/post/staff';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/staff';
    const DeleteAPI = 'http://localhost:8080/api/v1/delete';
    const AllClientSites = 'http://localhost:8080/api/v1/get/client-sites';

    useEffect(() => {
        setLoading(true);
        axios.get(ListAPI)
            .then(response => {
                setStaffs(response.data);
            })
            .catch(error => {
                console.error('Error fetching staffs:', error);
            })
            .finally(() => setLoading(false));
        axios.get(AllClientSites)
            .then(response => {
                setClientSites(response.data);
            })
            .catch(error => {
                console.error('Error fetching clientsites:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (isUpdate) {
            axios.put(`${UpdateAPI}/${staffData.id}`, staffData)
                .then(response => {
                    setStaffs(staffs.map(staff => (staff.id === staffData.id ? response.data : staff)));
                    setStaffData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        role: '',
                        clientSiteId: ''
                    });
                    setOpen(false);
                    setIsUpdate(false);
                })
                .catch(error => {
                    console.error('Error updating staff:', error);
                })
                .finally(() => setLoading(false));
        } else {
            axios.post(SaveAPI, staffData)
                .then(response => {
                    setStaffs([...staffs, response.data]);
                    setStaffData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        role: '',
                        clientSiteId: ''
                    });
                    setOpen(false);
                })
                .catch(error => {
                    console.error('Error adding staff:', error);
                })
                .finally(() => setLoading(false));
        }
    };

    const handleUpdate = (staff) => {
        setStaffData({
            firstName: staff.firstName,
            lastName: staff.lastName,
            email: staff.email,
            password: staff.password,
            role: staff.role,
            clientSiteId: staff.clientSite ? staff.clientSite.id : '',
            id: staff.id
        });
        setIsUpdate(true);
        setOpen(true);
    };

    const handleDelete = (id) => {
        setLoading(true);
        axios.delete(`${DeleteAPI}/${id}`)
            .then(() => {
                setStaffs(staffs.filter(staff => staff.id !== id));
            })
            .catch(error => {
                console.error('Error deleting staff:', error);
            })
            .finally(() => setLoading(false));
    };

    const handleClickOpen = () => {
        setStaffData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: '',
            clientSiteId: ''
        });
        setIsUpdate(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Home />
            </Box>
            <Box justifyContent="center" alignItems="center" mb={4}>
                <Alert severity="info">
                    <AlertTitle>available staffs</AlertTitle>
                    <Typography variant="h6">Manage Staffs</Typography>
                </Alert>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleClickOpen}
                            style={{ marginBottom: '16px' }}
                        >
                            Assign Staffs in client Site
                        </Button> */}
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>
                                {isUpdate ? 'Edit Staff' : 'Add Staff'}
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    style={{ position: 'absolute', right: 8, top: 8 }}
                                >
                                    <Close />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        type="text"
                                        required
                                        label="First Name"
                                        name="firstName"
                                        value={staffData.firstName}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => setStaffData({ ...staffData, firstName: e.target.value })}
                                    />
                                    <TextField
                                        type="text"
                                        required
                                        label="Last Name"
                                        name="lastName"
                                        value={staffData.lastName}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => setStaffData({ ...staffData, lastName: e.target.value })}
                                    />
                                    <TextField
                                        type="email"
                                        required
                                        label="Email"
                                        name="email"
                                        value={staffData.email}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
                                    />
                                    <TextField
                                        type="password"
                                        required
                                        label="Password"
                                        name="password"
                                        value={staffData.password}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        onChange={(e) => setStaffData({ ...staffData, password: e.target.value })}
                                    />
                                    <Select
                                        value={staffData.role}
                                        onChange={(e) => setStaffData({ ...staffData, role: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Role</MenuItem>
                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                        <MenuItem value="USER">User</MenuItem>
                                    </Select>
                                    <Select
                                        value={staffData.clientSiteId}
                                        onChange={(e) => setStaffData({ ...staffData, clientSiteId: e.target.value })}
                                        fullWidth
                                        margin="normal"
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Client Site</MenuItem>
                                        {clientsites.map((client_site) => (
                                            <MenuItem key={client_site.id} value={client_site.id}>
                                                {client_site.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ marginTop: '16px' }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Id</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Client Site</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Update</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {staffs.map((staff, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{staff.id}</TableCell>
                                            <TableCell>{staff.firstName}</TableCell>
                                            <TableCell>{staff.lastName}</TableCell>
                                            <TableCell>{staff.email}</TableCell>
                                            <TableCell>{staff.clientSite ? staff.clientSite.name : 'N/A'}</TableCell>
                                            <TableCell>{staff.role}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleUpdate(staff)}
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<Edit />}
                                                    style={{
                                                        marginRight: 8
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(staff.id)}
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Staffs;