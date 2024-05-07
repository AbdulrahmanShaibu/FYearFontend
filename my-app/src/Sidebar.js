// Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Assignment, Build, Business, CleaningServices, ClearRounded, DryCleaning, People, Person2, Person2Sharp, Person3, PersonAdd, PersonAddAlt, PersonAddAlt1TwoTone, PersonOff, SupervisorAccount, SwapVert } from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar }) => {

    // Function for sign out
    function signOut() {
        alert("To be implemented, this is just a demo!");
    }


    const styles = {
        icon: {
            fontSize: '24px', // Icon size
            marginRight: '8px', // Space between icon and text
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
            <List>
                <div style={{
                    backgroundColor: '#a8d5e5',
                    color: 'white',
                    padding: '10px',
                }}>
                    {/* Dashboard Link */}
                    <ListItem button>
                        <ListItemText>
                            <Link className="flex items-center space-x-2 py-1 group hover:bg-gray-100 hover:text-indigo-700" to="/university_events/dashboard_view">
                                <div style={{
                                    backgroundColor: '#0077B6',
                                    color: 'white',
                                    padding: '8px 15px',
                                    borderRadius: '25px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>UCMS</div>
                                <br />
                                <DashboardIcon style={styles.icon} />
                                <span style={styles.text}>Dashboard</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    {/* Other Links */}
                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/events'}>
                                <Build style={styles.icon} />
                                <span style={styles.text}>Tools</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/registered_users'}>
                                <Assignment style={styles.icon} />
                                <span style={styles.text}>Claims</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/available_venues'}>
                                <AssignmentTurnedInIcon style={styles.icon} />
                                <span style={styles.text}>Tasks</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/organisers_list'}>
                                <PersonAddAlt style={styles.icon} />
                                <span style={styles.text}>Cleaners</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/cleaning_areas'}>
                                <LocationCityIcon style={styles.icon} />
                                <span style={styles.text}>Cleaning Areas</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/latest_news'}>
                                <SupervisorAccount style={styles.icon} />
                                <span style={styles.text}>Supervisors</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/departments'}>
                                <Business style={styles.icon} />
                                <span style={styles.text}>Departments</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/employees'}>
                                <People style={styles.icon} />
                                <span style={styles.text}>Employees</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    {/* Settings and Sign out */}
                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/user_setting'}>
                                <SettingsIcon style={styles.icon} />
                                <span style={styles.text}>Settings</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemText>
                            <Link className="" to={'/signout'}>
                                <IconButton style={styles.icon}><ExitToAppIcon /></IconButton>
                                <span style={styles.text} onClick={signOut}>Sign Out</span>
                            </Link>
                        </ListItemText>
                    </ListItem>

                    {/* Responsive Image */}
                    <div>
                        {/* <Container>
                            <Paper elevation={1.5} style={{ padding: '0px' }}>
                                <img
                                    src="https://images.pexels.com/photos/955656/pexels-photo-955656.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="University"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </Paper>
                        </Container> */}
                    </div>
                </div>
            </List>
        </Drawer>
    );
};

export default Sidebar;
