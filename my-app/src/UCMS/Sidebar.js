// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Assignment, Build, Business, PersonAddAlt, People, SupervisorAccount, SwapVert } from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar }) => {

    // Function for sign out
    function signOut() {
        alert("To be implemented, this is just a demo!");
    }


    const styles = {
        icon: {
            fontSize: '24px', // Icon size
            marginRight: '30px', // Space between icon and text
            color: '#2c3e50', // Icon color
        },
        text: {
            fontSize: '16px', // Text size
            fontWeight: 'bold', // Bold font weight
            color: '#34495e', // Text color
        },
    };

    return (
        <Drawer anchor="left" open={open} onClose={toggleSidebar}>
            <div className="offcanvas-body">
                <List className="list-group">
                    <div style={{
                        // backgroundColor: '#a8d5e5',
                        backgroundColor: 'white',
                        color: 'white',
                        padding: '10px', // padding icons and texts
                    }}>
                        {/* Dashboard Link */}
                        <ListItem button>
                            <ListItemText>
                                <Link className="flex items-center space-x-2 py-1 group hover:bg-gray-100 hover:text-indigo-700" to="/university_events/dashboard_view">
                                    <div style={{ padding: '16px', backgroundColor: '#0077B6', color: 'white', textAlign: 'center' }}>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                            UCMS
                                        </Typography>
                                    </div>
                                    <br />
                                    <DashboardIcon style={styles.icon} />
                                    <span style={styles.text}>Home</span>
                                </Link>
                            </ListItemText>
                        </ListItem>
                        {/* cleaning_company */}
                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/cleaning_company'}>
                                    <People style={styles.icon} />
                                    <span style={styles.text}>Cleaning Company</span>
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/company_staffs'}>
                                    <People style={styles.icon} />
                                    <span style={styles.text}>Company Staffs</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/client_organisation'}>
                                    <AssignmentTurnedInIcon style={styles.icon} />
                                    <span style={styles.text}>Client Organisation</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/client_sites'}>
                                    <Business style={styles.icon} />
                                    <span style={styles.text}>Client Sites</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        {/* Other Links */}
                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/staffs'}>
                                    <SupervisorAccount style={styles.icon} />
                                    <span style={styles.text}>Staffs</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/tools'}>
                                    <Build style={styles.icon} />
                                    <span style={styles.text}>Tools</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/staff_complain'}>
                                    <Assignment style={styles.icon} />
                                    <span style={styles.text}>Staff Complains</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/claim_type'}>
                                    <PersonAddAlt style={styles.icon} />
                                    <span style={styles.text}>Complain Type</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/attachements'}>
                                    <LocationCityIcon style={styles.icon} />
                                    <span style={styles.text}>Attachements</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        {/* Settings and Sign out */}
                        {/* <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/user_setting'}>
                                    <SettingsIcon style={styles.icon} />
                                    <span style={styles.text}>Settings</span>
                                </Link>
                            </ListItemText>
                        </ListItem> */}

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/signout'}>
                                    <IconButton style={styles.icon}><ExitToAppIcon /></IconButton>
                                    <span style={styles.text} onClick={signOut}>Sign Out</span>
                                </Link>
                            </ListItemText>
                        </ListItem>
                    </div>
                </List>
            </div>
        </Drawer>
    );
};

export default Sidebar;
