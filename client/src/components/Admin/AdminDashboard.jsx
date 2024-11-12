import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';
import {
  UserOutlined, ProjectOutlined, BankOutlined, BranchesOutlined,
  ClockCircleOutlined, CheckCircleOutlined, WarningOutlined,
  PlusOutlined, DashboardOutlined
} from '@ant-design/icons';
import LoadingDots from '../Loading';

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

const GradientButton = styled.button`
  background: linear-gradient(45deg, ${props => props.startColor || '#2196F3'}, ${props => props.endColor || '#00BCD4'});
  border: none;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const GradientText = styled(Typography.Title)`
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem !important;
  font-size: clamp(1.75rem, 4vw, 2.5rem) !important;
  text-align: center;
`;

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const response = await fetch('http://localhost:5000/admin/info', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load dashboard data');
      }
    };

    fetchData();
  }, []);

  if (!data) return <LoadingDots />;

  return (
    <DashboardContainer isDarkMode={isDarkMode}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
          <DashboardOutlined style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#2196F3' }} />
          <GradientText>Admin Dashboard</GradientText>
        </Space>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode} onClick={() => navigate('/responsables/list')}>
              <StatTitle isDarkMode={isDarkMode}>Responsables</StatTitle>
              <StatValue color="#1890ff">
                <UserOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {data.totalEmployees}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode} onClick={() => navigate('/organisations/list')}>
              <StatTitle isDarkMode={isDarkMode}>Organisations</StatTitle>
              <StatValue color="#722ed1">
                <BankOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {data.organisationCount}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode} onClick={() => navigate('/sous-organisations/list')}>
              <StatTitle isDarkMode={isDarkMode}>Sous-organisations</StatTitle>
              <StatValue color="#fa8c16">
                <BranchesOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {data.sousOrganisationCount}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode} onClick={() => navigate('/projects/list')}>
              <StatTitle isDarkMode={isDarkMode}>Projects</StatTitle>
              <StatValue color="#52c41a">
                <ProjectOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {data.projectCount}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24}>
            <GlassCard isDarkMode={isDarkMode} onClick={() => navigate('/projects/list')}>
              <StatTitle isDarkMode={isDarkMode}>Project Status Overview</StatTitle>
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <StatValue color="#1890ff">
                    <ClockCircleOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                    {data.projectStatuses.inProgress}
                    <StatTitle isDarkMode={isDarkMode}>In Progress</StatTitle>
                  </StatValue>
                </Col>
                <Col xs={24} md={8}>
                  <StatValue color="#52c41a">
                    <CheckCircleOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                    {data.projectStatuses.completed}
                    <StatTitle isDarkMode={isDarkMode}>Completed</StatTitle>
                  </StatValue>
                </Col>
                <Col xs={24} md={8}>
                  <StatValue color="#cf1322">
                    <WarningOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                    {data.projectStatuses.delayed}
                    <StatTitle isDarkMode={isDarkMode}>Delayed</StatTitle>
                  </StatValue>
                </Col>
              </Row>
            </GlassCard>
          </Col>

          <Col xs={24}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Quick Actions</StatTitle>
              <Space size="large" wrap>
                <GradientButton 
                  onClick={() => navigate('/responsables/create')}
                  startColor="#1890ff"
                  endColor="#69c0ff"
                >
                  <PlusOutlined /> Add Responsable
                </GradientButton>
                <GradientButton 
                  onClick={() => navigate('/organisations/create')}
                  startColor="#722ed1"
                  endColor="#b37feb"
                >
                  <PlusOutlined /> Add Organisation
                </GradientButton>
                <GradientButton 
                  onClick={() => navigate('/projects/create')}
                  startColor="#52c41a"
                  endColor="#95de64"
                >
                  <ProjectOutlined /> Create Project
                </GradientButton>
              </Space>
            </GlassCard>
          </Col>
        </Row>
      </Space>
    </DashboardContainer>
  );
};

export default AdminDashboard;
