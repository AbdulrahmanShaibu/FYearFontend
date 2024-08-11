import React, { useEffect, useState } from "react";
import {
    TextField, Button, Table, TableHead, TableBody, TableRow, TableCell,
    Paper, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle,
    Alert
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';

const ClientSites = () => {
    const ListAPI = 'http://localhost:8080/api/v1/get/client-sites';
    const AddAPI = 'http://localhost:8080/api/v1/post/client-site';
    const DeleteAPI = 'http://localhost:8080/api/v1/delete/client-site';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/client-site';
    const ClientOrganisationListAPI = 'http://localhost:8080/api/v1/ClientOrganisation/list';

    const [clientSites, setClientSites] = useState([]);
    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [newClientSite, setNewClientSite] = useState({ name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
    const [updatedClientSite, setUpdatedClientSite] = useState({ id: '', name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState('add');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
    const [siteToDelete, setSiteToDelete] = useState(null); // State to store the site to delete

    useEffect(() => {
        axios.get(ListAPI)
            .then(response => {
                setClientSites(response.data);
            })
            .catch(error => {
                console.error('Error while listing the data', error);
            });

        axios.get(ClientOrganisationListAPI)
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.error('Error while fetching client organisations', error);
            });
    }, []);

    const handleAddData = () => {
        const selectedOrganisation = clientOrganisations.find(org => org.id === newClientSite.clientOrganisation.id);
        if (!selectedOrganisation) {
            console.error('No client organisation selected');
            return;
        }
        const dataToSend = {
            name: newClientSite.name,
            clientOrganisation: selectedOrganisation,
            staffs: newClientSite.staffs
        };

        console.log('Sending data:', dataToSend); // Debugging log

        axios.post(AddAPI, dataToSend)
            .then(response => {
                setClientSites([...clientSites, response.data]);
                setNewClientSite({ name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
                setDialogOpen(false);
            })
            .catch(error => {
                console.error('Error while adding data to database', error);
            });
    };

    const handleDeleteData = (id) => {
        setSiteToDelete(id); // Store the site ID to be deleted
        setDeleteDialogOpen(true); // Open the confirmation dialog
    };

    const confirmDelete = () => {
        axios.delete(`${DeleteAPI}/${siteToDelete}`)
            .then(response => {
                setClientSites(clientSites.filter(site => site.id !== siteToDelete));
                setDeleteDialogOpen(false); // Close the confirmation dialog
            })
            .catch(error => {
                console.error('Delete response failed:', error);
            });
    };

    const handleUpdate = (id) => {
        const selectedOrganisation = clientOrganisations.find(org => org.id === updatedClientSite.clientOrganisation.id);
        if (!selectedOrganisation) {
            console.error('No client organisation selected');
            return;
        }
        const dataToSend = {
            id: updatedClientSite.id,
            name: updatedClientSite.name,
            clientOrganisation: selectedOrganisation,
            staffs: updatedClientSite.staffs
        };

        console.log('Sending data:', dataToSend); // Debugging log

        axios.put(`${UpdateAPI}/${id}`, dataToSend)
            .then(response => {
                const updatedData = clientSites.map(site => {
                    if (site.id === id) {
                        return { ...site, ...response.data };
                    }
                    return site;
                });
                setClientSites(updatedData);
                setUpdatedClientSite({ id: '', name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
                setDialogOpen(false);
            })
            .catch(error => {
                console.error('Update failed:', error);
            });
    };

    const handleInputChange = (e, setFunction) => {
        const { name, value } = e.target;
        setFunction(prevState => ({
            ...prevState,
            [name]: name === 'clientOrganisation' ? { ...prevState.clientOrganisation, id: value } : value
        }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDialogOpen = (action, site) => {
        setDialogAction(action);
        if (action === 'update' && site) {
            setUpdatedClientSite({
                id: site.id,
                name: site.name,
                clientOrganisation: { id: site.clientOrganisation?.id, name: site.clientOrganisation?.name },
                staffs: site.staffs || []
            });
        }
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setNewClientSite({ name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
        setUpdatedClientSite({ id: '', name: '', clientOrganisation: { id: '', name: '' }, staffs: [] });
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSiteToDelete(null);
    };

    return (
        <div style={{ margin: 'auto', marginTop: '150px', width: '900px' }}>
            <Home />
            <Paper style={{ width: '100%', padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDialogOpen('add')}
                    >
                        Add Client Site
                    </Button>
                </div>
                <Alert severity="info">
                    Manage your client sites efficiently. Use the button below to add a new client sites to the system, ensuring all relevant details are captured for effective management.
                </Alert>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#333' }}>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>S/N</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Client Site</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Client Organisation</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientSites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((site, index) => (
                            <TableRow key={site.id}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{site.name}</TableCell>
                                <TableCell>{site.clientOrganisation?.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDialogOpen('update', site)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDeleteData(site.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={clientSites.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{dialogAction === 'add' ? 'Add Client Site' : 'Update Client Site'}</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        value={dialogAction === 'add' ? newClientSite.name : updatedClientSite.name}
                        onChange={(e) => handleInputChange(e, dialogAction === 'add' ? setNewClientSite : setUpdatedClientSite)}
                        label="Client Site Name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        SelectProps={{ native: true }}
                        name="clientOrganisation"
                        value={dialogAction === 'add' ? newClientSite.clientOrganisation.id : updatedClientSite.clientOrganisation.id}
                        onChange={(e) => handleInputChange(e, dialogAction === 'add' ? setNewClientSite : setUpdatedClientSite)}
                        label="Client Organisation"
                        fullWidth
                        margin="normal"
                    >
                        <option value="">Select Organisation</option>
                        {clientOrganisations.map(org => (
                            <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={dialogAction === 'add' ? handleAddData : () => handleUpdate(updatedClientSite.id)} color="primary">
                        {dialogAction === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this client site? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ClientSites;
