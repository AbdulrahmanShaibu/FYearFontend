import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import axios from "axios";
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const adminData = {
      AdminId: admin_id,
      UserName: admin_username,
      Email: admin_email,
      Phone: admin_phone,
      Password: admin_password,
    };

    try {
      const response = await axios.post(AdminAPI, adminData);
      if (response.status === 200) {
        console.log('Admin responses:', response.data);
        setloginSuccessAlert(true);
      } else {
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
      const isValidPhoneNumber = /^\d{10}$/.test(admin_phone);
      if (isValidPhoneNumber) {
        console.log('Phone number is valid. Continue...');
        setShowAlert(false);
      } else {
        setShowAlert(true);
      }
      if (error.response && error.response.status === 403) {
        alert('Access forbidden: You might not have the required permissions.');
      } else {
        console.log('An error occurred while trying to save admin details.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {loginSuccessAlert && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: '20px' }}>
              Admin Login success...
            </Alert>
          )}
          <div className="card p-4">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">User Registration</h1>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  placeholder="Enter First Name"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  placeholder="Enter Last Name"
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  REGISTER
                </button>
              </div>
              <p className="text-center">
                Already registered? <Link to="/login" className="text-decoration-none">Please Login</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          {showAlert && (
            <Alert variant="filled" severity="error" sx={{ marginBottom: '20px' }}>
              Invalid phone number. Please enter exactly 10 digits.
            </Alert>
          )}
          <div className="card p-4">
            <form onSubmit={handleAdminsubmit}>
              <h1 className="text-center mb-4">Admin Login</h1>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="number"
                  name="admin-id"
                  placeholder="Enter Admin Pass Id"
                  required
                  value={admin_id}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="admin-username"
                  placeholder="Enter Admin Username"
                  required
                  value={admin_username}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="admin-email"
                  placeholder="Enter Admin Email"
                  required
                  value={admin_email}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="tel"
                  name="admin-phone"
                  placeholder="Enter Admin Phone Number"
                  pattern="[0-9]{10}"
                  required
                  value={admin_phone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="admin-password"
                  placeholder="Enter Admin Password"
                  required
                  value={admin_password}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                > LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
