import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Grid, Paper, Avatar, IconButton, Modal, Divider, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { VerifiedUser } from '@mui/icons-material';

const Dashboard = () => {
  const profileImageURL = 'https://media.istockphoto.com/id/474001892/photo/a-icon-of-a-businessman-avatar-or-profile-pic.jpg?b=1&s=612x612&w=0&k=20&c=Vcxa_y_579iLodDV8OetV6mkG0eMRiouF57fMd9w5RQ=';

  const location = useLocation();
  const { state } = location;
  const { UserName, Email, Phone } = state || {};

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container sx={{ marginTop: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Alert
          icon={<VerifiedUser fontSize="inherit" />}
          severity="success"
          sx={{ fontSize: 'small', fontWeight: 'bold', textAlign: 'center' }}
        >
          Welcome, {UserName}! Your admin access is now active. 👏
        </Alert>

      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={5} sx={{ padding: 4, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt={UserName}
                  src={profileImageURL}
                  sx={{
                    width: 128,
                    height: 128,
                    margin: 'auto',
                  }}
                />
                <hr style={{
                  height: '80px',  // Adjust the height as needed
                  border: 'none',
                  borderLeft: '2px solid #4caf50',  // Adjust the color as needed
                  marginLeft: '16px'  // Adjust spacing as needed
                }} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" color="textPrimary" fontWeight="bold" sx={{ mb: 1 }}>
                  user-name: <b style={{ fontWeight: 'bolder' }}>{UserName}</b>
                </Typography><br />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <EmailIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="textSecondary">
                    email:{Email}
                  </Typography>
                </Box><br />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <PhoneIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="textSecondary">
                    phone:{Phone}
                  </Typography>
                </Box><br />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body1" color="textSecondary">
                    role: super admin
                  </Typography>
                </Box><br />
                <IconButton color="primary" onClick={handleOpenModal}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="admin-related-content-modal" aria-describedby="admin-related-content-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="admin-related-content-modal" variant="h6" component="h2">
            Admin Options
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Alert
            icon={<ErrorIcon fontSize="inherit" />}
            severity="error"
            sx={{ fontSize: '1rem' }}
          >
            Noption available
          </Alert>
        </Box>
      </Modal>
    </Container>
  );
};

export default Dashboard;
