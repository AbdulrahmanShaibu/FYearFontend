import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserHome from "./UserHome";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel, FormControl, Select, MenuItem, TextField, Button } from '@material-ui/core';
import '../styles/sidebar.css';

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

    const style={
        table:{
          backgroundColor:'black',
          color:'white',
          fontWeight:'bold'
        }
      }
      
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            claimType: claimType,
            claimsDescription: claimsDescription,
            submissionDate: submissionDate,
            staffs: claimType === 'staffs' ? [{ staffID: selectedStaff }] : [],
            cleaners: claimType === 'cleaners' ? [{ cleanerID: selectedCleaner }] : []
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

        // Reset form fields
        setClaimType('staffs');
        setClaimsDescription('');
        setSubmissionDate('');
        setSelectedCleaner('');
        setSelectedStaff('');
    };

    return (
        <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
            <UserHome />
            <div>
                <div style={{ margin: 'auto', width: '25%' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: 'green', fontWeight: 'bold' }}>Congratulations!</h2>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Welcome, {firstname}!</p>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Email: {email}</p>
                    <span style={{ fontSize: '14px', color: '#777', fontWeight: 'bold' }}>Any Claim from {firstname}! Please report 🤗</span>
                </div>

                <br /><br />

                <div style={{ margin: 'auto', backgroundColor: 'whitesmoke' }}>
                    <h2 style={{ margin: 'auto', width: '25%', fontWeight: 'bold' }}>Submit Claims</h2>
                    <div style={{ margin: 'auto' }}>
                        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
                            <FormControl component="fieldset">
                                <RadioGroup style={{ display: 'flex' }} aria-label="claimType" name="claimType" value={claimType} onChange={(e) => setClaimType(e.target.value)}>
                                    <FormControlLabel value="staffs" control={<Radio />} label="Staff Claim" style={{ marginRight: '10px' }} />
                                    <FormControlLabel value="cleaners" control={<Radio />} label="Cleaner Claim" />
                                </RadioGroup>
                            </FormControl>
                            {claimType === 'staffs' && (
                                <div>
                                    <FormControl>
                                        <select
                                            style={{ height: '40px' }}
                                            value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                                            <option value="">Select Staff Name</option>
                                            {staffs.map(staff => (
                                                <option key={staff.StaffID} value={staff.StaffID}>{staff.StaffName}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                </div>
                            )}
                            {claimType === 'cleaners' && (
                                <div>
                                    <FormControl>
                                        <select
                                            style={{ height: '40px' }}
                                            value={selectedCleaner} onChange={(e) => setSelectedCleaner(e.target.value)}>
                                            <option value="">Select Cleaner Name</option>
                                            {cleaners.map(cleaner => (
                                                <option key={cleaner.CleanerID} value={cleaner.CleanerID}>{cleaner.CleanerName}</option>
                                            ))}
                                        </select>
                                    </FormControl>
                                </div>
                            )}
                            <div>
                                <TextField
                                    placeholder="Claims Description..."
                                    style={{ width: '100%' }}
                                    value={claimsDescription}
                                    onChange={(e) => setClaimsDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="date"
                                    style={{ width: '100%' }}
                                    value={submissionDate}
                                    onChange={(e) => setSubmissionDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <Button style={{ marginTop: '10px' }} variant="contained" color="primary" type="submit">Submit</Button>
                        </form>

                    </div>

                    {/* <h2>Submitted Claims</h2> */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={style.table}>ID</TableCell>
                                    <TableCell style={style.table}>Type</TableCell>
                                    <TableCell style={style.table}>Description</TableCell>
                                    <TableCell style={style.table}>Submission Date</TableCell>
                                    <TableCell style={style.table}>Submitted By</TableCell>
                                    <TableCell style={style.table}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {claims.map((claim, index) => (
                                    <TableRow key={claim.ClaimID}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{claim.claimType}</TableCell>
                                        <TableCell>{claim.claimsDescription}</TableCell>
                                        <TableCell>{claim.submissionDate}</TableCell>
                                        <TableCell>
                                            {claimType === 'staffs' ?
                                                staffs.find(staff => staff.staffID === claim.staffs[0]?.staffID)?.staffName :
                                                cleaners.find(cleaner => cleaner.cleanerID === claim.cleaners[0]?.cleanerID)?.cleanerName
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
