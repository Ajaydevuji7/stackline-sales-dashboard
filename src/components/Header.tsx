import React from 'react';
import logo from '../assets/stackline-logo.svg';

const Header: React.FC = () => {
  return (
    <header style={{ backgroundColor: '#00214D', padding: '10px 20px' }}>
      <img src={logo} alt="Stackline Logo" style={{ height: '30px' }} />
    </header>
  );
};

export default Header;