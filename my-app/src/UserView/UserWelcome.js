import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Grid, Typography, Box, CardContent, Paper } from '@mui/material';
import UserHome from '../UserView/UserHome';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import BuildIcon from '@mui/icons-material/Build';

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

    const cardData = [
        { title: 'Cleaning Companies', count: cleanersCount, icon: <BusinessIcon fontSize="large" sx={{ color: '#1976d2' }} /> },
        { title: 'Client Organisations', count: count, icon: <GroupIcon fontSize="large" sx={{ color: '#388e3c' }} /> },
        { title: 'Client Sites', count: claimsCount, icon: <LocationCityIcon fontSize="large" sx={{ color: '#7b1fa2' }} /> },
        { title: 'Company Staffs', count: staffsCount, icon: <SupervisorAccountIcon fontSize="large" sx={{ color: '#fbc02d' }} /> },
        { title: 'Staffs Complain', count: supervisorsCount, icon: <ReportProblemIcon fontSize="large" sx={{ color: '#d32f2f' }} /> },
        { title: 'Staffs', count: toolsCount, icon: <BuildIcon fontSize="large" sx={{ color: '#0288d1' }} /> },
    ];

    return (
        <Box mt={5} p={2}>
            <UserHome />
            <Grid container spacing={3} justifyContent="center" mt={5}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        {cardData.map((data, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        borderRadius: 2,
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                >
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#f1f8e9',
                                            borderRadius: 2,
                                            // boxShadow: '0 3px 5px 2px rgba(60, 90, 100, .3)',
                                        }}
                                    >
                                        <CardContent>
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {data.title}
                                                </Typography>
                                                <Box>{data.icon}</Box>
                                            </Box>
                                            <Typography variant="h4" color="textPrimary" mt={2}>
                                                {data.count}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserWelcome;
