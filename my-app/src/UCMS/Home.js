import {
    AppBar,
    Container,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
    Badge,
    Menu,
    MenuItem,
    Switch,
    FormControlLabel,
    InputBase
} from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

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
            // #00796B
        },
        menuButton: {
            marginRight: '16px',
        },
        title: {
            flexGrow: 1,
        },
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
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
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
