import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Start from './UCMS/Start';
import SessionTimeout from './Session';

const App = () => {

  return (
    <div>
      {/* The Application Starts From Here... */}
      <Start />
      <SessionTimeout timeoutInMinutes={100} /> Timeout after 15 minutes of inactivity
    </div>
  );
};

export default App;
