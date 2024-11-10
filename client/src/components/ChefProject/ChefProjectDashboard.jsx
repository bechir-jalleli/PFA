import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, List, Avatar, Progress } from 'antd';
import { TeamOutlined, ProjectOutlined, ClockCircleOutlined, CheckCircleOutlined, 
  WarningOutlined, FileOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoadingDots from '../Loading';
import styled from 'styled-components';
import { useTheme } from '../../Context/ThemeContext';

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

const CustomProgress = styled(Progress)`
  .ant-progress-bg {
    background: linear-gradient(45deg, #2196F3, #00BCD4);
  }
`;

const ChefProjectDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const dummyData = {
    // ... (keep your existing dummy data)
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <LoadingDots />;

  return (
    <DashboardContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
          <DashboardOutlined style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#2196F3' }} />
          <GradientText>Chef Project Dashboard</GradientText>
        </Space>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Projects</StatTitle>
              <StatValue color="#1890ff">
                <ProjectOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {dummyData.totalProjects}
              </StatValue>
            </GlassCard>
          </Col>

          {/* Similar structure for other stat cards */}

          <Col xs={24} lg={16}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Project Progress</StatTitle>
              {dummyData.projectProgress.map((project, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Space style={{ marginBottom: 8 }}>
                    <ProjectOutlined />
                    <span>{project.name}</span>
                  </Space>
                  <CustomProgress percent={project.progress} status="active" />
                </div>
              ))}
            </GlassCard>
          </Col>

          <Col xs={24} lg={8}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Recent Activities</StatTitle>
              <List
                itemLayout="horizontal"
                dataSource={dummyData.recentActivities}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={item.icon} style={{ background: '#2196F3' }} />}
                      title={item.title}
                      description={item.time}
                    />
                  </List.Item>
                )}
              />
            </GlassCard>
          </Col>
        </Row>
      </Space>
    </DashboardContainer>
  );
};

export default ChefProjectDashboard;
