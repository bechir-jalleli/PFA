import React from 'react';
import { Typography, Card, Space, Row, Col, Statistic, Button, theme } from 'antd';
import { BankOutlined, TeamOutlined, BranchesOutlined, PlusOutlined } from '@ant-design/icons';
import ReadOrganisations from './ReadOrganisations';
import { useTheme } from '../../Context/ThemeContext';

const { Title } = Typography;

const OrganisationsDashboard = () => {
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
    <div style={pageStyle}>
      <Space align="center" style={{ marginBottom: token.marginLG }}>
        <BankOutlined style={iconStyle} />
        <Title level={2} style={{ margin: 0, color: token.colorText }}>
          Organisations Dashboard
        </Title>
      </Space>

      <Row gutter={[16, 16]} style={{ marginBottom: token.marginLG }}>
        <Col xs={24} sm={8}>
          <Card style={cardStyle}>
            <Statistic title="Total Organisations" value={50} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={cardStyle}>
            <Statistic title="Total Employees" value={1000} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={cardStyle}>
            <Statistic title="Departments" value={20} prefix={<BranchesOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card 
        title="Organisations List" 
        style={cardStyle}
      >
        <ReadOrganisations />
      </Card>
    </div>
  );
};

export default OrganisationsDashboard;