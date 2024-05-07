import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import UserForm from './Form';
import Events from './Events';
import Users from './Users';
import Venues from './Venues';
import Organisers from './Organisers';
import News from './News';
import Setting from './Setting';
import Welcome from './Welcome';
import AuthDashboard from './AuthDashboard';
import FetchPersonalDetails from './Personal_Info';
import AccountSetting from './Account';
import UserDashboard from './UserDashboard';
import SessionPage from './SessionPage';
import RegistrationForm from './RegistrationForm';
import GenerateReport from './Report';
import SystemDocumentation from './Documentation';
import Start from './Start';
import Departments from './Departments'
import Employees from './Employees'
import CleaningAreas from './Areas'
import ViewEmployees from './UserView/ViewEmply';
import ViewDepartments from './UserView/ViewDeptm';
import ViewTools from './UserView/ViewTools';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<UserForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/university_events/dashboard_view' element={<Welcome />} />
        <Route path='/login/auth/admin' element={<AuthDashboard />} />
        <Route path='/events' element={<Events />} />
        <Route path='/registered_users' element={<Users />} />
        <Route path='/available_venues' element={<Venues />} />
        <Route path='/organisers_list' element={<Organisers />} />
        <Route path='/latest_news' element={<News />} />
        <Route path='/user_setting' element={<Setting />} />
        <Route path='/personal_details' element={<FetchPersonalDetails />} />
        <Route path='/user_account_setting' element={<AccountSetting />} />
        <Route path='/generated_report' element={<GenerateReport />} />
        <Route path='/system/doc' element={<SystemDocumentation />} />
        <Route path='/home' element={<Start />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/cleaning_areas' element={<CleaningAreas />} />

        {/* To be fixed letter with UserDashboard...*/}
        <Route path="/user_dashboard_view" element={<UserDashboard />} />

        <Route path='view_employees' element={<ViewEmployees />}></Route>
        <Route path='view_departments' element={<ViewDepartments />}></Route>
        <Route path='view_tools' element={<ViewTools />}></Route>

        <Route path='/signout' element={<App />} />
        <Route path='/session-timed-out' element={<SessionPage />} />
        <Route path="*" element={<p>Path not resolved</p>} />

        {/* Form Routing */}
        {/* <Route path='/edit/supervisor/form'></Route> */}

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// reportWebVitals();
