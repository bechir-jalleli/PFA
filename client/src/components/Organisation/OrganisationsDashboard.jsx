import React from 'react';
import { Typography, Space, Row, Col } from 'antd';
import { BankOutlined, TeamOutlined, BranchesOutlined } from '@ant-design/icons';
import ReadOrganisations from './ReadOrganisations';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  min-height: 100vh;
  transition: all 0.3s ease;
`;

const GlassCard = styled.div`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.03)' : 
    'rgba(255, 255, 255, 0.65)'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatTitle = styled.div`
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${props => props.isDarkMode ? '#ffffff80' : '#00000080'};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: bold;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GradientText = styled(Typography.Title)`
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem !important;
  font-size: clamp(1.75rem, 4vw, 2.5rem) !important;
  text-align: center;
`;

const OrganisationsDashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <DashboardContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
          <BankOutlined style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#2196F3' }} />
          <GradientText>Organisations Dashboard</GradientText>
        </Space>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Organisations</StatTitle>
              <StatValue color="#1890ff">
                <BankOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                50
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Employees</StatTitle>
              <StatValue color="#722ed1">
                <TeamOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                1000
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Departments</StatTitle>
              <StatValue color="#52c41a">
                <BranchesOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                20
              </StatValue>
            </GlassCard>
          </Col>
        </Row>

        <GlassCard isDarkMode={isDarkMode}>
          <StatTitle isDarkMode={isDarkMode}>Organisations List</StatTitle>
          <ReadOrganisations />
        </GlassCard>
      </Space>
    </DashboardContainer>
  );
};

export default OrganisationsDashboard;
