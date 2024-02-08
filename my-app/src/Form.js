import React, { useState } from 'react';
import "./Form.css"
import Home from './Home';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


const UserForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Access the history object

    const handleSignIn = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Check if the fields are empty
        if (!email || !password) {
            alert('Please fill in all fields');
            return; // Stops the function execution if fields are empty
        }

        // Proceed to navigate to the dashboard if fields are not empty
        console.log('Navigate to dashboard');
        alert('Successifully Signed in with' + ' ' + ' ' + email + ' ' + ' ' + 'Welcome!');
        navigate('/university_events/dashboard_view');
    };

    return (
        <div style={{ backgroundColor: 'rgb(100, 200, 200)' }}>
            <sup>to be fixed letter-- sidebar pannel is not required here...</sup>
            <Home />
            <br />
            <section className='LoginContainer'>
                <div style={{ margin: 'auto' }}> <h2 className='heading'>Signin Form</h2><hr /></div>

                <section className='FormContents'>
                    <form className='FormTag'>
                        <label className='labelStyling'>Enter Email Address</label>
                        <input
                            className='inputStyling'
                            required
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className='labelStyling'>Enter Your Password</label>
                        <input
                            type='password'
                            className='inputStyling'
                            required
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                        {/* <Link to={'/university_events/dashboard_view'}> */}
                        <button onClick={handleSignIn}>Please Sign In</button>
                        {/* </Link> */}

                    </form>
                </section>
            </section>
        </div>
    );

}
export default UserForm;