import React from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, Tree, theme } from 'antd';
import { ApartmentOutlined, PlusOutlined, BranchesOutlined, TeamOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadSousOrganisation from '../components/SousOrganisation/ReadSousOrganisations';
import { useTheme } from '../Context/ThemeContext';
import { Outlet } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const SousOrganisationPage = () => {
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

  const treeData = [
    {
      title: 'Main Organization',
      key: '0-0',
      children: [
        { title: 'Sub-Org 1', key: '0-0-0' },
        { title: 'Sub-Org 2', key: '0-0-1' },
        {
          title: 'Sub-Org 3',
          key: '0-0-2',
          children: [
            { title: 'Department 1', key: '0-0-2-0' },
            { title: 'Department 2', key: '0-0-2-1' },
          ],
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <ApartmentOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Sous-Organisation Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Total Sub-Organizations" value={15} prefix={<BranchesOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Departments" value={30} prefix={<ApartmentOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Employees" value={500} prefix={<TeamOutlined />} />
            </Card>
          </Col>
          <Col xs={24} lg={24}>
            <Card 
              title="Sous-Organisation List" 
              style={cardStyle}
              extra={<Button type="primary" icon={<PlusOutlined />}>Add Sub-Organization</Button>}
            >
              <ReadSousOrganisation />
            </Card>
          </Col>
          
        </Row>
      </div>
      <Outlet />
    </MainLayout>
  );
};

export default SousOrganisationPage;