import React, { useState, useEffect } from "react";
import axios from 'axios';
import Home from "./Home";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
    DialogTitle, Typography, Paper, Table, TableHead,
    TableBody, TableRow, TableCell, Container, Snackbar, Alert
} from "@mui/material";
import { Add, Info } from "@mui/icons-material";

const ClaimType = () => {
    const [claimTypes, setClaimTypes] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentClaimType, setCurrentClaimType] = useState({ id: '', type: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchClaimTypes();
    }, []);

    const fetchClaimTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/list/claim-type');
            setClaimTypes(response.data);
        } catch (error) {
            console.error("There was an error fetching the claim types!", error);
        }
    };

    const handleDialogOpen = (claimType = { id: '', type: '' }) => {
        setCurrentClaimType(claimType);
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentClaimType({ ...currentClaimType, [name]: value });
    };

    const handleSave = async () => {
        try {
            if (currentClaimType.id) {
                await axios.put(`http://localhost:8080/api/v1/update/list/claim-type/${currentClaimType.id}`, currentClaimType);
            } else {
                await axios.post('http://localhost:8080/api/v1/post/claim-type', currentClaimType);
            }
            setSnackbar({ open: true, message: 'Claim Type saved successfully', severity: 'success' });
            fetchClaimTypes();
            handleDialogClose();
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to save Claim Type', severity: 'error' });
            console.error("There was an error saving the claim type!", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/delete/claim-type/${id}`);
            setSnackbar({ open: true, message: 'Claim Type deleted successfully', severity: 'success' });
            fetchClaimTypes();
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to delete Claim Type', severity: 'error' });
            console.error("There was an error deleting the claim type!", error);
        }
    };

    return (
        <Container>
            <Home />
            <br /> <br /> <br />
            <Typography
                variant="h5"
                gutterBottom
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                    backgroundColor: 'whitesmoke',
                    color: '#333', // A darker color for better readability
                    fontWeight: '10' // Slightly bolder text for emphasis
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '20px', color: '#444', fontWeight: '600' }}>
                        <Info style={{ marginRight: '8px', color: '#1976d2', fontSize: '26px' }} /> {/* Info icon with updated size */}
                        Claim Types Management
                    </span>

                    <Button
                        color="primary"
                        onClick={() => handleDialogOpen()}
                        style={{
                            fontWeight: '600',
                            textTransform: 'none',
                            borderRadius: '12px',
                            padding: '14px 28px', // Increased padding for better click area
                            display: 'flex',
                            backgroundColor: '#1976d2', //1976d2
                            color: 'white',
                            alignItems: 'center',
                            gap: '12px', // Increased space between text and icon
                            // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Enhanced shadow for depth
                            transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transition for hover effects
                        }}
                    >
                        Add Claim Type
                        <Add style={{ fontSize: '20px' }} /> {/* Icon with a consistent size */}
                    </Button>
                </div>

            </Typography>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claimTypes.map((claimType) => (
                            <TableRow key={claimType.id}>
                                <TableCell>{claimType.id}</TableCell>
                                <TableCell>{claimType.type}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDialogOpen(claimType)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(claimType.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>{currentClaimType.id ? 'Edit Claim Type' : 'Add Claim Type'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="type"
                                label="Type"
                                fullWidth
                                value={currentClaimType.type}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSave} color="primary" variant="contained">
                                Save
                            </Button>
                            <Button onClick={handleDialogClose} color="secondary" variant="outlined">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ClaimType;
