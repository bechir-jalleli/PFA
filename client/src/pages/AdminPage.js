// src/pages/AdminPage.js
import React from 'react';
import { Typography, Card, Space, Button, Row, Col } from 'antd';
import { DashboardOutlined, PlusCircleOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadAdmins from '../components/Admin/ReadAdmins';
import styled from 'styled-components';
import { useTheme } from '../Context/ThemeContext';

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s ease;
  background-color: ${props => props.isDarkMode ? '#1f1f1f' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};

  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .ant-card-head-title {
    color: ${props => props.isDarkMode ? '#ffffff' : '#000000'};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  color: ${props => props.isDarkMode ? '#ffffff' : '#000000'} !important;
  margin-left: 8px !important;
`;

const AdminPage = React.memo(() => {
  const { isDarkMode } = useTheme();

  return (
    <MainLayout>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <IconWrapper>
            <DashboardOutlined style={{ fontSize: 32, color: isDarkMode ? '#1890ff' : '#0050b3' }} />
            <StyledTitle level={2} isDarkMode={isDarkMode}>Admin Dashboard</StyledTitle>
          </IconWrapper>
        </Col>
        
        <Col xs={24} lg={8}>
          <StyledCard title="Admin Overview" isDarkMode={isDarkMode}>
            <p>Welcome to the Admin Dashboard. Here you can manage users, view system statistics, and perform other administrative tasks.</p>
          </StyledCard>
        </Col>
        
        <Col xs={24} lg={16}>
          <StyledCard title="Admin List" isDarkMode={isDarkMode}>
            <ReadAdmins />
          </StyledCard>
        </Col>
        
        <Col xs={24}>
          <StyledCard title="Quick Actions" isDarkMode={isDarkMode}>
            <Space wrap>
              <Button type="primary" icon={<PlusCircleOutlined />}>Add New Admin</Button>
              <Button icon={<FileTextOutlined />}>Generate Report</Button>
              <Button icon={<SettingOutlined />}>System Settings</Button>
            </Space>
          </StyledCard>
        </Col>
      </Row>
    </MainLayout>
  );
});

export default AdminPage;
