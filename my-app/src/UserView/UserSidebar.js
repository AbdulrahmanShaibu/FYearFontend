import React from 'react';
import { Drawer, List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';
import { Dashboard as DashboardIcon, GroupAdd, Article, Event as EventIcon, Person as PersonIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserSidebar = ({ open, toggleSidebar }) => {
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, link: '/user/dashboard' },
        { text: 'Post Complains', icon: <GroupAdd />, link: '/user_staffs/complains' },
        { text: 'Upload Attachments', icon: <Article />, link: '/user_attachments' },
        { text: 'Available Companies', icon: <EventIcon />, link: '/view_cleaning-company' },
        { text: 'Client Organisations', icon: <LocationOnIcon />, link: '/view_client-organisation' },
        // { text: 'Company Staffs', icon: <PersonIcon />, link: '/view_company-staffs' }
    ];

    return (
        <>
            <Drawer anchor="left" open={open} onClose={toggleSidebar}>
                <List>
                    <div style={{ backgroundColor: 'white' }}>
                        <ListItem button onClick={toggleSidebar}>
                            <ListItemText>
                                <Link to="/user/dashboard" className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold">
                                    {/* <div style={{ padding: '16px', backgroundColor: '#0077B6', color: 'white', textAlign: 'center' }}>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                            UCMS
                                        </Typography>
                                    </div> */}
                                    <Container
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '35vh', // Full height of the viewport
                                            padding: '2rem',
                                            backgroundColor: '#f0f0f0', // Light grey background color
                                        }}
                                    >
                                        <Paper
                                            style={{
                                                padding: '2rem',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Shadow for a lifted effect
                                                backgroundColor: '#ffffff', // White background for the paper
                                                maxWidth: '200px', // Set a maximum width for the Paper
                                                textAlign: 'center', // Center text alignment
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    marginBottom: '1rem',
                                                    color: '#333', // Dark text color for better readability
                                                }}
                                                variant="h5"
                                                gutterBottom
                                            >
                                                UCMS
                                            </Typography>
                                            <img
                                                id="imageSlider"
                                                src="https://media.istockphoto.com/id/1262392581/photo/recycling-logo-on-green-paper-recycling-concept.webp?s=1024x1024&w=is&k=20&c=h5YavZf1r0sjUqHmaBmLuIbkA9qdBYAP0K3dxYAA_l8="
                                                alt="Slider"
                                                style={{
                                                    maxWidth: '100%', // Responsive image width
                                                    height: 'auto', // Maintain aspect ratio
                                                    borderRadius: '4px', // Slightly rounded corners
                                                    border: '1px solid #ddd', // Light border for the image
                                                }}
                                            />
                                        </Paper>
                                    </Container>
                                    <br />
                                    <span style={{ color: 'black', paddingBlock: '10px', fontWeight: 'bold' }}>
                                        <DashboardIcon /> Dashboard
                                    </span>
                                </Link>
                            </ListItemText>
                        </ListItem>
                        {menuItems.slice(1).map((item, index) => (
                            <ListItem
                                style={{ gap: '100px' }}
                                button
                                key={index}
                                component={Link}
                                to={item.link}
                                sx={{
                                    '&.active': {
                                        backgroundColor: '#E0F2F1',
                                        color: '#0077B6',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#B2DFDB',
                                    },
                                }}
                            >
                                <ListItemText>
                                    <Link
                                        to={item.link}
                                        className="flex items-center space-x-2 py-1 group hover:border-r-2 hover:border-r-indigo-700 hover:font-semibold"
                                    >
                                        <span className="text-black py-5 font-bold">
                                            {item.icon}  {item.text}
                                        </span>
                                    </Link>
                                </ListItemText>

                            </ListItem>
                        ))}

                    </div>
                </List>
            </Drawer>
        </>
    );
};

export default UserSidebar;
