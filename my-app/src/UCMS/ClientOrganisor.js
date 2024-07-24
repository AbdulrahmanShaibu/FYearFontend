import React, { useEffect, useState } from "react";
import Home from "./Home";
import '../styles/form.css';
import {
    Button, Container, Grid, Table, TableRow, TableCell, TextField, TableHead, TableBody, TablePagination, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar
} from '@mui/material';
import { Add, Edit, Delete } from "@mui/icons-material";
import { Paper } from "@material-ui/core";
import axios from "axios";

const ClientOrganisation = () => {
    // State declarations
    const [clientOrganisation, setClientOrganisation] = useState({
        name: ''
    });

    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedClientOrganisationId, setSelectedClientOrganisationId] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    // Fetch initial data on component mount
    useEffect(() => {
        // Fetch client organisations
        axios.get('http://localhost:8080/api/v1/ClientOrganisation/list')
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.log('Error while listing data:', error);
                setFeedbackMessage("Failed to fetch client organisations. Please try again.");
            });

    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Handle form input change for client organisation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientOrganisation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form input change for updated client organisation
    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setClientOrganisation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validate form inputs
    const validate = () => {
        let errors = {};
        if (!clientOrganisation.name) {
            errors.name = "Client Organisation Name is required";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission for new client organisation
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        axios.post('http://localhost:8080/api/v1/save/ClientOrganisation', clientOrganisation)
            .then(response => {
                setClientOrganisations([...clientOrganisations, response.data]);
                setClientOrganisation({ name: '' }); // Clear the form after submission
                setFeedbackMessage("Client organisation added successfully.");
            })
            .catch(error => {
                console.log('Error adding client organisation:', error);
                setFeedbackMessage("Failed to add client organisation. Please try again.");
            });
    };

    // Handle deletion of client organisation
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/delete/ClientOrganisation/${id}`)
            .then(response => {
                setClientOrganisations(clientOrganisations.filter(clientOrganisation => clientOrganisation.id !== id));
                setFeedbackMessage("Client organisation deleted successfully.");
            })
            .catch(error => {
                console.log('Error deleting client organisation:', error);
                setFeedbackMessage("Failed to delete client organisation. Please try again.");
            });
    };

    // Handle initiating update of client organisation
    const handleUpdate = (id) => {
        const organisationToUpdate = clientOrganisations.find(clientOrganisation => clientOrganisation.id === id);
        setSelectedClientOrganisationId(id);
        setClientOrganisation(organisationToUpdate);
        setOpenModal(true);
    };

    // Close the update modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedClientOrganisationId(null);
        setClientOrganisation({ name: '' });
    };

    // Submit updated client organisation data
    const handleUpdateSubmit = () => {
        axios.put(`http://localhost:8080/api/v1/update/ClientOrganisation/${selectedClientOrganisationId}`, clientOrganisation)
            .then(response => {
                const updatedOrganisations = clientOrganisations.map(clientOrganisation => {
                    if (clientOrganisation.id === selectedClientOrganisationId) {
                        return response.data;
                    }
                    return clientOrganisation;
                });
                setClientOrganisations(updatedOrganisations);
                setOpenModal(false);
                setFeedbackMessage("Client organisation updated successfully.");
            })
            .catch(error => {
                console.log('Error updating client organisation:', error);
                setFeedbackMessage("Failed to update client organisation. Please try again.");
            });
    };

    // Handle page change in pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change in pagination
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Open the form modal
    const handleOpenForm = () => {
        setOpenModal(true);
    };

    return (
        <Container>
            <Home />
            <br /> <br /> <br /> <br />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenForm}
                startIcon={<Add />}
            >
                Add New Client Organisation
            </Button>
            <br /> <br />
            <Paper elevation={1} style={{ width: '90%', height: '100%' }}>
                <Grid container>
                    <Grid style={{ width: '50%', height: '100%' }}>
                        <div style={{ margin: 'auto' }}>
                            <Table>
                                <TableHead className="thead-dark">
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>S/N</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Name</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Update</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Delete</TableCell>
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
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<Edit />}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(clientOrganisation.id)}
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<Delete />}
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
                    <form>
                        <FormControl fullWidth>
                            <TextField
                                id="updated-name"
                                label="Client Organisation Name"
                                variant="outlined"
                                name="name"
                                value={clientOrganisation.name}
                                onChange={selectedClientOrganisationId ? handleUpdateInputChange : handleInputChange}
                                margin="normal"
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                style={{ width: '350px' }}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
                    <Button onClick={selectedClientOrganisationId ? handleUpdateSubmit : handleSubmit} color="primary">{selectedClientOrganisationId ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar for feedback */}
            <Snackbar
                open={!!feedbackMessage}
                message={feedbackMessage}
                onClose={() => setFeedbackMessage(null)}
                autoHideDuration={3000} // Auto-dismiss after 3 seconds
            />
        </Container>
    );
};

export default ClientOrganisation;
