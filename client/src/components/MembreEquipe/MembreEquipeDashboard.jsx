import React, { useState, useEffect } from 'react';
import { Row, Col, Space, Typography, List, Avatar, Progress } from 'antd';
import { 
  TeamOutlined, 
  
  ClockCircleOutlined, 
  CheckCircleOutlined,
  CalendarOutlined,
  DashboardOutlined 
} from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';
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

function MembreEquipeDashboard() {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  const dummyData = {
    totalTasks: 12,
    completedTasks: 5,
    inProgressTasks: 4,
    upcomingTasks: 3,
    taskProgress: [
      { name: 'Frontend Development', progress: 75 },
      { name: 'API Integration', progress: 45 },
      { name: 'Testing', progress: 30 },
    ],
    recentActivities: [
      { title: 'Task completed: Homepage design', icon: <CheckCircleOutlined />, time: '2 hours ago' },
      { title: 'New task assigned',  time: '4 hours ago' },
      { title: 'Team meeting scheduled', icon: <CalendarOutlined />, time: '6 hours ago' },
    ]
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
          <GradientText>Team Member Dashboard</GradientText>
        </Space>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Total Tasks</StatTitle>
              <StatValue color="#1890ff">
                {dummyData.totalTasks}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>In Progress</StatTitle>
              <StatValue color="#fa8c16">
                <ClockCircleOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {dummyData.inProgressTasks}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Completed</StatTitle>
              <StatValue color="#52c41a">
                <CheckCircleOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {dummyData.completedTasks}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Upcoming</StatTitle>
              <StatValue color="#722ed1">
                <CalendarOutlined style={{ fontSize: 'clamp(24px, 3vw, 32px)' }} />
                {dummyData.upcomingTasks}
              </StatValue>
            </GlassCard>
          </Col>

          <Col xs={24} lg={16}>
            <GlassCard isDarkMode={isDarkMode}>
              <StatTitle isDarkMode={isDarkMode}>Task Progress</StatTitle>
              {dummyData.taskProgress.map((task, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <Space style={{ marginBottom: 8 }}>
                    <span>{task.name}</span>
                  </Space>
                  <CustomProgress percent={task.progress} status="active" />
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
}

export default MembreEquipeDashboard;
