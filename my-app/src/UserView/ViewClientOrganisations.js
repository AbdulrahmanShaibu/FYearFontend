import React, { useEffect, useState } from "react";
import '../styles/form.css';
import {
    Container, Grid, Table, TableRow, TableCell, TableHead, TableBody, TablePagination
} from '@mui/material';
import { Paper } from "@material-ui/core";
import axios from "axios";
import Home from "../UCMS/Home";
import UserHome from "./UserHome";

const ViewClientOrganisations = () => {

    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // Fetch initial data on component mount
    useEffect(() => {
        // Fetch client organisations
        axios.get('http://localhost:8080/api/v1/ClientOrganisation/list')
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.log('Error while listing data:', error);
            });

    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Handle page change in pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change in pagination
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
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
        </Container>
    );
};

export default ViewClientOrganisations;
