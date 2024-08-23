import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled, keyframes } from '@mui/system';
import { Alert, AlertTitle } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

const RegistrationForm = () => {
  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';
  const CleanerLoginApi = 'http://localhost:8080/api/v1/cleaner-login';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    name: '',
    cleaningCompanyId: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(RegisterApi, formData);
      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        console.error('Registration failed');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setShowAlert(true);
    }
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.get(CleanerLoginApi)
      if (response.status === 200) {
        // Handle successful login
        setLoginAlert(false);
        handleCloseLoginModal();
      } else {
        console.error('Login failed');
        setLoginAlert(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginAlert(true);
    }
  };

  const handleOpenLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  // Custom animation for the success icon
  const fireAnimation = keyframes`
    0% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  `;

  const SuccessIcon = styled(CheckCircleIcon)`
    animation: ${fireAnimation} 0.5s ease-in-out;
    color: green;
  `;

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  return (
    <Box sx={{ p: 3, borderRadius: 1, backgroundColor: 'whitesmoke', width: '36.5%', margin: 'auto' }}>
      <Grid item xs={12}>

        <Box component="form" onSubmit={handleSubmit}
          sx={{ p: 3, boxShadow: 3, borderRadius: 1, backgroundColor: 'white', width: '100%', margin: 'auto', marginTop: '5%' }}>
          <div align="center">
            <img src="cleaning-logo.webp" style={{ margin: 'auto', width: '40%' }} />
            <hr style={{
              backgroundColor: 'green',
              height: '2px',
              border: 'none',
              margin: '20px 0',
              opacity: 0.7,
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }} />
          </div>
          <Alert
            severity="info"
            style={{
              fontWeight: 'bold',
              backgroundColor: '#e3f2fd',
              color: '#0d47a1',
              padding: '10px 20px',
              textAlign: 'center'
            }}
          >
            <Typography style={{ fontWeight: 'bold' }}>
              Staff Sign-Up
            </Typography>
          </Alert>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                color="success"
                focused
                fullWidth
                margin="normal"
                label="First Name"
                name="firstname"
                required
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="success"
                focused
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="success"
                focused
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="success"
                focused
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            style={{
              backgroundColor: 'green',
              background: 'linear-gradient(45deg, #43a047, #66bb6a)',
            }}
            fullWidth
            variant="contained"
            type="submit"
            startIcon={<PersonAdd />}
            sx={{
              mt: 2,
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, transform 0.5s, box-shadow 0.3s',
              '&:hover': {
                backgroundColor: '#388e3c',
                background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Register
          </Button>
          {/* 
         <Button
            style={{
              backgroundColor: 'green',
              background: 'linear-gradient(45deg, #43a047, #66bb6a)',
            }}
            fullWidth
            vari ant="contained"
            onClick={handleOpenLoginModal}
            startIcon={<PersonAdd />}
            sx={{
              mt: 2,
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '16px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, transform 0.5s, box-shadow 0.3s',
              '&:hover': {
                backgroundColor: '#388e3c',
                background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Cleaner Login
          </Button> */}

          <Typography align="center" sx={{ mt: 2 }}>
            Already registered? <Link to="/login">Staff Login</Link>
          </Typography>
          <Typography align="center" sx={{ mt: 2 }}>
            Admin? <Link to="/admin-login">Login here</Link>
          </Typography>
        </Box>

        {showAlert && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            An error occurred during registration. Please try again.
          </Alert>
        )}

        <Modal
          open={showLoginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="login-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
              Cleaner Login
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="name"
              required
              value={loginData.name}
              onChange={handleLoginChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Cleaning Company ID"
              name="cleaningCompanyId"
              required
              value={loginData.cleaningCompanyId}
              onChange={handleLoginChange}
            />
            {loginAlert && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Error</AlertTitle>
                An error occurred during login. Please try again.
              </Alert>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLoginSubmit}
              sx={{ mt: 2, fontWeight: 'bold', padding: '10px 0', borderRadius: '8px', textTransform: 'none', fontSize: '16px' }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Grid>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <SuccessIcon fontSize="large" />
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
            Registration Successful!
          </Typography>
          <Typography id="modal-description" variant="body1" sx={{ mt: 2 }}>
            Welcome aboard, {formData.firstname}. Your account has been successfully created.
          </Typography>
          <Typography id="modal-instructions" variant="body1" sx={{ mt: 2 }}>
            You can now log in with the username: {formData.firstname} to submit any complaints or feedback.
          </Typography>
          <Button onClick={() => setShowSuccessModal(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RegistrationForm;
