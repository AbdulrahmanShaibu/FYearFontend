import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./Sidebar";


const Home = () => {
    const message = 'new';

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const styles = {
        appBar: {
            backgroundColor: '#1976d2', // Set your desired background color
            // boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // Add a subtle shadow
        },
        menuButton: {
            marginRight: '16px', // Adjust as per your design
        },
        title: {
            flexGrow: 1,
        },
    };

    return (
        <div className="App" style={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" style={styles.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        style={styles.menuButton}
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={styles.title}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

        </div>
    );

}
export default Home;