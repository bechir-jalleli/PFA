import React, { useState, useEffect } from 'react';
import { Typography, Space, Row, Col, Spin, notification } from 'antd';
import { BankOutlined, TeamOutlined, BranchesOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReadOrganisations from './ReadOrganisations';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: clamp(1rem, 3vw, 2rem);
  min-height: 100vh;
  transition: all 0.3s ease;
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' : 
    'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)'};
`;

const GlassCard = styled.div`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.03)' : 
    'rgba(255, 255, 255, 0.65)'};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 1rem;
  box-shadow: ${props => props.isDarkMode ?
    '0 8px 32px rgba(0, 0, 0, 0.3)' :
    '0 8px 32px rgba(0, 0, 0, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.isDarkMode ?
      '0 12px 40px rgba(0, 0, 0, 0.4)' :
      '0 12px 40px rgba(0, 0, 0, 0.15)'};
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const OrganisationsDashboard = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalOrganisations: 0,
    totalEmployees: 0,
    totalDepartments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/organisations/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch dashboard statistics'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <DashboardContainer isDarkMode={isDarkMode}>
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer isDarkMode={isDarkMode}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <GradientText>Organisations Overview</GradientText>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Organisations</StatTitle>
              <StatValue color="#1890ff">
                <BankOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {stats.totalOrganisations}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Employees</StatTitle>
              <StatValue color="#722ed1">
                <TeamOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {stats.totalEmployees}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Departments</StatTitle>
              <StatValue color="#52c41a">
                <BranchesOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {stats.totalDepartments}
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
