// CopyrightFooter.js
import React from 'react';

const CopyrightFooter = () => {

  const currentYear = new Date().getFullYear();

  const copyrightStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
  };

  return (
    <div style={{copyrightStyle ,textAlign: 'center', padding: '5.5px', backgroundColor: '#333', color: 'white' }}>
      &copy; {currentYear} University Events Management System. All rights reserved.
    </div>
  );
};

export default CopyrightFooter;
