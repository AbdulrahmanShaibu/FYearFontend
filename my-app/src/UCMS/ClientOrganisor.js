import React, { useEffect, useState } from "react";
import Home from "./Home";
import '../styles/form.css';
import {
    Button, Container, Grid, Table, TableRow, TableCell, TextField, TableHead, TableBody, TablePagination, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,
    Alert
} from '@mui/material';
import { Add, Edit, Delete } from "@mui/icons-material";
import { Paper } from "@material-ui/core";
import axios from "axios";

const ClientOrganisation = () => {
    const [clientOrganisation, setClientOrganisation] = useState({ name: '' });
    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedClientOrganisationId, setSelectedClientOrganisationId] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [clientOrganisationToDelete, setClientOrganisationToDelete] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/ClientOrganisation/list')
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.error('Error while listing data:', error);
                setFeedbackMessage("Failed to fetch client organisations. Please try again.");
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientOrganisation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let errors = {};
        if (!clientOrganisation.name) {
            errors.name = "Client Organisation Name is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const request = selectedClientOrganisationId
            ? axios.put(`http://localhost:8080/api/v1/update/ClientOrganisation/${selectedClientOrganisationId}`, clientOrganisation)
            : axios.post('http://localhost:8080/api/v1/save/ClientOrganisation', clientOrganisation);

        request.then(response => {
            setClientOrganisations(prev =>
                selectedClientOrganisationId
                    ? prev.map(org => org.id === selectedClientOrganisationId ? response.data : org)
                    : [...prev, response.data]
            );
            handleCloseModal();
            setFeedbackMessage(`Client organisation ${selectedClientOrganisationId ? 'updated' : 'added'} successfully.`);
        }).catch(error => {
            console.error(`Error ${selectedClientOrganisationId ? 'updating' : 'adding'} client organisation:`, error);
            setFeedbackMessage(`Failed to ${selectedClientOrganisationId ? 'update' : 'add'} client organisation. Please try again.`);
        });
    };

    const handleDelete = (id) => {
        setClientOrganisationToDelete(id);
        setOpenConfirmDialog(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:8080/api/v1/delete/ClientOrganisation/${clientOrganisationToDelete}`)
            .then(() => {
                setClientOrganisations(prev => prev.filter(org => org.id !== clientOrganisationToDelete));
                setFeedbackMessage("Client organisation deleted successfully.");
            })
            .catch(error => {
                console.error('Error deleting client organisation:', error);
                setFeedbackMessage("Failed to delete client organisation. Please try again.");
            })
            .finally(() => {
                setOpenConfirmDialog(false);
                setClientOrganisationToDelete(null);
            });
    };

    const handleUpdate = (id) => {
        const organisationToUpdate = clientOrganisations.find(org => org.id === id);
        setSelectedClientOrganisationId(id);
        setClientOrganisation(organisationToUpdate);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedClientOrganisationId(null);
        setClientOrganisation({ name: '' });
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <Home />
            <br /> <br /> <br /> <br />
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenModal(true)}
                    startIcon={<Add />}
                >
                    Add New Client Organisation
                </Button>
                {/* Your modal component should go here */}
            </div>
            <Paper style={{ width: '90%', height: '100%' }}>
                <Alert severity="info">
                    Manage your client organizations efficiently. Use the button above to add a new client organization to the system, ensuring all relevant details are captured for effective management.
                </Alert>
                <Grid >
                    <Grid style={{ width: '60%' }}>
                        <div style={{ margin: 'auto' }}>
                            <Table>
                                <TableHead className="thead-dark">
                                    <TableRow>
                                        <TableCell>S/N</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Update</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientOrganisations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((clientOrganisation, index) => (
                                        <TableRow key={clientOrganisation.id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{clientOrganisation.name}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleUpdate(clientOrganisation.id)}
                                                    // variant="contained"
                                                    color="primary"
                                                    startIcon={<Edit />}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(clientOrganisation.id)}
                                                    // variant="contained"
                                                    color="secondary"
                                                    startIcon={<Delete style={{color:'red'}}/>}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={clientOrganisations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
            {/* Add/Edit Client Organisation Modal */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>{selectedClientOrganisationId ? 'Edit' : 'Add'} Client Organisation</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <TextField
                            style={{ width: '500px' }}
                            label="Client Organisation Name"
                            name="name"
                            value={clientOrganisation.name}
                            onChange={handleInputChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {selectedClientOrganisationId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this client organisation?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar for feedback messages */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!feedbackMessage}
                autoHideDuration={3000}
                onClose={() => setFeedbackMessage(null)}
                message={feedbackMessage}
            />
        </Container>
    );
};

export default ClientOrganisation;
