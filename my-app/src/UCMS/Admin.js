import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "reactstrap";
import { AlertTitle } from "@mui/material";

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
                    p: 3, boxShadow: 3, borderRadius: 1,
                    backgroundColor: 'white', width:'25%', margin:'auto', marginTop:'5%'
                }}>
                {loginSuccessAlert && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        <AlertTitle>Success</AlertTitle>
                        Admin Login successful...
                    </Alert>
                )}
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
        </div>
    );
}
export default Admin;