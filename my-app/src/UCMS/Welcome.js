import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import { Card, Table, TableHead, TableCell, Typography, TableRow, TableBody, Box, Grid, CardContent, Paper } from '@mui/material';

const Welcome = () => {
    const countAPI = 'http://localhost:8080/api/v1/count/cleaning/company';
    const countCleaners = 'http://localhost:8080/api/v1/count/ClientOrganisations';
    const countClaims = 'http://localhost:8080/api/v1/count/client-site';
    const countStaffs = 'http://localhost:8080/api/v1/count/company-staff';
    const countTools = 'http://localhost:8080/api/v1/staffs/count';
    const countSupervisors = 'http://localhost:8080/api/v1/count/StaffComplain';
    const countTasks = 'http://localhost:8080/api/v1/count/tools';

    const [count, setCount] = useState(0);
    const [cleanersCount, setCleanersCount] = useState(0);
    const [claimsCount, setClaimsCount] = useState(0);
    const [staffsCount, setStaffsCount] = useState(0);
    const [toolsCount, setToolsCount] = useState(0);
    const [supervisorsCount, setSupervisorsCount] = useState(0);
    const [tasksCount, setTasksCount] = useState(0);

    useEffect(() => {
        axios.get(countAPI).then(response => setCount(response.data)).catch(console.error);
        axios.get(countCleaners).then(response => setCleanersCount(response.data)).catch(console.error);
        axios.get(countClaims).then(response => setClaimsCount(response.data)).catch(console.error);
        axios.get(countStaffs).then(response => setStaffsCount(response.data)).catch(console.error);
        axios.get(countTools).then(response => setToolsCount(response.data)).catch(console.error);
        axios.get(countSupervisors).then(response => setSupervisorsCount(response.data)).catch(console.error);
        axios.get(countTasks).then(response => setTasksCount(response.data)).catch(console.error);
    }, []);

    return (
        <Box mt={5} p={2}>
            <Home />
            <Grid container spacing={3} justifyContent="center" mt={5}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom align="center" color="primary">Overview</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Cleaning Companies</Typography>
                                    <Typography variant="h6" color="textPrimary">{cleanersCount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Client Organisations</Typography>
                                    <Typography variant="h6" color="textPrimary">{count}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Client Sites</Typography>
                                    <Typography variant="h6" color="textPrimary">{claimsCount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Company Staffs</Typography>
                                    <Typography variant="h6" color="textPrimary">{staffsCount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Staffs</Typography>
                                    <Typography variant="h6" color="textPrimary">{supervisorsCount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card variant="outlined" sx={{ backgroundColor: '#e3f2fd', borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="textSecondary">Staffs Complain</Typography>
                                    <Typography variant="h6" color="textPrimary">{toolsCount}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={4} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom align="center" color="primary">Details List</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Client Organisations</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Cleaning Companies</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Client Sites</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Tools</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Staffs</TableCell>
                                    <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Staffs Complain</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{cleanersCount}</TableCell>
                                    <TableCell>{count}</TableCell>
                                    <TableCell>{claimsCount}</TableCell>
                                    <TableCell>{tasksCount}</TableCell>
                                    <TableCell>{toolsCount}</TableCell>
                                    <TableCell>{supervisorsCount} (reported)</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                    <Box textAlign="center" mt={4}>
                        <Link to="/generated_report" style={{ textDecoration: 'none' }}>
                            <Typography variant="button" className="btn btn-success btn-lg" sx={{
                                borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', padding: '10px 20px', backgroundColor: '#28a745', color: 'white'
                            }}>Generate Report</Typography>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Welcome;
