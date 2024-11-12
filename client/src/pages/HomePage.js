import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Layout, Typography, Card, Row, Col, Button, Space, theme } from 'antd';
import { RocketOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%)' : 
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
`;

const StyledContent = styled(Content)`
  padding: 80px 40px;
  position: relative;
  overflow: hidden;
`;

const FloatingShape = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: linear-gradient(45deg, ${props => props.color1}, ${props => props.color2});
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  opacity: 0.5;
  z-index: 0;
  filter: blur(3px);
`;

const GlassCard = styled(Card)`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.05)' : 
    'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 3s linear infinite;
  background-size: 200% 200%;
`;

const StyledButton = styled(Button)`
  background: ${props => props.type === 'primary' ? 
    'linear-gradient(45deg, #2196F3, #00BCD4)' : 
    'transparent'};
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  }
`;

const FloatingImage = styled.img`
  animation: ${float} 6s ease-in-out infinite;
  max-width: 100%;
  height: auto;
`;

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigateByRole(user.role);
    }
  }, [isAuthenticated, user, navigate]);

  const navigateByRole = (role) => {
    const roleRoutes = {
      admin: '/admin',
      responsable: '/responsables',
      chefProject: '/chef-projects',
      membreEquipe: '/membre-equipes'
    };
    if (roleRoutes[role]) navigate(roleRoutes[role]);
  };

  if (isAuthenticated && user) return null;

  const shapes = [
    { size: '100px', top: '10%', left: '10%', color1: '#2196F3', color2: '#00BCD4', delay: '0s' },
    { size: '150px', top: '60%', right: '10%', color1: '#00BCD4', color2: '#4CAF50', delay: '2s' },
    { size: '80px', bottom: '10%', left: '20%', color1: '#4CAF50', color2: '#2196F3', delay: '4s' },
  ];

  return (
    <StyledLayout isDarkMode={isDarkMode}>
      <Header />
      <StyledContent>
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            size={shape.size}
            style={{
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              animationDelay: shape.delay,
            }}
            color1={shape.color1}
            color2={shape.color2}
          />
        ))}

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <GradientTitle>Welcome to GRCWebsite</GradientTitle>
            <Paragraph style={{ color: isDarkMode ? '#ffffff' : '#2c3e50' }}>
              Your comprehensive platform for Governance, Risk, and Compliance management.
              Streamline your organization's GRC processes, ensure efficiency, and maintain compliance.
            </Paragraph>
            <Space>
              <StyledButton type="primary" size="large" icon={<RocketOutlined />}>
                Get Started
              </StyledButton>
              <StyledButton size="large">Learn More</StyledButton>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <FloatingImage src="image/business-growth.svg" alt="GRC Illustration" />
          </Col>
        </Row>

        <Row gutter={[32, 32]} style={{ marginTop: '50px' }}>
          {[
            {
              icon: <SafetyOutlined />,
              title: 'Risk Management',
              description: 'Identify, assess, and mitigate risks effectively with our advanced risk management tools.'
            },
            {
              icon: <TeamOutlined />,
              title: 'Compliance',
              description: 'Stay compliant with regulatory requirements and industry standards using our compliance management features.'
            },
            {
              icon: <RocketOutlined />,
              title: 'Governance',
              description: 'Improve overall governance with our comprehensive suite of tools and best practices.'
            }
          ].map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <GlassCard isDarkMode={isDarkMode} hoverable>
                <div style={{ fontSize: '48px', color: '#2196F3' }}>{feature.icon}</div>
                <Title level={3} style={{ color: isDarkMode ? '#ffffff' : '#2c3e50' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: isDarkMode ? '#ffffff80' : '#2c3e50' }}>
                  {feature.description}
                </Paragraph>
              </GlassCard>
            </Col>
          ))}
        </Row>
      </StyledContent>
      <Footer />
    </StyledLayout>
  );
};

export default HomePage;
