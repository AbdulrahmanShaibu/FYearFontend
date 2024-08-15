import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import { Card, Typography, Box, Grid, CardContent, Paper } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BuildIcon from '@mui/icons-material/Build';

import { keyframes } from '@emotion/react';

const Welcome = () => {

    const fadeIn = keyframes`
    from {
     opacity: 0;
     transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

    const cardStyle = {
        backgroundColor: '#e3f2fd',
        borderRadius: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        animation: `${fadeIn} 0.6s ease forwards`,
    };

    const countCleaningCompany = 'http://localhost:8080/api/v1/count/cleaning/company';
    const countClientOrganisation = 'http://localhost:8080/api/v1/count/ClientOrganisations';
    const countClientSite = 'http://localhost:8080/api/v1/count/client-site';
    const countCompanyStaffs = 'http://localhost:8080/api/v1/count/company-staff';
    const countStaffs = 'http://localhost:8080/api/v1/staffs/count';
    const countStaffsComplain = 'http://localhost:8080/api/v1/count/StaffComplain';
    const CountTools = 'http://localhost:8080/api/v1/count/tools';
    const CountAttachments = 'http://localhost:8080/api/v1/count/attachments';

    const [count, setCleaningCompanyCount] = useState(0);
    const [clientOrganisationCount, setClientOrganisationCount] = useState(0);
    const [clientSite, setClientSiteCount] = useState(0);
    const [staffsCount, setCompanyStaffsCount] = useState(0);
    const [staffs, setStaffsCount] = useState(0);
    const [staffsComplainCount, setStaffsComplainCount] = useState(0);
    const [tools, setToolsCount] = useState(0);
    const [attachements, setAttachmentCount] = useState(0);

    useEffect(() => {
        axios.get(countCleaningCompany).then(response => setCleaningCompanyCount(response.data)).catch(console.error);
        axios.get(countClientOrganisation).then(response => setClientOrganisationCount(response.data)).catch(console.error);
        axios.get(countClientSite).then(response => setClientSiteCount(response.data)).catch(console.error);
        axios.get(countCompanyStaffs).then(response => setCompanyStaffsCount(response.data)).catch(console.error);
        axios.get(countStaffs).then(response => setStaffsCount(response.data)).catch(console.error);
        axios.get(countStaffsComplain).then(response => setStaffsComplainCount(response.data)).catch(console.error);
        axios.get(CountTools).then(response => setToolsCount(response.data)).catch(console.error);
        axios.get(CountAttachments).then(response => setAttachmentCount(response.data)).catch(console.error);
    }, []);

    return (
        <Box mt={15} p={2}>
            <Home />
            <Grid container spacing={3} justifyContent="center" mt={5} width="80%" margin="auto">
                <Grid item xs={12} md={10}>
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container spacing={2} justifyContent="center">
                                {[
                                    { icon: <BusinessIcon style={{ color: '#007bff' }} />, label: 'Client Organizations', value: clientOrganisationCount },
                                    { icon: <CleaningServicesIcon style={{ color: '#28a745' }} />, label: 'Cleaning Companies', value: count },
                                    { icon: <LocationCityIcon style={{ color: '#17a2b8' }} />, label: 'Client Sites', value: clientSite },
                                    { icon: <BuildIcon style={{ color: '#ffc107' }} />, label: 'Tools', value: tools },
                                    { icon: <PeopleIcon style={{ color: '#6f42c1' }} />, label: 'Company Staffs', value: staffsCount },
                                    { icon: <ReportProblemIcon style={{ color: '#dc3545' }} />, label: 'Staff Complaints', value: staffsComplainCount },
                                    { icon: <AttachFileIcon style={{ color: '#fd7e14' }} />, label: 'Attachments', value: attachements },
                                    { icon: <PersonIcon style={{ color: '#20c997' }} />, label: 'Staffs', value: staffs },

                                ].map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card variant="outlined" sx={cardStyle}>
                                            <CardContent>
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                        {item.icon}
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="textSecondary">
                                                            {item.label}
                                                        </Typography>
                                                        <Typography variant="h6" color="textPrimary">
                                                            {item.value}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box textAlign="center" mt={4}>
                        <Link to="/generated_report" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                sx={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#218838',
                                    },
                                }}
                            >
                                <Typography variant="button">
                                    Generate Report
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Welcome;
