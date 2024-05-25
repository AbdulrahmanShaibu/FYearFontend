// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Container, Paper } from '@mui/material';
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
                                    <div style={{
                                        backgroundColor: '#0077B6',
                                        color: 'white',
                                        padding: '8px 15px',
                                        borderRadius: '5px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}>UCMS</div>
                                    <br />
                                    <DashboardIcon style={styles.icon} />
                                    <span style={styles.text}>Home</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        {/* Other Links */}
                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/events'}>
                                    <Build style={styles.icon} />
                                    <span style={styles.text}>Tools</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/registered_users'}>
                                    <Assignment style={styles.icon} />
                                    <span style={styles.text}>Claims</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/available_venues'}>
                                    <AssignmentTurnedInIcon style={styles.icon} />
                                    <span style={styles.text}>Tasks</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/organisers_list'}>
                                    <PersonAddAlt style={styles.icon} />
                                    <span style={styles.text}>Cleaners</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/cleaning_areas'}>
                                    <LocationCityIcon style={styles.icon} />
                                    <span style={styles.text}>Areas</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/latest_news'}>
                                    <SupervisorAccount style={styles.icon} />
                                    <span style={styles.text}>Supervisors</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/departments'}>
                                    <Business style={styles.icon} />
                                    <span style={styles.text}>Departments</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/employees'}>
                                    <People style={styles.icon} />
                                    <span style={styles.text}>Staffs</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        {/* Settings and Sign out */}
                        <ListItem button className="list-group-item">
                            <ListItemText>
                                <Link className="d-flex align-items-center" to={'/user_setting'}>
                                    <SettingsIcon style={styles.icon} />
                                    <span style={styles.text}>Settings</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

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
