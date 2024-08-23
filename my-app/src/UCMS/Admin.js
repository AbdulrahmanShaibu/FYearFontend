import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "reactstrap";
import { AlertTitle, Grid } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import CheckCircle from "@mui/icons-material/CheckCircle";

const Admin = () => {

    const AdminAPI = 'http://localhost:8080/api/v1/admin/post/admin';

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

    return (
        <div>
            <Box component="form" onSubmit={handleAdminSubmit}
                sx={{
                    p: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    width: '30%',
                    margin: 'auto',
                    marginTop: '0%',
                }}>

                {loginSuccessAlert && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        <AlertTitle><CheckCircle /> Success</AlertTitle>
                        Admin Login successful...
                    </Alert>
                )}

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

                <Alert>
                    <Typography variant="h6" align="center" color="primary" gutterBottom>
                        Admin Login
                    </Typography>
                </Alert>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            color="success" focused
                            margin="normal"
                            label="Enter Id"
                            name="AdminId"
                            type="number"
                            required
                            value={adminData.AdminId}
                            onChange={handleAdminChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth variant="outlined"
                            color="success" focused
                            margin="normal"
                            label="Phone"
                            name="Phone"
                            type="number"
                            required
                            value={adminData.Phone}
                            onChange={handleAdminChange}
                        />
                    </Grid>
                </Grid>


                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            startIcon={<PersonAdd />}
                            fullWidth variant="outlined"
                            color="success" focused
                            margin="normal"
                            label="Username"
                            name="UserName"
                            required
                            value={adminData.UserName}
                            onChange={handleAdminChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth variant="outlined"
                            color="success" focused
                            margin="normal"
                            label="Email"
                            name="Email"
                            type="email"
                            required
                            value={adminData.Email}
                            onChange={handleAdminChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth variant="outlined"
                            margin="normal"
                            color="success" focused
                            label="Password"
                            name="Password"
                            type="password"
                            required
                            value={adminData.Password}
                            onChange={handleAdminChange}
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
                    Login
                </Button>
            </Box>
        </div>

    );
}
export default Admin;