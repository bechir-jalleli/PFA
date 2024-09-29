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
