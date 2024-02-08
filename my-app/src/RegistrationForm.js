// RegistrationForm.js
import React, { Component, useState } from 'react';
import './styles/event_form.css';
// import './scripts/eventScripts';
import { Link, useNavigate } from "react-router-dom";
import FetchPersonalDetails from './Personal_Info';


//import axios from 'axios';

const RegistrationForm = () => {

  const RegisterApi = 'http://localhost:8080/api/v1/auth/register';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [admin_username, setAdminUsername] = useState('');
  const [admin_password, setAdminPassword] = useState('');
  const [admin_email, setAdminEmail] = useState('');
  const [admin_phone, setAdminPhone] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdminsubmit = (e) => {
    e.preventDefault();

    // if (!admin_password || !admin_password) {
    //   alert("Please fill out all admin fields!")
    //   return;
    // }
    navigate('/login/auth/admin', {
      //refer line 14 from Dashboard component
      state: {
        admin_username: admin_username,
        admin_email: admin_email,
        admin_phone: admin_phone
      }
    })
    alert(admin_username + '!' + '  ' + 'Welcome To admin Pannel')
    console.log('navigation has worked!')
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!FormData.firstname || !FormData.lastname || !FormData.email || !FormData.password) {
    //   alert("Please fill out all fields");
    //   return;
    // }

    // refer to FetchPersonal details component line 9
    navigate('/personal_details', {
      state:
      {
        firstname: formData.firstname,
        email: formData.email
      }
    })
    alert('Thank you for being successifully registered with Username:' + ' ' + formData.firstname)

    try {
      // Send registration data to the server using an API call
      const response = await fetch(RegisterApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle response from the server (e.g., show success message or errors)
      if (response.ok) {
        // Registration successful
        alert('Registration successful');
        console.log('Registration successful');
        // After successful registration, navigate to UserDashboard and pass firstname and email
        navigate('/user_dashboard_view');
      } else {
        // Registration failed
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    //refer to UserDashboard Component
    navigate('/user_dashboard_view', {
      state:
      {
        firstname: formData.firstname,
        email: formData.email
      }
    })

  };

  return (

    <div style={{ backgroundColor: 'rgb(203, 203, 201)' }}>

      {/* refer Personal_Info component line 6 */}
      {/* <FetchPersonalDetails firstname={formData.firstname} email={formData.email} /> */}


      <div className="login-container" style={{ backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>

        <form onSubmit={handleSubmit}>
          {/* <sup>My first page once the system runs to a device for user and admin...</sup> */}
          <h1 style={{ color: 'white', backgroundColor: 'white', fontWeight: 'bold', color: '#ccc' }}>Register As New User</h1>
          <input
            type="text"
            name="firstname"
            id='firstname'
            className='inputValues'
            placeholder='Enter first name'
            required
            class="placeholder-effect"
            data-placeholder="Enter First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            id='lastname'
            placeholder='Enter last name'
            class="placeholder-effect"
            data-placeholder="Enter Last Name"
            required
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id='email'
            placeholder='Enter email'
            class="placeholder-effect"
            data-placeholder="Enter Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id='password'
            placeholder='Enter pasword'
            class="placeholder-effect"
            data-placeholder="Enter Your Password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
          <Link to="/login" className="registered">Already registered? Please Login</Link>
          <hr />

        </form>

        <div style={{
          backgroundColor: 'rgb(100, 200, 200)',
          borderRadius: '10px'

        }}>
          <form className='ToBeCheckedLeter' onSubmit={handleAdminsubmit}>
            <b><h1 style={{ fontWeight: 'bold', color: '#ccc' }}>Admin Login</h1></b>

            <input
              type="text"
              id="admin-username"
              name="admin-username"
              className="placeholder-effect"
              data-placeholder="username"
              onChange={(e) => setAdminUsername(e.target.value)}
              placeholder="Enter admin Username"
              required />



            <input
              type="email"
              id="admin-email"
              name="admin-email"
              className="placeholder-effect"
              data-placeholder="email"
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter admin Email "
              required />

            <input
              type="number"
              id="admin-phone"
              name="admin-phone"
              className="placeholder-effect"
              data-placeholder="phone"
              onChange={(e) => setAdminPhone(e.target.value)}
              placeholder="Enter admin Phone number"
              required
              style={{ height: '42px', borderRadius: '5px' }} />

            <input
              type="password"
              id="admin-password"
              name="admin-password"
              className="placeholder-effect"
              data-placeholder="password"
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin Password "
              required />

            {/* <Link to='/login/auth/admin'> */}
            <button type="submit">Login as Admin</button>
            {/* </Link> */}

          </form>
        </div>

        <div className='element'></div>

      </div>

      <div className="first-view-container">
        {/* <FirstView /> */}
        {/* <Start/> */}
      </div>

    </div>
  );
};

export default RegistrationForm;
