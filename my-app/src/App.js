import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Material UI imports
import { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
// import { motion } from 'framer-motion';
import CircularWithValueLabel from './Loader';


const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const anyName = 'Custom System Name';

  return (
    <div className="App" style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: 'white' }}>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          > */}
          {/* <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h6" style={{
            color: 'green',
            margin: 'auto'
          }}>
            Welcome to {anyName}!
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> disable toggle here */}
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Container>
          {/* Your main content goes here */}

          {/* <Typography variant="h4">Welcome to My Dashboard</Typography> */}
        </Container>
      </main>

      <CircularWithValueLabel />

    </div>
  );
};

export default App;
