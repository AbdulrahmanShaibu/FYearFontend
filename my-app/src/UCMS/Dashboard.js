import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Avatar, Grid, Paper } from '@mui/material';
import { Padding } from '@mui/icons-material';

const Dashboard = () => {
  const profileImageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&usqp=CAU';

  const location = useLocation();
  const { state } = location;
  const { admin_username, admin_email, admin_phone } = state || {};

  const style = {
    fontWeight: 'bolder', textAlign: 'center',
    backgroundColor: 'white'
  }

  return (
    <Container style={{marginTop:'55px', backgroundColor:'white'}}>
      <Box sx={{ backgroundColor: 'white', margin: 'auto', py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h5" component="h5" color="primary" fontWeight="bold">
            Welcome {admin_username}! 👏
          </Typography>
          {/* <hr /> */}
        </Box>

        <Paper container justifyContent="center" elevation={5}
          style={{ width: '40%', margin: 'auto' }}>
          <Grid item xs={6} sm={4} md={3}>
            <Card sx={{ mb: 4 }}>
              <Box sx={{ position: 'relative', height: 400 }}>
                <Avatar
                  alt={admin_username}
                  src={profileImageURL}
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" style={{ ...style }}>Username: {admin_username}</Typography>
                  <Typography variant="h6" style={{ ...style }}>Email: {admin_email}</Typography>
                </Box>
              </Box>
              {/* <CardContent>
                <Typography variant="h6" component="h2"
                style={{textAlign:'center'}}
                >
                  Contact: {admin_phone}
                </Typography>
              </CardContent> */}
            </Card>

            <Card sx={{ backgroundColor: 'rgb(100, 200, 200)', p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="white" fontWeight="bold">
                    Admin Email: {admin_email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="white" fontWeight="bold">
                    Admin Name: {admin_username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="white" fontWeight="bold">
                    Role: Super Admin
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="white" fontWeight="bold">
                    Admin Contact: {admin_phone}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Paper>
      </Box>
      {/* <CopyrightFooter /> */}
    </Container>
  );
};

export default Dashboard;
