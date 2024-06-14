import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Paper } from "@mui/material";

const RegistrationForm = () => {
  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';
  const AdminAPI = 'http://localhost:8080/api/v1/admin/post/admin';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [adminData, setAdminData] = useState({
    AdminId: '',
    UserName: '',
    Email: '',
    Phone: '',
    Password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [loginSuccessAlert, setLoginSuccessAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(AdminAPI, adminData);
      if (response.status === 200) {
        setLoginSuccessAlert(true);
      } else {
        alert('Login failed: ' + response.data.message);
        setLoginSuccessAlert(false);
      }

      navigate('/login/auth/admin', {
        state: {
          UserName: adminData.UserName,
          Email: adminData.Email,
          Phone: adminData.Phone,
        },
      });

      alert(`${adminData.UserName}! Welcome to the admin panel`);
    } catch (error) {
      console.error('Error while saving admin details', error);
      alert('Invalid Admin login.');
      const isValidPhoneNumber = /^\d{10}$/.test(adminData.Phone);
      if (!isValidPhoneNumber) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      if (error.response && error.response.status === 403) {
        alert('Access forbidden: You might not have the required permissions.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(RegisterApi, formData);

      if (response.status === 200) {
        navigate('/user_dashboard_view', {
          state: {
            firstname: formData.firstname,
            email: formData.email,
          },
        });
        alert(`Thank you for being successfully registered with Username: ${formData.firstname}`);
      } else {
        console.error('Registration failed');
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    // <Paper style={{margin:'auto'}}>
    <Box sx={{ flexGrow: 1, p: 10 }} >
      <Grid container spacing={1.5} justifyContent="center">
        <Grid item xs={12} md={3}>
          {loginSuccessAlert && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <AlertTitle>Success</AlertTitle>
              Admin Login successful...
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, boxShadow: 3, borderRadius: 1, backgroundColor: '#f9f9f9', height: '100%' }}>
            <Typography variant="h5" align="center" gutterBottom>User Registration</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstname"
              required
              value={formData.firstname}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastname"
              required
              value={formData.lastname}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already registered? <Link to="/login">Please Login</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          {showAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              Invalid phone number. Please enter exactly 10 digits.
            </Alert>
          )}
          <Box component="form" onSubmit={handleAdminSubmit} sx={{ p: 3, boxShadow: 3, borderRadius: 1, backgroundColor: 'white' }}>
            <Typography variant="h5" align="center" gutterBottom>Admin Login</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Admin Pass ID"
              name="AdminId"
              type="number"
              required
              value={adminData.AdminId}
              onChange={handleAdminChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Admin Username"
              name="UserName"
              required
              value={adminData.UserName}
              onChange={handleAdminChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Admin Email"
              name="Email"
              type="email"
              required
              value={adminData.Email}
              onChange={handleAdminChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Admin Phone Number"
              name="Phone"
              type="tel"
              required
              value={adminData.Phone}
              onChange={handleAdminChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Admin Password"
              name="Password"
              type="password"
              required
              value={adminData.Password}
              onChange={handleAdminChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    // </Paper>
  );
};

export default RegistrationForm;
