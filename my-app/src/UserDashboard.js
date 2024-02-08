import React from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import './styles/sidebar.css'
import UserHome from "./UserHome";
import AuthDashboard from './AuthDashboard';
import { useLocation } from "react-router-dom";
import CopyrightFooter from "./Footer";

const UserDashboard = () => {

    //refer line 82 from registration component
    const location = useLocation();
    const { state } = location;
    const { firstname, email } = state || {}; // Destructure form data from state

    // Log received props to the console
    console.log('Received props:', firstname, email);

    const styles = {
        container: {
            padding: '20px',
            border: '2px solid #ccc',
            borderRadius: '5px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '0 auto',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#333',
        },
        paragraph: {
            fontSize: '18px',
            marginBottom: '10px',
            color: '#555',
        },
        subtext: {
            fontSize: '14px',
            color: '#777',
        },
    };

    return (
        <div style={{ width: '100%' }}>
            <UserHome />
            {/* <AuthDashboard /> to be implimented[check 'AuthDashboard then..'] for this to work, create UserAuthDashboard */}
            <UserSidebar />

            <div className="fetchingUserData" style={styles.container}>
                <strong><h2 style={styles.heading}>Congratulations!</h2></strong>
                <p style={styles.paragraph}>Welcome,{firstname}!</p>
                <p style={styles.paragraph}>Email:{email}</p>
                <sub style={styles.subtext}>Any Claim from {firstname}! Please report 🤗</sub>
            </div>

            <div className="addDataButton">
                <hr
                    style={{
                        border: 'none',
                        height: '3px',
                        backgroundColor: 'green',
                        margin: '20px 0'
                    }} />
                <br /><br />
            </div>

            <div>
                <div style={{ display: 'flex' }}>
                    <section className="event">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3m5LFcQzE9oL6FJHHoC5GbDkorAaGRk-xjw&usqp=CAU"
                            alt="Event 1"
                        />
                        <div className="event-details">
                            <h2>IOT Innovation</h2>
                            <p>Date: October 15, 2023</p>
                            <p>Time: 10:00 AM - 4:00 PM</p>
                            <p>Location: Venue Name</p>
                            <p>Description: Lorem ipsum.</p>
                            <Link to="#">Post Claims</Link>
                        </div>
                    </section>

                    <section className="event">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokFPdnO3GM1X6dH1dPvKhhkwKHsfv2YNsOg&usqp=CAU"
                            alt="Event 2"
                        />
                        <div className="event-details">
                            <h2>Public Talk</h2>
                            <p>Date: November 5, 2023</p>
                            <p>Time: 1:00 PM - 7:00 PM</p>
                            <p>Location: Another Venue</p>
                            <p>Description: Duis aute pariatur.</p>
                            <Link to="#">Post Claims</Link>
                        </div>
                    </section>

                    <section className="event">
                        <img
                            src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Event 2"
                        />
                        <div className="event-details">
                            <h2>AI For Future</h2>
                            <p>Date: December 25, 2023</p>
                            <p>Time: 1:00 PM - 8:00 PM</p>
                            <p>Location: Another Venue</p>
                            <p>Description: Duis nulla pariatur.</p>
                            <Link to="#">Post Claims</Link>
                        </div>
                    </section>
                </div>

                <hr />

                <div style={{ display: 'flex' }}>
                    <section className="event">
                        <img
                            src="https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Event 2"
                        />
                        <div className="event-details">
                            <h2>ML Training</h2>
                            <p>Date: November 30, 2023</p>
                            <p>Time: 4:00 PM - 6:10 PM</p>
                            <p>Location: Another Venue</p>
                            <p>Description: Duis cillum pariatur.</p>
                            <Link to="#">Post Claims</Link>
                        </div>
                    </section>
                    <section className="event">
                        <img
                            src="https://images.pexels.com/photos/247791/pexels-photo-247791.png?auto=compress&cs=tinysrgb&w=600"
                            alt="Event 2"
                        />
                        <div className="event-details">
                            <h2>#Tech Codathon</h2>
                            <p>Date: January 15, 2024</p>
                            <p>Time: 7:00 AM - 10:20 AM</p>
                            <p>Location: Another Venue</p>
                            <p>Description: Duis  dolore pariatur.</p>
                            <Link to="#">Post Claims</Link>
                        </div>
                    </section>
                </div>
            </div>
            <CopyrightFooter />
        </div>
    );
}
export default UserDashboard;