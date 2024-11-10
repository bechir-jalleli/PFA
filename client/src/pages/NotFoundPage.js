import React from 'react';
import { Result, Button, Typography, Layout, Row, Col, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import AppHeader from '../layouts/Header';
import AppFooter from '../layouts/Footer';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const NotFoundPage = () => {
  const { isDarkMode } = useTheme();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: isDarkMode ? '#141414' : '#f0f2f5',
  };

  const contentStyle = {
    flex: 1,
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const notFoundBoxStyle = {
    background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: isDarkMode 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(31, 38, 135, 0.15)',
    padding: '50px',
    width: '100%',
    maxWidth: '900px',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <Layout style={containerStyle}>
      <AppHeader />
      <Content style={contentStyle}>
        {/* Animated Background Elements */}
        <div className="animated-bg">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
          <div className="square s1"></div>
          <div className="square s2"></div>
        </div>

        <div style={notFoundBoxStyle}>
          <Row justify="center" align="middle">
            <Col xs={24} style={{ textAlign: 'center' }}>
              <div className="glitch-wrapper">
                <div className="glitch" data-text="404">404</div>
              </div>
              <Title level={3} style={{ 
                marginBottom: '24px', 
                color: isDarkMode ? '#ffffff' : '#000000',
                fontSize: '2em' 
              }}>
                Page Not Found
              </Title>
              <Text style={{ 
                fontSize: '1.1em', 
                display: 'block', 
                marginBottom: '40px',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : '#666666' 
              }}>
                The page you're looking for has drifted into the digital void
              </Text>
              <Space size="large">
                <Link to="/">
                  <Button 
                    type="primary"
                    size="large"
                    icon={<HomeOutlined />}
                    className="gradient-button"
                  >
                    Return Home
                  </Button>
                </Link>
                <Button 
                  ghost
                  size="large"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => window.history.back()}
                  className="outline-button"
                >
                  Go Back
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
      <AppFooter />
      <style>
        {`
          .animated-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .circle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, #1890ff, #36cfc9);
            animation: float 8s infinite;
          }

          .c1 {
            width: 150px;
            height: 150px;
            top: 10%;
            left: 15%;
            opacity: 0.3;
          }

          .c2 {
            width: 200px;
            height: 200px;
            bottom: 20%;
            right: 15%;
            opacity: 0.2;
          }

          .c3 {
            width: 100px;
            height: 100px;
            bottom: 15%;
            left: 25%;
            opacity: 0.4;
          }

          .square {
            position: absolute;
            background: linear-gradient(45deg, #36cfc9, #1890ff);
            animation: rotate 10s infinite;
          }

          .s1 {
            width: 100px;
            height: 100px;
            top: 20%;
            right: 20%;
            opacity: 0.2;
          }

          .s2 {
            width: 150px;
            height: 150px;
            bottom: 30%;
            left: 10%;
            opacity: 0.3;
          }

          .glitch-wrapper {
            margin-bottom: 30px;
          }

          .glitch {
            font-size: 120px;
            font-weight: bold;
            color: #1890ff;
            position: relative;
            text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                         0.025em 0.04em 0 #fffc00;
            animation: glitch 725ms infinite;
          }

          .glitch span {
            position: absolute;
            top: 0;
            left: 0;
          }

          .gradient-button {
            background: linear-gradient(45deg, #1890ff, #36cfc9);
            border: none;
            height: auto;
            padding: 12px 30px;
            font-size: 16px;
            border-radius: 12px;
            transition: all 0.3s;
          }

          .outline-button {
            height: auto;
            padding: 12px 30px;
            font-size: 16px;
            border-radius: 12px;
            transition: all 0.3s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes glitch {
            0% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                             0.025em 0.04em 0 #fffc00; }
            15% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                             0.025em 0.04em 0 #fffc00; }
            16% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                             -0.05em -0.05em 0 #fffc00; }
            49% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                             -0.05em -0.05em 0 #fffc00; }
            50% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                             0 -0.04em 0 #fffc00; }
            99% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                             0 -0.04em 0 #fffc00; }
            100% { text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                             -0.04em -0.025em 0 #fffc00; }
          }
        `}
      </style>
    </Layout>
  );
};

export default NotFoundPage;
