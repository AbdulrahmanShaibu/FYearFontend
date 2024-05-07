// AuthenticationForm.js
import React, { useState } from 'react';

const AuthenticationForm = () => {

  const AuthAPI='http://localhost:8080/api/v1/auth/authenticate';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthentication = async (e) => {
    e.preventDefault();
    try {
      // Send authentication data to the server using an API call
      const response = await fetch(AuthAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle response from the server (e.g., show success message or errors)
      if (response.ok) {
        // Authentication successful
        alert('Authentication successful');
        console.log('Authentication successful');
        // Redirect to the admin dashboard or perform any other action
        // window.location.href = '/admin/dashboard';
      } else {
        // Authentication failed
        alert('Authentication failed');
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <form onSubmit={handleAuthentication}>
      <h2>User Authentication
        <sub>failed to work...</sub>
      </h2>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
     <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Authenticate</button>
    </form>
  );
};

export default AuthenticationForm;
