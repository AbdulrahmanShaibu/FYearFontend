import React, { useEffect, useState } from "react";
import {
    TextField, Button, Table,
    TableHead, TableBody, TableRow, TableCell,
    Paper, TablePagination
} from '@mui/material';
import Home from "./Home";
import axios from 'axios';

const ClientSites = () => {

    const ListAPI = 'http://localhost:8080/api/v1/all/client-sites';
    const AddAPI = 'http://localhost:8080/api/v1/post/client-site';
    const DeleteAPI = 'http://localhost:8080/api/v1/delete/client-site';
    const UpdateAPI = 'http://localhost:8080/api/v1/update/client-site';
    const ClientOrganisationListAPI = 'http://localhost:8080/api/v1/ClientOrganisation/list';

    const [clientSites, setClientSites] = useState([]);
    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [newClientSite, setNewClientSite] = useState({ name: '', clientOrganisation: '' });
    const [updatedClientSite, setUpdatedClientSite] = useState({ name: '', clientOrganisation: '' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get(ListAPI)
            .then(response => {
                console.log('Client sites:', response.data);
                setClientSites(response.data);
            })
            .catch(error => {
                console.log('Error while listing the data', error);
            });

        axios.get(ClientOrganisationListAPI)
            .then(response => {
                console.log('Client organisations:', response.data);
                setClientOrganisations([response.data]);
            })
            .catch(error => {
                console.log('Error while fetching client organisations', error);
            });
    }, []);

    const handleAddData = () => {
        axios.post(AddAPI, newClientSite)
            .then(response => {
                console.log('Added data response:', response.data);
                setClientSites([...clientSites, response.data]);
                setNewClientSite({ name: '', clientOrganisation: '' });
            })
            .catch(error => {
                console.log('Error while adding data to database', error);
            });
    };

    const handleDeleteData = (id) => {
        axios.delete(`${DeleteAPI}/${id}`)
            .then(response => {
                console.log('Deleted response:', response.data);
                setClientSites(clientSites.filter(site => site.id !== id));
            })
            .catch(error => {
                console.log('Delete response failed:', error);
            });
    };

    const handleUpdate = (id) => {
        axios.put(`${UpdateAPI}/${id}`, updatedClientSite)
            .then(response => {
                console.log('Updated response:', response.data);
                const updatedData = clientSites.map(site => {
                    if (site.id === id) {
                        return { ...site, ...updatedClientSite };
                    }
                    return site;
                });
                setClientSites(updatedData);
            })
            .catch(error => {
                console.log('Update failed:', error);
            });
    };

    const handleInputChange = (e, setFunction) => {
        const { name, value } = e.target;
        setFunction(prevState => ({ ...prevState, [name]: value }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ margin: 'auto', marginTop: '150px', width: '900px' }}>
            <Home />
            <Paper style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#333' }}>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Id</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: 'white' }}>Name</TableCell>
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
                                    <TextField
                                        name="name"
                                        value={updatedClientSite.name}
                                        onChange={(e) => handleInputChange(e, setUpdatedClientSite)}
                                        label="Name"
                                        style={{ marginRight: '10px' }}
                                    />
                                    <select
                                        name="clientOrganisation"
                                        value={updatedClientSite.clientOrganisation}
                                        onChange={(e) => handleInputChange(e, setUpdatedClientSite)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        <option value="">Select Organisation</option>
                                        {clientOrganisations.map(org => (
                                            <option key={org.id} value={org.id}>{org.name}</option>
                                        ))}
                                    </select>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdate(site.id)}
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
        </div>
    );
};

export default ClientSites;
