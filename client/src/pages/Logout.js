import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spin, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      setTimeout(() => navigate('/login'), 2000);
    };
    performLogout();
  }, [logout, navigate]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Space direction="vertical" align="center" size="large">
        <img src="https://undraw.co/illustrations/undraw_login_re_4vu2.svg" alt="Logout Illustration" style={{ width: '200px' }} />
        <Title level={2}>Logging out...</Title>
        <Paragraph>Thank you for using GRCWebsite. See you soon!</Paragraph>
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default LogoutPage;
