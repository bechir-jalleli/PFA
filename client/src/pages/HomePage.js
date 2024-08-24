import React, { useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, Button, Space, theme } from 'antd';
import { RocketOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
const { Content} = Layout;
const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

const HomePage = () => {
  const { isDarkMode } = useTheme();
  const { token } = useToken();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigateBasedOnRole(user.role);
    }
  }, [isAuthenticated, user, navigate]);

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'responsable':
        navigate('/responsables');
        break;
      case 'chef-project':
        navigate('/chef-projects');
        break;
      case 'membre-equipe':
        navigate('/membre-equipes');
        break;
      default:
        // If role is not recognized, stay on the home page
        break;
    }
  };

  const cardShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

  // If the user is authenticated, don't render the home page content
  if (isAuthenticated && user) {
    return null; // or you could return a loading spinner here
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
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
            <img src="../assets/image/business-growth.jpg" alt="GRC Illustration" style={{ width: '100%', maxWidth: '500px' }} />
          </Col>
        </Row>

        <Row gutter={[32, 32]} style={{ marginTop: '50px' }}>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <SafetyOutlined style={{ fontSize: '48px', color: token.colorPrimary }} />
              <Title level={3}>Risk Management</Title>
              <Paragraph>
                Identify, assess, and mitigate risks effectively with our advanced risk management tools.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <TeamOutlined style={{ fontSize: '48px', color: token.colorPrimary }} />
              <Title level={3}>Compliance</Title>
              <Paragraph>
                Stay compliant with regulatory requirements and industry standards using our compliance management features.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable style={{ boxShadow: cardShadow }}>
              <RocketOutlined style={{ fontSize: '48px', color: token.colorPrimary }} />
              <Title level={3}>Governance</Title>
              <Paragraph>
                Improve overall governance with our comprehensive suite of tools and best practices.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default HomePage;
