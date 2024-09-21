import React from 'react';
import { Typography, Space, theme } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes

const { Title } = Typography;

const AdminPage = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const pageStyle = {
    padding: token.padding,
    minHeight: '100vh',
    backgroundColor: token.colorBgContainer,
    color: token.colorText,
  };

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
         
        </Space>
        <Outlet />
      </div>
    </MainLayout>
  );
};

export default AdminPage;
