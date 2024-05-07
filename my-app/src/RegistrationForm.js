import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from "axios";

const RegistrationForm = () => {
  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';
  const AdminAPI = 'http://localhost:8080/api/v1/admin/post/admin';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [admin_id, setAdminId] = useState('');
  const [admin_username, setAdminUsername] = useState('');
  const [admin_email, setAdminEmail] = useState('');
  const [admin_phone, setAdminPhone] = useState('');
  const [admin_password, setAdminPassword] = useState('');

  // Use a state variable to control whether the alert is displayed
  const [showAlert, setShowAlert] = useState(false);
  const [loginSuccessAlert, setloginSuccessAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdminsubmit = async (e) => {
    e.preventDefault();
    // Combine admin input data into an object
    const adminData = {
      AdminId: admin_id,
      UserName: admin_username,
      Email: admin_email,
      Phone: admin_phone,
      Password: admin_password,
    };

    try {
      const response = await axios.post(AdminAPI, adminData);
      // Handle the response
      if (response.status === 200) {
        console.log('Admin responses:', response.data);
        // alert('Login success...');
        setloginSuccessAlert(true);
      } else {
        // Handle error cases based on the response status
        alert('Login failed: ' + response.data.message);
        setloginSuccessAlert(false);
      }

      navigate('/login/auth/admin', {
        state: {
          admin_username: admin_username,
          admin_email: admin_email,
          admin_phone: admin_phone,
        },
      });

      alert(`${admin_username}! Welcome to the admin panel`);
      console.log('Navigation has worked!');
    } catch (error) {
      console.error('Error while saving admin details', error);
      alert('Invalid Admin login.');
      alert(`No admin found with Id: ${adminData.AdminId}`);
      // Check if the phone number contains exactly 10 digits
      const isValidPhoneNumber = /^\d{10}$/.test(admin_phone);
      if (isValidPhoneNumber) {
        console.log('Phone number is valid. Continue...');
        // Reset the alert state
        setShowAlert(false);
      } else {
        // Show the alert
        setShowAlert(true);
      }
      // Handle 403 error
      if (error.response && error.response.status === 403) {
        alert('Access forbidden: You might not have the required permissions.');
      } else {
        console.log('An error occurred while trying to save admin details.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send registration data to the server using an API call
    try {
      const response = await fetch(RegisterApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
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

  // const validatePhone = () => {
  //   // Check if the phone number contains exactly 10 digits
  //   const isValidPhoneNumber = /^\d{10}$/.test(admin_phone);
  //   if (isValidPhoneNumber) {
  //     console.log('Phone number is valid. Continue...');
  //   } else {
  //     console.log(`Invalid phone number. Please enter exactly 10 digits.`);
  //   }
  // };

  return (
    <div>
      <div className="login-container" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
        {loginSuccessAlert && (
          <Alert variant="filled" severity="success" sx={{ marginBottom: '20px' }}>
            Admin Login success...
          </Alert>
        )}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '380px', backgroundColor: '#5f8ac0', padding: '20px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit}>
              <h1 style={{ color: '#5f8ac0', textAlign: 'center', marginBottom: '20px' }}>Register As New User</h1>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter First Name"
                required
                value={formData.firstname}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter Last Name"
                required
                value={formData.lastname}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px' }}
              />
              <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#5f8ac0', color: 'white', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>
                Register
              </button>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Already registered? <Link to="/login" style={{ color: '#5f8ac0', textDecoration: 'none' }}>Please Login</Link>
              </p>
            </form>
          </div>
          <div style={{ width: '350px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            {showAlert && (
              <Alert variant="filled" severity="error" sx={{ marginBottom: '20px' }}>
                Invalid phone number. Please enter exactly 10 digits.
              </Alert>
            )}
            <form onSubmit={handleAdminsubmit}>
              <h1 style={{ color: '#5f8ac0', textAlign: 'center', marginBottom: '20px' }}>Admin Login Form</h1>
              <input
                type="number"
                id="admin-id"
                name="admin-id"
                placeholder="Enter Admin Pass Id"
                required
                value={admin_id}
                onChange={(e) => setAdminId(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="text"
                id="admin-username"
                name="admin-username"
                placeholder="Enter Admin Username"
                required
                value={admin_username}
                onChange={(e) => setAdminUsername(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="email"
                id="admin-email"
                name="admin-email"
                placeholder="Enter Admin Email"
                required
                value={admin_email}
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="tel"
                id="admin-phone"
                name="admin-phone"
                placeholder="Enter Admin Phone Number"
                pattern="[0-9]{10}"
                required
                value={admin_phone}
                onChange={(e) => setAdminPhone(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px' }}
              />
              <input
                type="password"
                id="admin-password"
                name="admin-password"
                placeholder="Enter Admin Password"
                required
                value={admin_password}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ width: '100%', marginBottom: '20px', padding: '10px', borderRadius: '5px' }}
              />
              <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#5f8ac0', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="first-view-container"></div>
    </div>
  );
};

export default RegistrationForm;
