import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import '../images/slide_show.css';

const UserForm = () => {
    const styles = {
        container: {
            maxWidth: "450px",
            margin: "0 auto",
            padding: "10px",
            backgroundColor: "#fff",
            fontFamily: "'Arial', sans-serif"
        },
        card: {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        },
        cardHeader: {
            backgroundColor: "white",
            textAlign: "center",
            borderBottom: "none",
            fontSize: "2rem",
            fontWeight: 700,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px"
        },
        inputGroupText: {
            borderRadius: "0.25rem 0 0 0.25rem"
        },
        inputGroupFormControl: {
            borderRadius: "0 0.25rem 0.25rem 0",
            borderLeft: 0
        },
        inputGroupFormControlFocus: {
            boxShadow: "none",
            borderColor: "#80bdff"
        },
        btnPrimary: {
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "0.25rem"
        },
        btnPrimaryHover: {
            backgroundColor: "#0056b3",
            borderColor: "#004085"
        },
        formGroup: {
            marginBottom: "1.5rem"
        },
        h2: {
            backgroundColor: "white"
        },
        slideshow: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: -1,
            animation: 'slideshow 10s infinite'
        }
    };

    const authAPI = 'http://localhost:8080/api/v1/auth/authenticate';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setAlertMessage('Please fill in all fields');
            return;
        }
        try {
            const response = await authRequest(email, password);
            if (response.status === 200) {
                setAlertMessage('Successfully Signed in with ' + email + '. Welcome!');
                // Assuming the token is in response.data.token
                localStorage.setItem('authToken', response.data.token);
                navigate('/user_dashboard_view');
            } else {
                setAlertMessage('Authentication failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.log('authentication error:', error);
            setAlertMessage('Authentication error. Please try again later.');
        }
    };

    const authRequest = (email, password) => {
        return axios.post(authAPI, {
            email: email,
            password: password
        })
            .then(response => response)
            .catch(error => {
                throw error;
            });
    };

    return (
        <div>
            <div className="slideshow" style={styles.slideshow}></div>
            <div className="container mt-5" style={styles.container}>
                <div align="center">
                    <img src="cleaning-logo.webp" style={{ margin: 'auto', width: '45%' }} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow-sm" style={styles.card}>
                            <div className="card-header text-white" style={styles.cardHeader}>
                                <h2 style={styles.h2}>Sign In</h2>
                            </div>
                            <div className="card-body">
                                {alertMessage && (
                                    <Alert variant="danger" onClose={() => setAlertMessage('')} dismissible>
                                        <p>{alertMessage}</p>
                                    </Alert>
                                )}
                                <form onSubmit={handleSignIn}>
                                    <div className="form-group" style={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white border-right-0" style={styles.inputGroupText}>
                                                    <i style={{ padding: '10px' }} className="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input
                                                id="email"
                                                className="form-control border-left-0"
                                                style={styles.inputGroupFormControl}
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group" style={styles.formGroup}>
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-primary text-white border-right-0" style={styles.inputGroupText}>
                                                    <i style={{ padding: '10px' }} className="fa fa-key"></i>
                                                </span>
                                            </div>
                                            <input
                                                id="password"
                                                className="form-control border-left-0"
                                                style={styles.inputGroupFormControl}
                                                type="password"
                                                required
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group" style={styles.formGroup}>
                                        <button type="submit" className="btn btn-primary btn-block" style={styles.btnPrimary}>
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
