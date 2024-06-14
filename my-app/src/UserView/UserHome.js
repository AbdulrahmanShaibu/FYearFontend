import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import UserSidebar from "./UserSidebar";

const UserHome = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="App" style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed"
                style={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6" noWrap
                        style={{ margin: 'auto' }}
                    >   Logged In As User
                    </Typography>
                </Toolbar>
            </AppBar>
            <UserSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            {/* <main style={{ flexGrow: 1, padding: '20px' }}>
                <Container>
                    <Typography variant="h4">Welcome to Events Dashboard</Typography>
                </Container>
            </main> */}

            {/* <Dashboard /> */}
            {/* I am <div>{{message}}</div>component... */}

        </div>
    );
}
export default UserHome;