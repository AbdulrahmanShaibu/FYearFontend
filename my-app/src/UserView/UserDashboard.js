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
    const email = state?.email || '';

    const [openDetails, setOpenDetails] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openIssue, setOpenIssue] = useState(false);

    const [complaints, setComplaints] = useState([]);
    const [status, setStatus] = useState([]);
    const [newComplaint, setNewComplaint] = useState({ description: '', submissionDate: new Date().toISOString().split('T')[0] });
    const [staffDetails, setStaffDetails] = useState(null);

    useEffect(() => {
        fetchRecentComplaints();
        fetchComplaintStatus();
        fetchStaffDetails();
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

    const fetchStaffDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/get/staff-details', {
                params: { email: email },
            });
            setStaffDetails(response.data);
        } catch (error) {
            console.error('Error fetching staff details:', error);
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
            await axios.post('http://localhost:8080/api/v1/save/staff-complain', null, {
                params: { email: email },
                data: newComplaint,
            });
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
            {staffDetails && (
                <Card sx={{ mt: 4, p: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Staff Details</Typography>
                        <Typography>Email: {staffDetails.email}</Typography>
                        <Typography>Name: {staffDetails.name}</Typography>
                        {/* Add more fields as needed */}
                    </CardContent>
                </Card>
            )}
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
                                    <Typography><strong>Submission Date:</strong> {complaint.submissionDate}</Typography>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <Typography>No recent complaints found.</Typography>
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
                            status.map((complaintStatus, index) => (
                                <div key={index}>
                                    <Typography><strong>Status:</strong> {complaintStatus}</Typography>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <Typography>No status available.</Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStatus} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openIssue} onClose={handleCloseIssue}>
                <DialogTitle>Report a New Issue</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        name="description"
                        fullWidth
                        value={newComplaint.description}
                        onChange={handleNewComplaintChange}
                    />
                    <TextField
                        margin="dense"
                        label="Submission Date"
                        type="date"
                        name="submissionDate"
                        fullWidth
                        value={newComplaint.submissionDate}
                        onChange={handleNewComplaintChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIssue} color="primary">Cancel</Button>
                    <Button onClick={handleSubmitNewComplaint} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserDashboard;
