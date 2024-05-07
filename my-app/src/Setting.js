import React, { useState } from 'react';
import Home from './Home';
import {
    Paper, Typography, List, ListItem, ListItemText,
    Drawer, Divider, Button, TextField
} from '@mui/material';
// import { makeStyles } from '@mui/material';
//import { makeStyles } from '@mui/styles';


import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//     drawer: {
//         width: 300,
//     },
//     content: {
//         padding: theme.spacing(2),
//     },
// }));

const Setting = () => {

    // const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('JohnDoe'); // Example initial values
    const [email, setEmail] = useState('johndoe@example.com');

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Function to handle user information update
    const updatePersonalInfo = () => {
        // Implement logic to update personal information here
    }

    // Function to handle account settings update
    const updateAccountSettings = () => {
        // Implement logic to update account settings here
    }

    // Function to manage notification preferences
    const updateNotificationPreferences = () => {
        // Implement logic to update notification preferences here
    }

    return (
        <div style={{ backgroundColor: 'rgb(100, 200, 200)' }}>
            <Home />
            <Paper elevation={10} style={
                {
                    padding: '20px',
                    margin: 'auto',
                    width: '400px',
                    marginTop: '200px',
                    // height:'35vh'

                }}>
                <Typography variant="h5" style={{
                    backgroundColor: 'lightblue',
                    color: 'white',
                    fontWeight: 'bolder',
                    textAlign:'center'
                }}>User Settings</Typography>
                <Divider />

                <List style={{ backgroundColor: 'white', color: 'black' }}>
                    <Link to='/personal_details'>
                        <ListItem button onClick={updatePersonalInfo}>
                            <ListItemText primary="Personal Information" style={
                                {
                                    textDecoration: 'none',
                                    color: 'black'
                                }
                            } />
                        </ListItem>
                    </Link>

                    {/* <Divider /> */}

                    <Link to='/user_account_setting'>
                        {/* <ListItem button onClick={updateAccountSettings}>
                            <ListItemText primary="Account Settings" />
                        </ListItem> */}
                        <ListItem button onClick={toggleDrawer}>
                            <ListItemText primary="Account Settings" style={{
                                textDecoration: 'none',
                                color: 'black',
                                // backgroundColor:'white'
                            }} />
                        </ListItem>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                            {/* <div className={classes.drawer}> */}
                            <div>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Account Settings" />
                                    </ListItem>
                                </List>
                                <Divider />
                                {/* <div className={classes.drawer}> */}
                                <div>
                                    <TextField
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={updateAccountSettings}
                                    >
                                        Update Settings
                                    </Button>
                                </div>
                            </div>
                        </Drawer>
                    </Link>
                    {/* <Divider /> */}
                    <ListItem button onClick={updateNotificationPreferences}>
                        <ListItemText primary="Notification Preferences" />
                    </ListItem>
                </List>
            </Paper>
        </div>
    );
}

export default Setting;
