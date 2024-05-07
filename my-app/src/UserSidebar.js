import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import { Container, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const UserSidebar = ({ open, toggleSidebar }) => {


    return (
        <Drawer anchor="left" open={open} onClose={toggleSidebar}>

            <div>
                <List>

                    <div style={
                        {
                            backgroundColor: 'white',
                        }
                    }>
                        <ListItem button>
                            {/* <ListItemText primary="Item 1" /> */}
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    to="/university_events/dashboard_view"
                                >
                                    <div style={{
                                        backgroundColor: '#0077B6', // Background color
                                        color: 'white', // Text color
                                        padding: '0px', // Padding
                                        fontWeight: 'bold', // Text weight
                                        textTransform: 'uppercase', // Uppercase text
                                        textAlign: 'center', // Centered text
                                        borderRadius: '25px', // Rounded corners
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Box shadow
                                    }}>
                                        UCMS
                                    </div>
                                    <br></br>
                                    <span><DashboardIcon /></span>Dashboard
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    to={'/view_employees'}
                                >
                                    <EventIcon /><span>View Employees</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 font-semibold border-r-2 border-r-indigo-700 pr-20"
                                    to={'/view_departments'}
                                >
                                    <PersonIcon />
                                    <span>View Departments</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <ListItem button>
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    to={'/view_tools'}
                                >
                                    <LocationOnIcon />
                                    <span>View Tools</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        {/* <ListItem button>
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    to={'/organisers_list'}
                                >
                                    <GroupIcon />
                                    <span>Remove Organisers</span>
                                </Link>
                            </ListItemText>
                        </ListItem> */}

                        {/* <ListItem button>
                            <ListItemText>
                                <Link
                                    className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    to={'/latest_news'}
                                >
                                    <ArticleIcon />
                                    <span>News</span>
                                </Link>
                            </ListItemText>
                        </ListItem> */}

                        <ListItem button>
                            <ListItemText>
                                <Link className=" flex items-center space-x-2 py-1  group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold "
                                    to={'/user_setting'}>
                                    <SettingsIcon />
                                    <span>User Settings</span>
                                </Link>
                            </ListItemText>
                        </ListItem>

                        <div>
                            <Container>
                                <Paper elevation={0.5} style={{ padding: '0px' }}>
                                    <Typography variant="h5" gutterBottom style={{
                                        color: 'green',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {/* New Upcoming Events.. */}
                                    </Typography>
                                    <img
                                        id="imageSlider"
                                        src="https://images.pexels.com/photos/18252623/pexels-photo-18252623/free-photo-of-shrubs-and-flower-by-wooden-rural-cottage.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                        style={{
                                            width: '150px',
                                            height: '100px',
                                            display: 'block',
                                        }}
                                    /><br />
                                </Paper>
                            </Container>
                        </div>
                    </div>
                </List>
            </div>
        </Drawer>
    );
}
export default UserSidebar;