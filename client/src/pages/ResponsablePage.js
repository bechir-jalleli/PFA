import React from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Typography, Space,  theme } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
const { Title } = Typography;

const ResponsablePage = () => {
  const { token } = theme.useToken();

  const pageStyle = {
    padding: token.padding,
    minHeight: '100vh',
    backgroundColor: token.colorBgContainer,
    color: token.colorText,
  };

  const iconStyle = {
    fontSize: 48,
    color: token.colorPrimary,
  };



  return (
    <MainLayout>
    <div style={pageStyle}>
      <Space align="center" style={{ marginBottom: token.marginLG }}>
        <TeamOutlined style={iconStyle} />
        <Title level={2} style={{ margin: 0, color: token.colorText }}>
          Responsable Dashboard
        </Title>
      </Space>

        
            <Outlet />
      
    </div>
  </MainLayout>

  );
};

export default ResponsablePage;