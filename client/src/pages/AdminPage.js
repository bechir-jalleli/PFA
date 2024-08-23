import React from 'react';
import { Typography, Card, Row, Col, Space, Statistic, Button, theme } from 'antd';
import { DashboardOutlined, UserOutlined, TeamOutlined, ProjectOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadAdmins from '../components/Admin/ReadAdmins';
import { useTheme } from '../styles/Context/ThemeContext';

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

  const iconStyle = {
    fontSize: 48,
    color: token.colorPrimary,
  };

  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadow,
    backgroundColor: isDarkMode ? token.colorBgElevated : token.colorBgContainer,
  };

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <DashboardOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Admin Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]} style={{ marginBottom: token.marginLG }}>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic
                title="Total Users"
                value={1128}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic
                title="Active Projects"
                value={93}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic
                title="Team Members"
                value={186}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card 
          title="Admin List" 
          style={cardStyle}
          extra={<Button type="primary">Add New Admin</Button>}
        >
          <ReadAdmins />
        </Card>
      </div>
    </MainLayout>
  );
});

export default AdminPage;
