import { useLocation } from "react-router-dom";
import UserHome from "./UserHome";
import '../styles/sidebar.css';

const UserDashboard = () => {
    const location = useLocation();
    const { state } = location;
    const { firstname, email } = state || {};

    console.log('Received props:', firstname, email);

    return (
        <div style={{ margin: 'auto', marginTop: '80px', width: '950px' }}>
            <UserHome />
            <div>
                <div style={{ margin: 'auto', width: '25%' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '15px', color: 'green', fontWeight: 'bold' }}>Congratulations!</h2>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Welcome, {firstname}!</p>
                    <p style={{ fontSize: '18px', marginBottom: '10px', color: '#555' }}>Email: {email}</p>
                    {/* <span style={{ fontSize: '14px', color: '#777', fontWeight: 'bold' }}>Any Claim from {firstname}! Please report 🤗</span> */}
                </div>

            </div>
        </div>
    );
};
export default UserDashboard;
