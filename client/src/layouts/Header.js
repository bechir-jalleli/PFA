// src/layouts/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import ThemeToggle from '../Context/ThemeToggle';
import { useAuth } from '../Context/AuthContext';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AntHeader style={headerStyle}>
      <div style={logoContainerStyle}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={logoStyle}>GRC</h1>
        </Link>
        <ThemeToggle style={{ marginLeft: '25px', color: 'white' }} />
      </div>
      {isLoggedIn ? (
        <Button type="primary" onClick={handleLogout} style={buttonStyle}>
          Logout
        </Button>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>
          <Button type="primary" style={buttonStyle}>
            Login
          </Button>
        </Link>
      )}
    </AntHeader>
  );
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 ',
  backgroundColor: '#1e1e2f',
  boxShadow: 'inset 5px 5px 10px #14141e, inset -5px -5px 10px #282846',
  position: 'fixed', // Fixes the position at the top
  top: 0, // Positions the header at the top of the page
  left: 0,
  right: 0,
  zIndex: 1000, // Ensures the header stays on top of other elements
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  color: 'white',
  margin: 0,
  fontSize: '24px',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

const buttonStyle = {
  backgroundColor: '#3b3b5b',
  borderColor: '#3b3b5b',
  boxShadow: 'inset 2px 2px 5px #2b2b3b, inset -2px -2px 5px #4b4b6b',
  borderRadius: '10px',
};

export default Header;
