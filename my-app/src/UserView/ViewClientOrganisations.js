import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import '../styles/form.css';
import {
    Container, Grid, Table, TableRow, TableCell, TableHead, TableBody, TablePagination
} from '@mui/material';
import { Paper } from "@material-ui/core";
import axios from "axios";
import Home from "../UCMS/Home";
=======
import {
    Container, Grid, Table, TableRow, TableCell, TableHead, TableBody, TablePagination, Paper, Typography, Box
} from '@mui/material';
import axios from "axios";
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
import UserHome from "./UserHome";

const ViewClientOrganisations = () => {

    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
<<<<<<< HEAD
    // Fetch initial data on component mount
    useEffect(() => {
        // Fetch client organisations
=======

    useEffect(() => {
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
        axios.get('http://localhost:8080/api/v1/ClientOrganisation/list')
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.log('Error while listing data:', error);
            });
<<<<<<< HEAD

    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Handle page change in pagination
=======
    }, []);

>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

<<<<<<< HEAD
    // Handle rows per page change in pagination
=======
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
<<<<<<< HEAD
            <UserHome/>
            <br /> <br /> <br /> <br />
            <br /> <br />
            <h2 style={{fontSize:'25px'}}>Available Client Organisations</h2><br/>
            <Paper elevation={1} style={{ width: '90%', height: '100%' }}>
                <Grid container>
                    <Grid style={{ width: '50%', height: '100%' }}>
                        <div style={{ margin: 'auto' }}>
                            <Table>
                                <TableHead className="thead-dark">
                                    <TableRow>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>S/N</TableCell>
                                        <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Client Organisation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientOrganisations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((clientOrganisation, index) => (
                                        <TableRow key={clientOrganisation.id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{clientOrganisation.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
=======
            <UserHome />
            <Box mt={8} mb={4}>
                <Typography variant="h4" align="center" gutterBottom>
                    Available Client Organisations
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary">
                    Below is the list of all client organisations currently available.
                </Typography>
            </Box>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>S/N</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Client Organisation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientOrganisations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((clientOrganisation, index) => (
                                    <TableRow key={clientOrganisation.id}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{clientOrganisation.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={clientOrganisations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
<<<<<<< HEAD
                        />
                    </Grid>
                </Grid>
            </Paper>
=======
                            sx={{
                                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows': {
                                    marginBottom: '0'
                                },
                                '& .MuiTablePagination-actions': {
                                    paddingRight: '2rem',
                                },
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
        </Container>
    );
};

export default ViewClientOrganisations;
