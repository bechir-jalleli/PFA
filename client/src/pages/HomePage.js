import React from 'react';
import { Layout, Typography, Card } from 'antd';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import '../styles/pages/HomePage.css';  // Import the CSS file

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { theme } = useTheme();

  // Default shadow if theme.shadows is undefined
  const cardShadow = theme?.shadows?.[1] || '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';

  return (
    <MainLayout>
      <Content className="home-content">
        <Card className="home-card" style={{ boxShadow: cardShadow }}>
          <Title level={2}>Welcome to GRCWebsite from home page </Title>
          <Paragraph>
            Your platform for Governance, Risk, and Compliance management. 
            GRCWebsite provides a comprehensive solution to streamline your 
            organization's GRC processes, ensuring efficiency and compliance.
          </Paragraph>
          <Paragraph>
            Explore our features and tools designed to help you manage risks, 
            maintain compliance, and improve overall governance.
          </Paragraph>
        </Card>
      </Content>
    </MainLayout>
  );
};

export default HomePage;
