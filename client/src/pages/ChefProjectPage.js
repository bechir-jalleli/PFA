import React from 'react';
import { Typography, Space, theme } from 'antd';
import {  TeamOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadChefProject from '../components/ChefProject/ReadChefProject';
import { Outlet } from 'react-router-dom';

const { Title } = Typography;

const ChefProjectPage = () => {
  const { token } = theme.useToken();

  const pageStyle = {
    padding: token.padding,
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
          Chef Project Dashboard
        </Title>
      </Space>

        
           <Outlet />
      
    </div>
    </MainLayout>

  );
};

export default ChefProjectPage;
