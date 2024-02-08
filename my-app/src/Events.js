import React from "react";
import Sidebar from "./Sidebar";
import App from "./App";
import Home from "./Home";
import { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyrightFooter from "./Footer";
import EventButton from "./EventsButton";

const Events = () => {

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // These data will be replaced with API from backed
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  const changeColor = {
    color: 'red',
    backgroundColor: 'rgba(73, 161, 157, 0.3)' // Adjust the alpha (opacity) value as needed
  };


  return (
    <div style={{ ...changeColor }}>
      <Home />

      <div className="formWithContents" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Dividing the layout into two columns
        // gap: '20px',
        height: '50vh',
        padding: '400px',
      }}
      >
        <Grid>
          <Grid item xs={3.5}>
            <Paper elevation={3} style={{ padding: '15px' }} >
              <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Admin Events Registration Form
              </Typography>
              <div style={{ gridColumn: '1 / span 1', backgroundColor: '#f0f0f0', padding: '15px' }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Event Id"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Event Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Venue"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Event Description"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Other fields will be added here..."
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <EventButton />
                </form>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <div style={
          {
            gridColumn: '2 / span 1',
            backgroundColor: 'white',
            height: '571.5px',
            border: '2px solid blue', // Additional professional style
            borderRadius: '8px', // Additional professional style
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Additional professional style
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }>
          <img src="https://images.pexels.com/photos/17993800/pexels-photo-17993800/free-photo-of-close-up-of-red-flowers.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="Your Image" style={{ maxWidth: '70%', borderRadius: '8px' }} />
          <p style={{ marginTop: '10px', textAlign: 'center', color: '#333' }}>Your description goes here. This is a placeholder for your content.</p>
        </div>


        <div style={{
          gridColumn: '1 / span 2'
        }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>New Column</TableCell>
                  <TableCell>Update Row</TableCell>
                  <TableCell>Delete Row</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>data</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                      // onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary" // Change the color to red or any other suitable color for deletion
                        startIcon={<DeleteIcon />}
                      // onClick={() => handleDelete(user.id)} // Define handleDelete function
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* This is Event Table */}

      {/* <CopyrightFooter /> */}
    </div>
  );
}
export default Events;