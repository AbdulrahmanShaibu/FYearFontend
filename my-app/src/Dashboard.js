
import CopyrightFooter from './Footer';
import { useLocation } from 'react-router-dom';


const Dashboard = () => {

  const profileImageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&usqp=CAU';

  //refer line 42 from registration form
  const location = useLocation();
  const { state } = location;
  const {
    admin_username,
    admin_email,
    admin_phone
  } = state || {}; // Destructure form data from state

  return (

    <div>

      <aside></aside>

      <main style={{ backgroundColor: 'rgba(73, 161, 157, 0.3)' }}>
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', margin: '0 auto', maxWidth: '500px', paddingTop: '95px' }}>
          <div style={{ backgroundColor: 'rgb(240, 241, 242)' }}>
            <div style={{ backgroundColor: 'white' }}>
              <h3 style={{ color: 'green', fontWeight: 'bolder', margin: 'auto', textAlign: 'center' }}>Welcome {admin_username}! 👏</h3>
              <hr />
            </div>
            <div
              style={{
                maxWidth: '370px',
                height: 'auto',
                margin: 'auto',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '700px'
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${profileImageURL}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '250px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: '#ffffff',
                    padding: '20px',
                    width: '100%',
                    position: 'absolute',
                    bottom: '0',
                    boxSizing: 'border-box',
                  }}
                >
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    <li>Email: {admin_email}</li>
                    <li>Phone: {admin_phone}</li>
                    {/* Add more items as needed */}
                  </ul>
                </div>
              </div>
              <div className='AdminBox' style={{ backgroundColor: 'wheat', padding: '20px' }}>
                <h4></h4>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li>Display Other Admin details</li>
                  <li>Display Other Admin details</li>
                </ul>


              </div>
            </div>

            <div style={
              {
                backgroundColor: 'rgb(100, 200, 200)',
                maxWidth: '500px',
                height: '100px',
                display: 'flex',
                margin: 'auto',
                // display: 'flex'
              }
            }>
              <div style={{
                color: 'white', fontSize: '14.5px',
                fontWeight: 'bolder', maxWidth: '500px', textAlign: 'center'
              }}
              >Admin Email: {admin_email}</div>
              <div style={{
                color: 'white', fontSize: '14.5px',
                fontWeight: 'bolder', maxWidth: '500px', textAlign: 'center'
              }}>
                Admin Name: {admin_username}</div>
              <div style={{
                color: 'white', fontSize: '14.5px',
                fontWeight: 'bolder', maxWidth: '500px', textAlign: 'center'
              }}>
                Admin Role: Super Admin</div>
              <div style={{
                color: 'white', fontSize: '14.5px',
                fontWeight: 'bolder', maxWidth: '500px', textAlign: 'center'
              }}>
                Admin Contact: {admin_phone}</div>

            </div>
          </div>
        </div>
      </main>
      {/* <br /><br /><br /> */}
      {/* <CopyrightFooter /> */}
    </div>
  );
};

export default Dashboard;
