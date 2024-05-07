import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserHome from "./UserHome";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import './styles/sidebar.css';

const UserDashboard = () => {
    const location = useLocation();
    const { state } = location;
    const { firstname, email } = state || {};

    console.log('Received props:', firstname, email);

    const [claimType, setClaimType] = useState('staffs');
    const [claimsDescription, setClaimsDescription] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');
    const [cleaners, setCleaners] = useState([]);
    const [selectedCleaner, setSelectedCleaner] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        fetchCleaners();
        fetchStaffs();
        fetchClaims();
    }, []);

    const fetchCleaners = () => {
        fetch('http://localhost:8080/api/v1/list/cleaner')
            .then(response => response.json())
            .then(data => {
                setCleaners(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching cleaners:', error));
    };

    const fetchStaffs = () => {
        fetch('http://localhost:8080/api/v1/list/staff')
            .then(response => response.json())
            .then(data => {
                setStaffs(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching staffs:', error));
    };

    const fetchClaims = () => {
        fetch('http://localhost:8080/api/v1/list/claims')
            .then(response => response.json())
            .then(data => {
                setClaims(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching claims:', error));
    };

    const saveAPI = 'http://localhost:8080/api/v1/save/claims';

    const saveClaims = () => {
        const data = {
            claimType: claimType,
            claimsDescription: claimsDescription,
            submissionDate: new Date(submissionDate).toISOString(),
            ...(claimType === 'staffs' ? { staff: { StaffID: selectedStaff } } : { cleaner: { CleanerID: selectedCleaner } })
        };

        fetch(saveAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                setClaims([...claims, data]);
                console.log(data);
            })
            .catch(error => console.error('Error saving claims:', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        saveClaims();

        setClaimsDescription('');
        setSubmissionDate('');
        setSelectedCleaner('');
        setSelectedStaff('');
    };

    return (
        <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
            <UserHome />
            <div>
                <div className="fetchingUserData">
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: 'green', fontWeight: 'bold' }}>Congratulations!</h2>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Welcome, {firstname}!</p>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Email: {email}</p>
                    <span style={{ fontSize: '14px', color: '#777', fontWeight: 'bold' }}>Any Claim from {firstname}! Please report 🤗</span>
                </div>

                <div>
                    <h2>Submit Claim</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="claimType" name="claimType" value={claimType} onChange={(e) => setClaimType(e.target.value)}>
                                    <FormControlLabel value="staffs" control={<Radio />} label="Staff Claim" />
                                    <FormControlLabel value="cleaners" control={<Radio />} label="Cleaner Claim" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        {claimType === 'staffs' && (
                            <div>
                                <FormControl>
                                    <Select value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                                        <MenuItem value="">Select Staff</MenuItem>
                                        {staffs.map(staff => (
                                            <MenuItem key={staff.StaffID} value={staff.StaffID}>{staff.StaffName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        )}
                        {claimType === 'cleaners' && (
                            <div>
                                <FormControl>
                                    <Select value={selectedCleaner} onChange={(e) => setSelectedCleaner(e.target.value)}>
                                        <MenuItem value="">Select Cleaner</MenuItem>
                                        {cleaners.map(cleaner => (
                                            <MenuItem key={cleaner.CleanerID} value={cleaner.CleanerID}>{cleaner.CleanerName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        )}
                        <div>
                            <TextField
                                label="Claims Description"
                                variant="outlined"
                                value={claimsDescription}
                                onChange={(e) => setClaimsDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Submission Date"
                                type="date"
                                variant="outlined"
                                value={submissionDate}
                                onChange={(e) => setSubmissionDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </form>

                    <h2>Submitted Claims</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Submission Date</TableCell>
                                    <TableCell>Submitted By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {claims.map(claim => (
                                    <TableRow key={claim.ClaimID}>
                                        <TableCell>{claim.ClaimID}</TableCell>
                                        <TableCell>{claim.ClaimType}</TableCell>
                                        <TableCell>{claim.claimsDescription}</TableCell>
                                        <TableCell>{claim.submissionDate}</TableCell>
                                        <TableCell>
                                            {claim.claimType === 'staffs' ?
                                                claim.staffs.map(staff => staff.staffName).join(', ') :
                                                claim.cleaners.map(cleaner => cleaner.cleanerName).join(', ')
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
