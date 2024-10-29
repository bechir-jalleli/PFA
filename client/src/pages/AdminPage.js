import React from 'react';
import {  Space, theme } from 'antd';
import MainLayout from '../layouts/MainLayout';
import { Outlet } from 'react-router-dom'; 


const AdminPage = () => {
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
