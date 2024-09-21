import React from 'react';
import { Typography, Space, Card, Row, Col, Progress, List, Avatar, Button, theme } from 'antd';
import { ProjectOutlined, TeamOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadChefProject from '../components/ChefProject/ReadChefProject';
import { useTheme } from '../Context/ThemeContext';
import { Outlet } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const ChefProjectPage = () => {
  const { isDarkMode } = useTheme();
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

  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadow,
    backgroundColor: isDarkMode ? token.colorBgElevated : token.colorBgContainer,
  };

  const dummyProjects = [
    { name: 'Website Redesign', progress: 75 },
    { name: 'Mobile App Development', progress: 30 },
    { name: 'Database Migration', progress: 90 },
  ];

  return (
    <MainLayout>
      
      <Outlet />
    </MainLayout>
  );
};

export default ChefProjectPage;
