import {
    AppBar,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
    Badge,
    Menu,
    MenuItem,
    Switch,
    FormControlLabel,
    Snackbar,
    Button
} from "@mui/material";
import { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MuiAlert from '@mui/material/Alert';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import axios from 'axios';

const Home = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const sidebarToggle = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const isMenuOpen = Boolean(anchorEl);

    const styles = {
        appBar: {
            backgroundColor: darkMode ? '#333333' : 'lightBlue',
        },
        menuButton: {
            marginRight: '16px',
        },
        title: {
            flexGrow: 1,
        },
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [cleaningCompanyResponse, clientOrganisationResponse, clientSiteResponse, companyStaffsResponse, staffsResponse, staffComplainResponse, toolsResponse, attachmentsResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/v1/count/cleaning/company'),
                    axios.get('http://localhost:8080/api/v1/count/ClientOrganisations'),
                    axios.get('http://localhost:8080/api/v1/count/client-site'),
                    axios.get('http://localhost:8080/api/v1/count/company-staff'),
                    axios.get('http://localhost:8080/api/v1/staffs/count'),
                    axios.get('http://localhost:8080/api/v1/count/StaffComplain'),
                    axios.get('http://localhost:8080/api/v1/count/tools'),
                    axios.get('http://localhost:8080/api/v1/count/attachments')
                ]);

                const newNotifications = [
                    { type: 'Client Organizations', count: clientOrganisationResponse.data },
                    { type: 'Cleaning Companies', count: cleaningCompanyResponse.data },
                    { type: 'Staff Complaints', count: staffComplainResponse.data },
                    { type: 'Company Staffs', count: companyStaffsResponse.data },
                    { type: 'Client Sites', count: clientSiteResponse.data },
                    { type: 'Attachments', count: attachmentsResponse.data },
                    { type: 'Staffs', count: staffsResponse.data },
                    { type: 'Tools', count: toolsResponse.data }
                ];

                setNotificationCount(newNotifications.length);
                setNotifications(newNotifications);
                setOpen(true);
            } catch (error) {
                console.error('Error fetching counts', error);
            }
        };

        fetchCounts();
        const interval = setInterval(fetchCounts, 30000); // Fetch data every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="App" style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={styles.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        style={styles.menuButton}
                        onClick={sidebarToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={styles.title}>
                        Dashboard
                    </Typography>
                    <div>
                        <IconButton color="inherit">
                            <Badge badgeContent={notificationCount} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Snackbar
                            open={open}
                            autoHideDuration={10000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MuiAlert
                                onClose={handleClose}
                                severity="info"
                                sx={{ width: '100%' }}
                            >
                                <Typography variant="subtitle1">
                                    {notifications.length} Notifications
                                </Typography>
                                {notifications.map((notification, index) => (
                                    <Typography key={index} variant="body2">
                                        {notification.type}: {notification.count}
                                    </Typography>
                                ))}
                            </MuiAlert>
                        </Snackbar>
                    </div>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
                    </Menu>
                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                        label="Dark Mode"
                    />
                </Toolbar>
            </AppBar>
            <Sidebar open={openSidebar} sidebarToggle={sidebarToggle} />
            <Outlet />
        </div>
    );
}

export default Home;
