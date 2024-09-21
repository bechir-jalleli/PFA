import React from 'react';
import { Result, Button, Typography, Layout, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import AppHeader from '../layouts/Header';
import AppFooter from '../layouts/Footer';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const NotFoundPage = () => {
  const { isDarkMode } = useTheme();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: isDarkMode ? '#001529' : '#f0f2f5',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const notFoundBoxStyle = {
    background: isDarkMode ? '#141414' : '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '30px',
    width: '100%',
    maxWidth: '1000px',
  };

  return (
    <Layout style={containerStyle}>
      <AppHeader />
      <Content style={contentStyle}>
        <div style={notFoundBoxStyle}>
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12} order={2} md={{ order: 1 }}>
              <Result
                status="404"
                title={<Title level={1}>404</Title>}
                subTitle={<Title level={3}>Oops! Page not found</Title>}
              />
             
              <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
                <Link to="/">
                  <Button type="primary" size="large">Back to Home</Button>
                </Link>
                
              </Space>
            </Col>
           
          </Row>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default NotFoundPage;
