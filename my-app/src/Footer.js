// CopyrightFooter.js
import { Copyright } from '@mui/icons-material';
import React from 'react';

const CopyrightFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px'
  };

  return (
    <div style={footerStyle}>
      <Copyright /> {currentYear} University Cleaners Management System. All rights reserved.
    </div>
  );
};

export default CopyrightFooter;
