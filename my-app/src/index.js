import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import UserForm from './UCMS/Form';
import Setting from './Setting';
import Welcome from './UCMS/Welcome';
import AuthDashboard from './UCMS/AuthDashboard';
import FetchPersonalDetails from './Personal_Info';
import AccountSetting from './Account';
import UserDashboard from './UserView/UserDashboard';
import SessionPage from './SessionPage';
import RegistrationForm from './UCMS/RegistrationForm';
import GenerateReport from './UCMS/Report';
import SystemDocumentation from './Documentation';
import Start from './UCMS/Start';
import UserWelcome from './UserView/UserWelcome';
import ViewTools from './UserView/ViewClientOrganisations';
import ErrorPath from './ErrorPage';


import About from "./pages/About";
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Services from './pages/Services';
import Project from './pages/Project';
import Blog from './pages/Blogs';
import ServiceDetails from './pages/ServiceDetails';
import ProjectDetails from './pages/ProjectDetails';
import BlogDetails from './pages/BlogDetails';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/default.css';
import './assets/css/main.css';
import './assets/css/responsive.css';
import './assets/vendor/modal-video/modal-video.min.css';
import './assets/vendor/slick/slick.css';
import Tools from './UCMS/Tools';
import CompanyStaffs from './UCMS/CompanyStaffs';
import ClientSites from './UCMS/ClientSites';
import StaffComplain from './UCMS/StaffComplain';
import ClaimType from './UCMS/ClaimsType';
import Attachements from './UCMS/Attachements';
import ClientOrganisation from './UCMS/ClientOrganisor';
import Staffs from './UCMS/Staffs';
import CleaningCompany from './UCMS/CleaningCompany';
import ViewCleaningCompany from './UserView/ViewCleaningComp';
import Admin from './UCMS/Admin'
import ViewCompanyStaffs from './UserView/ViewCompStaffs';
import UserHome from './UserView/UserHome';
<<<<<<< HEAD
=======
import UserAttachments from './UserView/UserAttachements';
import UserStaffComplain from './UserView/UserStaffsComplains';
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<UserForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/admin-login' element={<Admin />}></Route>
<<<<<<< HEAD
        <Route path='/university_events/dashboard_view' element={<Welcome/>} />
=======
        <Route path='/university_events/dashboard_view' element={<Welcome />} />
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e
        <Route path='/login/auth/admin' element={<AuthDashboard />} />
        <Route path='/tools' element={<Tools />} />
        <Route path='/staff_complain' element={<StaffComplain />} />
        <Route path='/client_organisation' element={<ClientOrganisation />} />
        <Route path='/claim_type' element={<ClaimType />} />
        <Route path='/company_staffs' element={<CompanyStaffs />} />
        <Route path='/user_setting' element={<Setting />} />
        <Route path='/personal_details' element={<FetchPersonalDetails />} />
        <Route path='/user_account_setting' element={<AccountSetting />} />
        <Route path='/generated_report' element={<GenerateReport />} />
        <Route path='/system/doc' element={<SystemDocumentation />} />
        <Route path='/home' element={<Start />} />
        <Route path='/client_sites' element={<ClientSites />} />
        <Route path='/staffs' element={<Staffs />} />
        <Route path='/attachements' element={<Attachements />} />
        <Route path='/cleaning_company' element={<CleaningCompany />} />

        {/* To be fixed letter with UserDashboard...*/}
        <Route path='/user/dashboard' element={<UserWelcome />} />
        <Route path="/user_dashboard_view" element={<UserDashboard />} />
        <Route path="/user_home" element={<UserHome />}></Route>
        <Route path='view_cleaning-company' element={<ViewCleaningCompany />}></Route>
        <Route path='view_company-staffs' element={<ViewCompanyStaffs />}></Route>
        <Route path='view_client-organisation' element={<ViewTools />}></Route>
<<<<<<< HEAD
=======
        <Route path='/user_attachments' element={<UserAttachments />}></Route>
        <Route path='/user_staffs/complains' element={<UserStaffComplain />}></Route>
>>>>>>> e7c16460ae96db764c331a70d48a65f361ffde1e

        <Route path='/signout' element={<App />} />
        <Route path='/session-timed-out' element={<SessionPage />} />
        <Route path="*" element={<ErrorPath />} />

        {/* Form Routing */}
        {/* <Route path='/edit/supervisor/form'></Route> */}

        {/* Website Routing */}
        <Route path="/about" exact element={<About />} />
        <Route path="/services" exact element={<Services />} />
        <Route path="/service-details" exact element={<ServiceDetails />} />
        <Route path="/projects" exact element={<Project />} />
        <Route path="/project-details" exact element={<ProjectDetails />} />
        <Route path="/blogs" exact element={<Blog />} />
        <Route path="/blog-details" exact element={<BlogDetails />} />
        <Route path="/faq" exact element={<Faq />} />
        <Route path="/contact" exact element={<Contact />} />

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// reportWebVitals();
