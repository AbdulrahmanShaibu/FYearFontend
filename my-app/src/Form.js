import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        console.log('Navigate to dashboard');
        alert('Successfully Signed in with ' + email + '. Welcome!');
        navigate('/university_events/dashboard_view');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">Sign In Form</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="email"
                                        required
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type='password'
                                        required
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-block"
                                        onClick={handleSignIn}>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;
