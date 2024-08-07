import React, { useEffect, useState } from "react";
import {
    Container, Grid, Table, TableRow, TableCell, TableHead, TableBody, TablePagination, Paper, Typography, Box,
    Alert
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
        <Container>
            <UserHome />
            <Box mt={8} mb={4}>
                <Alert
                    severity="info"
                    variant="outlined"
                    sx={{
                        mb: 4,
                        '& .MuiAlert-message': {  // Target the message area within the Alert
                            textAlign: 'center',
                            width: '100%',  // Ensure the text area takes full width
                        }
                    }}
                >
                    <Typography variant="body2">
                        Below is the list of all client organisations currently available.
                    </Typography>
                </Alert>
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
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={clientOrganisations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
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
        </Container>
    );
};

export default ViewClientOrganisations;
