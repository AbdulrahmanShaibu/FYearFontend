import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Table, TableHead, TableCell, Typography } from '@material-ui/core';
import { Grid, Box, CardContent, TableBody, Paper } from '@mui/material';
import UserHome from '../UserView/UserHome';


const UserWelcome = () => {
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

        <Box mt={5}>
            <Box mt={5}>
                <UserHome/>
                <Grid container justifyContent="center" style={{ marginTop: '150px' }}>
                    <Grid>
                        <Grid item md={12}>
                            <Card mb={4}>
                                {/* <Typography variant="h5" gutterBottom style={
                                    { textAlign: 'center' }
                                }>Overview</Typography> */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Cleaning Companies</Typography>
                                                <Typography variant="body1">{cleanersCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Client Organisations</Typography>
                                                <Typography variant="body1">{count}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Client Sites</Typography>
                                                <Typography variant="body1">{claimsCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Company Staffs</Typography>
                                                <Typography variant="body1">{staffsCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Staffs</Typography>
                                                <Typography variant="body1">{supervisorsCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Staffs Complain</Typography>
                                                <Typography variant="body1">{toolsCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    {/* <Grid item xs={12} sm={6} md={6}>
                                        <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                                            <CardContent>
                                                <Typography variant="subtitle2" color="textSecondary">Tools</Typography>
                                                <Typography variant="body1">{tasksCount}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid> */}
                                </Grid>
                            </Card>
                        </Grid>

                        <Card className="card">
                            <Card className="card-body">
                                {/* <Typography variant="h5" gutterBottom>Details List</Typography> */}
                                <Paper elevation={5}>
                                    <Table>
                                        <TableHead>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>All Client Organisations</TableCell>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>All Cleaning Companies</TableCell>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>All Client Sites</TableCell>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>All Tools</TableCell>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>All Staffs</TableCell>
                                            <TableCell style={{ backgroundColor: '#333', color: 'white' }}>Staffs Complain</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{cleanersCount}</TableCell>
                                            <TableCell>{count}</TableCell>
                                            <TableCell>{claimsCount}</TableCell>
                                            <TableCell>{tasksCount}</TableCell>
                                            <TableCell>{toolsCount}</TableCell>
                                            <TableCell>{supervisorsCount} (reported)</TableCell>
                                        </TableBody>
                                    </Table>
                                </Paper>
                                <div className="text-center mt-4">
                                    <Link to="/generated_report" className="btn btn-success btn-lg" style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}>Generate Report</Link>
                                </div>
                            </Card>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UserWelcome;
