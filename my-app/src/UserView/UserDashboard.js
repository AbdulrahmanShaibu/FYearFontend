import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {
    Container, Typography, Grid, Paper, Button,
    Dialog, DialogTitle, DialogContent, Card, CardContent,
    DialogContentText, DialogActions, TextField
} from '@mui/material';
import UserHome from "./UserHome";
import axios from 'axios';

const UserDashboard = () => {
    const location = useLocation();
    const { state } = location;
    const { email } = state || {}; // Safely destructure email

    console.log('Received props:', state);
    console.log('Received email:', email);

    const [openDetails, setOpenDetails] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openIssue, setOpenIssue] = useState(false);

    const [complaints, setComplaints] = useState([]);
    const [status, setStatus] = useState([]);
    const [newComplaint, setNewComplaint] = useState({ description: '', submissionDate: new Date().toISOString().split('T')[0] });

    useEffect(() => {
        fetchRecentComplaints();
        fetchComplaintStatus();
    }, []);

    const fetchRecentComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list/StaffComplain');
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching recent complaints:', error);
        }
    };

    const fetchComplaintStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/complaints/status');
            setStatus(response.data);
        } catch (error) {
            console.error('Error fetching complaint status:', error);
        }
    };

    const handleNewComplaintChange = (e) => {
        setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value });
    };

    const handleSubmitNewComplaint = async () => {
        if (!email) {
            console.error('Email is not defined');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/v1/save/StaffComplain', { ...newComplaint, email });
            fetchRecentComplaints();
            handleCloseIssue();
        } catch (error) {
            console.error('Error submitting new complaint:', error);
        }
    };

    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    const handleOpenStatus = () => setOpenStatus(true);
    const handleCloseStatus = () => setOpenStatus(false);

    const handleOpenIssue = () => setOpenIssue(true);
    const handleCloseIssue = () => setOpenIssue(false);

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <UserHome />
            <Card sx={{ mt: 4, p: 4, boxShadow: 3 }}>
                <CardContent>
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
                                <img src={''} alt="Complaints" style={{ width: '100px', marginBottom: '10px' }} />
                                <Typography variant="h6" component="div">
                                    Recent Complaints
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    View the most recent complaints submitted by staff.
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleOpenDetails}>
                                    View Details
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
                                <img src={''} alt="Status" style={{ width: '100px', marginBottom: '10px' }} />
                                <Typography variant="h6" component="div">
                                    Complaint Status
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Check the status of your submitted complaints.
                                </Typography>
                                <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleOpenStatus}>
                                    Check Status
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', position: 'relative' }}>
                                <img src={''} alt="New Complaint" style={{ width: '100px', marginBottom: '10px' }} />
                                <Typography variant="h6" component="div">
                                    Make a New Complaint
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Click here to report a new issue.
                                </Typography>
                                <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleOpenIssue}>
                                    Report Issue
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Dialog open={openDetails} onClose={handleCloseDetails}>
                <DialogTitle>Complaint Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {complaints.length > 0 ? (
                            complaints.map((complaint, index) => (
                                <div key={index}>
                                    <Typography><strong>Description:</strong> {complaint.description}</Typography>
                                    <Typography><strong>Date:</strong> {new Date(complaint.submissionDate).toLocaleDateString()}</Typography>
                                    <Typography><strong>Submitted By:</strong> {complaint.staffs.email}</Typography>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <Typography>No recent complaints</Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetails} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openStatus} onClose={handleCloseStatus}>
                <DialogTitle>Complaint Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {status.length > 0 ? (
                            status.map((status, index) => (
                                <Typography key={index}>{status}</Typography>
                            ))
                        ) : (
                            <Typography>No complaint statuses available</Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStatus} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openIssue} onClose={handleCloseIssue}>
                <DialogTitle>Report Issue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newComplaint.description}
                            onChange={handleNewComplaintChange}
                        />
                        <TextField
                            margin="dense"
                            name="submissionDate"
                            label="Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={newComplaint.submissionDate}
                            onChange={handleNewComplaintChange}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIssue} color="primary">Close</Button>
                    <Button onClick={handleSubmitNewComplaint} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserDashboard;
