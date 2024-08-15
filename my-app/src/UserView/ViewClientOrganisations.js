import React, { useEffect, useState } from "react";
import {
    Container, Grid, Table, TableRow, TableCell, TableHead, TableBody, TablePagination, Paper, Typography, Box,
    Alert,
    TableContainer,
    TableFooter
} from '@mui/material';
import axios from "axios";
import UserHome from "./UserHome";

const ViewClientOrganisations = () => {

    const [clientOrganisations, setClientOrganisations] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/ClientOrganisation/list')
            .then(response => {
                setClientOrganisations(response.data);
            })
            .catch(error => {
                console.log('Error while listing data:', error);
            });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <UserHome />
            <Box mt={4} mb={4}>
                <Alert
                    severity="info"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        backgroundColor: '#e3f2fd',
                        borderColor: '#90caf9',
                        '& .MuiAlert-message': {
                            width: '100%',
                        }
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Below is the list of all client organisations currently available.
                    </Typography>
                </Alert>
            </Box>
            <Paper elevation={3}>
                <TableContainer component={Box} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="client organisations table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>S/N</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Client Organisation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientOrganisations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((clientOrganisation, index) => (
                                <TableRow key={clientOrganisation.id} hover>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell align="center">{clientOrganisation.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={2}
                                    count={clientOrganisations.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{
                                        borderTop: '1px solid #e0e0e0',
                                        '.MuiTablePagination-select': {
                                            marginLeft: 2,
                                        },
                                        '.MuiTablePagination-actions': {
                                            marginRight: 2,
                                        }
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ViewClientOrganisations;
