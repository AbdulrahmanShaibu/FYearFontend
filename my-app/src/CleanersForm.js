import React from "react"
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Select,FormControl, InputLabel
} from '@mui/material';
import { DialogTitle, Typography, Menu, MenuItem } from "@mui/material";


const CleanersFormComponent = () => {

    const [isFormOpen, setFormOpen] = useState(false);
    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    const saveData = () => {
        alert('demo for saving data!');
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" onClick={openForm}>
                    <AddCircleIcon style={{ height: '25px' }} />
                </IconButton>
                <span style={{ fontSize: '18px', marginLeft: '8px' }}>Add</span>
            </div>
            <Dialog open={isFormOpen} onClose={closeForm}>
                <DialogTitle>
                    <Typography variant="h6" align="center" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}>
                        Cleaners Form
                    </Typography>
                </DialogTitle>
                <DialogContent style={{ backgroundColor: '#f9f9f9', width: '400px', padding: '20px', borderRadius: '0px' }}>
                    <form>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField label="Cleaner Name" fullWidth variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="department-label">Department ID</InputLabel>
                                    <Select labelId="department-label" label="Department ID">
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="tools-label">Tools ID</InputLabel>
                                    <Select labelId="tools-label" label="Tools ID">
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} textAlign="right">
                                <Button onClick={saveData} variant="contained" color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default CleanersFormComponent