import React, { useState } from "react";
import Home from "./Home";
import IconButton from '@mui/material/IconButton';
// import AddIcon from '@material-ui/icons/Add';
// import AddCircleIcon from '@material-ui/icons';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PopUpForm from "./PopupForm";

const Organisers = () => {

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
            <Home />
            {/* <div className="OrgList">Organisers List</div> */}
            <div style={{ overflowX: 'auto' }} className='table-Contents'>
                <h2 style={
                    {
                        fontSize: '24px',
                        color: '#333',
                        backgroundColor: 'lightblue',
                        paddingTop: '80px',
                        border: '1px solid #ccc',
                        textAlign: 'center',
                        height: 'auto',
                        width: 'auto',
                        margin: 'auto'
                    }
                }>Organisers List</h2>
                <table style={{
                    width: 'fit-content',
                    margin: 'auto',
                    // height:'20vh'
                }}>
                    <thead style={{ backgroundColor: 'white' }}>
                        <tr>
                            <th className='t-heading'>First Name</th>
                            <th className='t-heading'>Last Name</th>
                            <th className='t-heading'>Data</th>
                            <th className='t-heading'>Data</th>
                            <th className='t-heading'>Add Details</th>
                            <th className='t-heading'>Update Details</th>
                            <th className='t-heading'>Delete Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jill</td>
                            <td>Smith</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton color="primary" onClick={openForm}>
                                        <AddCircleIcon style={{ height: '25px' }} />
                                    </IconButton>
                                    <span style={{ fontSize: '18px', marginLeft: '8px' }}>Add</span>
                                </div>
                            </td>
                            <Dialog open={isFormOpen} onClose={closeForm}>
                                <h5 style={{
                                    height: 'fit - content',
                                    margin: 'auto',
                                    color: '#333',
                                    fontFamily: 'Arial, sans-serif; readability',
                                    fontWeight: 'normal',
                                    textAlign: 'center'
                                }}>Please Fill Form Data</h5>
                                <DialogContent style={{ backgroundColor: 'lightblue' }}><hr />
                                    <Grid container spacing={2} style={{ width: '300px', height: '350px' }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="First Name"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                            /><hr />
                                        </Grid>
                                        <Grid item xs={12} style={{
                                            // display: 'flex',
                                            justifyContent: 'space-between',
                                            marginLeft: '1px',
                                            display: 'flex',
                                            backgroundColor: 'white',
                                            height: 'fit-content'

                                        }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={saveData}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                onClick={closeForm}
                                            >
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                            </Dialog>

                            <td>
                                <IconButton color="primary">
                                    <EditIcon style={
                                        { height: '25px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Edit</div>
                                </IconButton>
                            </td>
                            <td>
                                <IconButton color="secondary">
                                    <DeleteIcon style={
                                        { height: '24px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Delete</div>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>Eve</td>
                            <td>Jackson</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton color="primary">
                                        <AddCircleIcon style={{ height: '25px' }} />
                                    </IconButton>
                                    <span style={{ fontSize: '18px', marginLeft: '8px' }}>Add</span>
                                </div>
                            </td>
                            <td>
                                <IconButton color="primary">
                                    <EditIcon style={
                                        { height: '25px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Edit</div>
                                </IconButton>
                            </td>
                            <td>

                                <IconButton color="secondary">
                                    <DeleteIcon style={
                                        { height: '24px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Delete</div>
                                </IconButton>
                            </td>
                        </tr>
                        <tr>
                            <td>Adam</td>
                            <td>Johnson</td>
                            <td>Data</td>
                            <td>Data</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton color="primary">
                                        <AddCircleIcon style={{ height: '25px' }} />
                                    </IconButton>
                                    <span style={{ fontSize: '18px', marginLeft: '8px' }}>Add</span>
                                </div>
                            </td>
                            <td>
                                <IconButton color="primary">
                                    <EditIcon style={
                                        { height: '25px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Edit</div>
                                </IconButton>
                            </td>
                            <td>

                                <IconButton color="secondary">
                                    <DeleteIcon style={
                                        { height: '24px' }
                                    } /><div style={{
                                        fontSize: '18px'
                                    }}>Delete</div>
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    );
}
export default Organisers;