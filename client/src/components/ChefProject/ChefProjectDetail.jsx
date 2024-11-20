import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card, Descriptions, Spin, Typography, notification, Avatar, Row, Col, Statistic,
} from 'antd';
import {
  UserOutlined, TeamOutlined, DollarOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';

const { Title, Text } = Typography;

// Styled Components
const GlassCard = styled(Card)`
  background: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(31, 31, 31, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #00bcd4 0%, #2196f3 100%);
  padding: 2rem;
  border-radius: 16px 16px 0 0;
  position: relative;
  overflow: hidden;
  color: #fff;
`;

const StatsCard = styled(Card)`
  background: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(44, 44, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 12px;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const DetailCard = styled(Card)`
  background: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(44, 44, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 12px;
  margin-top: 1.5rem;
`;

// Component
function ChefProjectDetail() {
  const [chefProject, setChefProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchChefProjectDetail = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/chef-projects/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setChefProject(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch chef project details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChefProjectDetail();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: isDarkMode ? '#1f1f1f' : '#f0f2f5',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <GlassCard isDarkMode={isDarkMode} bordered={false}>
      <HeaderSection>
        <Row gutter={[24, 24]} align="middle">
        <Col xs={24} sm={8} md={6} lg={4}>
            <Avatar 
              size={120} 
              icon={<UserOutlined />} 
              src={chefProject.avatar}
              style={{ 
                border: '4px solid rgba(255,255,255,0.2)',
                backgroundColor: '#ffffff',
                color: '#00BCD4'
              }} 
            />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={2}>{`${chefProject.prenom} ${chefProject.nom}`}</Title>
            <Text>{chefProject.email}</Text>
          </Col>
        </Row>
      </HeaderSection>

      <div style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title="Team Members"
                value={chefProject.membresEquipe?.length || 0}
                prefix={<TeamOutlined style={{ color: '#00bcd4' }} />}
                valueStyle={{ color: '#00bcd4' }}
              />
            </StatsCard>
          </Col>

          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title="Tasks"
                value={chefProject.taches?.length || 0}
                prefix={<ProjectOutlined style={{ color: '#ffa000' }} />}
                valueStyle={{ color: '#ffa000' }}
              />
            </StatsCard>
          </Col>

          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title="Salary"
                value={chefProject.salary || 0}
                prefix={<DollarOutlined style={{ color: '#4caf50' }} />}
                precision={2}
                valueStyle={{ color: '#4caf50' }}
              />
            </StatsCard>
          </Col>
        </Row>

        <DetailCard isDarkMode={isDarkMode} bordered={true}>
  <Descriptions bordered column={1}>
    <Descriptions.Item label="First Name" span={1}>
      {chefProject.prenom}
    </Descriptions.Item>
    <Descriptions.Item label="Last Name" span={1}>
      {chefProject.nom}
    </Descriptions.Item>
    <Descriptions.Item label="Email" span={1}>
      {chefProject.email}
    </Descriptions.Item>
    <Descriptions.Item label="Phone" span={1}>
      {chefProject.phone || 'N/A'}
    </Descriptions.Item>
  </Descriptions>
</DetailCard>


      </div>
    </GlassCard>
  );
}

export default ChefProjectDetail;
