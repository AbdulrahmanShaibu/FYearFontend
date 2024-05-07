import React from "react"
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogTitle, Typography } from "@mui/material";

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
                <DialogContent style={{ backgroundColor: '#f9f9f9', width: '260px', padding: '20px' }}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Cleaner Name" type="text" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Gender" type="text" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Department ID" type="number" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Tool ID" type="number" fullWidth required />
                            </Grid>
                            <Grid item xs={12} container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={saveData}>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="default" onClick={closeForm}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default CleanersFormComponent