import React from 'react';
import { Typography, Space, theme } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import AdminDashboard from '../components/Admin/AdminDashboard'; // Import the AdminDashboard component

const { Title } = Typography;

const AdminPage = React.memo(() => {
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
          <DashboardOutlined style={{ fontSize: 48, color: token.colorPrimary }} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Admin Dashboard
          </Title>
        </Space>
        <AdminDashboard /> 
      </div>
    </MainLayout>
  );
});

export default AdminPage;
