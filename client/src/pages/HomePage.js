import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space } from 'antd';
import { RocketOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../styles/Context/ThemeContext';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { theme, isDarkMode } = useTheme();

  const cardShadow = theme?.shadows?.[1] || '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

  return (
    <MainLayout>
      <Content style={{ padding: '50px 50px' }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <Title>Welcome to GRCWebsite</Title>
            <Paragraph>
              Your comprehensive platform for Governance, Risk, and Compliance management. 
              Streamline your organization's GRC processes, ensure efficiency, and maintain compliance.
            </Paragraph>
            <Space>
              <Button type="primary" size="large" icon={<RocketOutlined />}>Get Started</Button>
              <Button size="large">Learn More</Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <img src="https://placeholder.com/3d-illustration-grc" alt="GRC Illustration" style={{ width: '100%', maxWidth: '500px' }} />
          </Col>
        </Row>

        <Row gutter={[32, 32]} style={{ marginTop: '50px' }}>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <SafetyOutlined style={{ fontSize: '48px', color: theme.colorPrimary }} />
              <Title level={3}>Risk Management</Title>
              <Paragraph>
                Identify, assess, and mitigate risks effectively with our advanced risk management tools.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <TeamOutlined style={{ fontSize: '48px', color: theme.colorPrimary }} />
              <Title level={3}>Compliance</Title>
              <Paragraph>
                Stay compliant with regulatory requirements and industry standards using our compliance management features.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <RocketOutlined style={{ fontSize: '48px', color: theme.colorPrimary }} />
              <Title level={3}>Governance</Title>
              <Paragraph>
                Improve overall governance with our comprehensive suite of tools and best practices.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </MainLayout>
  );
};

export default HomePage;
