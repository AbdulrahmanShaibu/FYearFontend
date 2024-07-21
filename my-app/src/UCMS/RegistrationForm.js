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

const RegistrationForm = () => {
  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
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
    <Box sx={{
      p: 3, borderRadius: 1,
      backgroundColor: 'whitesmoke', width: '26.5%', margin: 'auto'
    }}>
      <div align="center">
        <img src="cleaning-logo.webp" style={{ margin: 'auto', width: '45%'}} />
      </div>
      <Grid item xs={4}>
        <Box component="form" onSubmit={handleSubmit}
          sx={{
            p: 3, boxShadow: 3, borderRadius: 1,
            backgroundColor: 'white', width: '100%', margin: 'auto', marginTop: '5%'
          }}>
          <Typography variant="h5" align="center"
            style={{ fontWeight: 'bold' }}
            gutterBottom>Staff Login</Typography>
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
          <Typography align="center" sx={{ mt: 2 }}>
            Admin? <Link to="/admin-login">Login here</Link>
          </Typography>
        </Box>

        <Grid item xs={12} md={4}>
          {showAlert && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <AlertTitle>Error</AlertTitle>
              Invalid phone number. Please enter exactly 10 digits.
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
    // </Paper>
  );
};

export default RegistrationForm;
