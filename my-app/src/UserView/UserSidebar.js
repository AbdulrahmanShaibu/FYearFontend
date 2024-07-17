import React from 'react';
import { Drawer, List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, GroupAdd, Article, Event as EventIcon, Person as PersonIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserSidebar = ({ open, toggleSidebar }) => {
    const menuItems = [
        // { text: 'Dashboard', icon: <DashboardIcon />, link: '/user/dashboard' },
        { text: 'Staffs Complains', icon: <GroupAdd />, link: '#' },
        { text: 'Attachments', icon: <Article />, link: '#' },
        { text: 'Cleaning Companies', icon: <EventIcon />, link: '/view_cleaning-company' },
        { text: 'Company Staffs', icon: <PersonIcon />, link: '/view_company-staffs' },
        { text: 'Client Organisations', icon: <LocationOnIcon />, link: '/view_client-organisation' },
    ];

    return (
        <>
            <Drawer anchor="left" open={open} onClose={toggleSidebar}>
                <List>
                    <div style={{ backgroundColor: 'white' }}>
                        <ListItem button onClick={toggleSidebar}>
                            <ListItemText>
                                <Link to="/user/dashboard" className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold">
                                    <div style={{ backgroundColor: '#0077B6', color: 'white', padding: '0px', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', borderRadius: '25px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                        UCMS
                                    </div>
                                    <br />
                                    <span style={{ color: 'black', paddingBlock: '10px', fontWeight: 'bold' }}>
                                        <DashboardIcon /> Dashboard
                                    </span>
                                </Link>
                            </ListItemText>
                        </ListItem>
                        {menuItems.slice(1).map((item, index) => (
                            <ListItem button key={index} onClick={toggleSidebar}>
                                <ListItemText>
                                    <Link to={item.link} className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold">
                                        <span style={{ color: 'black', paddingBlock: '10px', fontWeight: 'bold' }}>
                                            {item.icon} {item.text}
                                        </span>
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        ))}
                        <Container>
                            <Paper elevation={0.5} style={{ padding: '0px' }}>
                                <Typography variant="h5" gutterBottom style={{ color: 'green', fontSize: '12px', fontWeight: 'bold' }}></Typography>
                                <img
                                    id="imageSlider"
                                    src="https://images.pexels.com/photos/18252623/pexels-photo-18252623/free-photo-of-shrubs-and-flower-by-wooden-rural-cottage.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                    style={{ width: '150px', height: '100px', display: 'block' }}
                                    alt="Slider"
                                />
                                <br />
                            </Paper>
                        </Container>
                    </div>
                </List>
            </Drawer>
        </>
    );
};

export default UserSidebar;
