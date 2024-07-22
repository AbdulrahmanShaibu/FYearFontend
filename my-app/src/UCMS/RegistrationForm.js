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

const RegistrationForm = () => {
  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    <Box sx={{
      p: 3, borderRadius: 1,
      backgroundColor: 'whitesmoke', width: '26.5%', margin: 'auto'
    }}>
      <div align="center">
        <img src="cleaning-logo.webp" style={{ margin: 'auto', width: '45%' }} />
      </div>
      <Grid item xs={4}>
        <Box component="form" onSubmit={handleSubmit}
          sx={{
            p: 3, boxShadow: 3, borderRadius: 1,
            backgroundColor: 'white', width: '100%', margin: 'auto', marginTop: '5%'
          }}>
          <Typography variant="h5" align="center"
            style={{ fontWeight: 'bold' }}
            gutterBottom>Staff SiginUp</Typography>
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
              An error occurred during registration. Please try again.
            </Alert>
          )}
        </Grid>
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
