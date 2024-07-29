import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Assignment, Build, Business, PersonAddAlt, People, SupervisorAccount } from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function for sign out
    function signOut() {
        setModalOpen(true);
    }

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleConfirmSignOut = async () => {
        setLoading(true);
        // Simulate a sign-out process
        setTimeout(() => {
            setLoading(false);
            setModalOpen(false);
            // Navigate to the signout route
            navigate('/signout');
        }, 5000);
    };

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
        <>
            <Drawer anchor="left" open={open} onClose={toggleSidebar}>
                <div className="offcanvas-body">
                    <List className="list-group">
                        <div style={{
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
                            <ListItem button className="list-group-item">
                                <ListItemText>
                                    <div className="d-flex align-items-center" onClick={signOut}>
                                        <IconButton style={styles.icon}><ExitToAppIcon /></IconButton>
                                        <span style={styles.text}>Sign Out</span>
                                    </div>
                                </ListItemText>
                            </ListItem>
                        </div>
                    </List>
                </div>
            </Drawer>

            <Dialog open={modalOpen} onClose={handleClose} aria-labelledby="sign-out-dialog-title">
                <DialogTitle id="sign-out-dialog-title">Confirm Sign Out</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                            <ExitToAppIcon style={{ marginRight: '8px' }} />
                            You are about to sign out from your account.
                        </Typography>
                    </DialogContentText>
                    <DialogContentText>
                        <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                            <AssignmentTurnedInIcon style={{ marginRight: '8px' }} />
                            Please note that you will need to log in again to access your account.
                        </Typography>
                    </DialogContentText>
                    <DialogContentText>
                        <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                            <Business style={{ marginRight: '8px' }} />
                            Are you sure you want to sign out?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        No
                    </Button>
                    <Button onClick={handleConfirmSignOut} color="secondary" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Yes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Sidebar;
