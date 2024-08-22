// src/pages/LogoutPage.js
import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography } from 'antd';

const { Title } = Typography;

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Perform the logout action
    logout();
    
    // Optionally display a spinner while logging out
    // Redirect to login or home page once done
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <Title>Logging out...</Title>
      <Spin size="large" />
    </div>
  );
};

export default LogoutPage;
