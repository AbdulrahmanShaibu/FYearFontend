import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const PopUpForm = () => {

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
            <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary" onClick={openForm}>
                        <AddCircleIcon style={{ height: '25px' }} />
                    </IconButton>
                    <span style={{ fontSize: '18px', marginLeft: '8px' }}>Add</span>
                </div>
            </td>

            <Dialog open={isFormOpen} onClose={closeForm}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={saveData}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="default"
                                fullWidth
                                onClick={closeForm}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PopUpForm;
