import Home from "./UCMS/Home";
import './styles/setting_account.css';

const AccountSetting = () => {
    return (

        <div style={{ backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>
            <Home />

            <br /><br /><br />
            <div className="account-settings">
                {/* <h1>Account Settings</h1> */}

                {/* Personal Information Section */}
                <div className="section">
                    <h3 style={{ color: 'grey', backgroundColor: 'white' }}>Account Settings</h3><br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="fullName">Enter Current Email</label>
                            <input type="text" id="fullName" name="fullName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Enter New Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        {/* Add more personal information fields */}

                        <button type="submit">Save Changes</button>
                        <hr />
                    </form>
                </div>

                {/* Security Settings Section */}
                <div className="section">
                    {/* <h3>Security Settings</h3> */}
                    <form>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" name="currentPassword" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" id="newPassword" name="newPassword" required />
                        </div>

                        {/* Add more security settings fields */}

                        <button type="submit">Update Password</button>
                    </form>
                </div>

                {/* Notification Settings Section */}
                {/* <div className="section">
                    <h2>Notification Settings</h2>
                    <div className="notification-options">
                        <label>
                            <input type="checkbox" name="emailNotifications" defaultChecked />
                            Receive Email Notifications
                        </label>

                        <label>
                            <input type="checkbox" name="smsNotifications" />
                            Receive SMS Notifications
                        </label>
                    </div>
                </div> */}
            </div>

        </div>
    );
}
export default AccountSetting;