import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Descriptions, Spin, Typography, notification, Avatar, Row, Col, Statistic, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, TeamOutlined, DollarOutlined, CalendarOutlined, ProjectOutlined } from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

// Styled Components
const GlassCard = styled(Card)`
  background: ${props => props.isDarkMode ? 
    'rgba(31, 31, 31, 0.8)' : 
    'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #00BCD4 0%, #2196F3 100%);
  padding: 2rem;
  border-radius: 16px 16px 0 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  }
`;

const StatsCard = styled(Card)`
  background: ${props => props.isDarkMode ? 
    'rgba(44, 44, 44, 0.9)' : 
    'rgba(255, 255, 255, 0.9)'};
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DetailCard = styled(Card)`
  background: ${props => props.isDarkMode ? 
    'rgba(44, 44, 44, 0.9)' : 
    'rgba(255, 255, 255, 0.9)'};
  border-radius: 12px;
  margin-top: 1.5rem;
`;
function ChefProjectDetail() {
  const [chefProject, setChefProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchChefProjectDetail = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/chef-projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: isDarkMode ? '#1f1f1f' : '#f0f2f5'
      }}>
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
          <Col xs={24} sm={16} md={18} lg={20}>
            <Title level={2} style={{ color: '#ffffff', margin: 0 }}>
              {`${chefProject.prenom} ${chefProject.nom}`}
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              {chefProject.email}
            </Text>
          </Col>
        </Row>
      </HeaderSection>

      <div style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title={<span style={{ color: isDarkMode ? '#ffffff' : undefined }}>Team Members</span>}
                value={chefProject.membresEquipe?.length || 0}
                prefix={<TeamOutlined style={{ color: '#00BCD4' }} />}
                valueStyle={{ color: isDarkMode ? '#ffffff' : '#00BCD4' }}
              />
            </StatsCard>
          </Col>
          
          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title={<span style={{ color: isDarkMode ? '#ffffff' : undefined }}>Tasks</span>}
                value={chefProject.taches?.length || 0}
                prefix={<ProjectOutlined style={{ color: '#FFA000' }} />}
                valueStyle={{ color: isDarkMode ? '#ffffff' : '#FFA000' }}
              />
            </StatsCard>
          </Col>
          
          <Col xs={24} md={8}>
            <StatsCard isDarkMode={isDarkMode} bordered={false}>
              <Statistic
                title={<span style={{ color: isDarkMode ? '#ffffff' : undefined }}>Salary</span>}
                value={chefProject.salary || 0}
                prefix={<DollarOutlined style={{ color: '#4CAF50' }} />}
                precision={2}
                valueStyle={{ color: isDarkMode ? '#ffffff' : '#4CAF50' }}
              />
            </StatsCard>
          </Col>
        </Row>

        <DetailCard isDarkMode={isDarkMode} bordered={false}>
          <Descriptions 
            bordered 
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            labelStyle={{ 
              fontWeight: 'bold',
              color: isDarkMode ? '#ffffff' : undefined
            }}
          >
            {/* Descriptions items remain the same */}
          </Descriptions>
        </DetailCard>
      </div>
    </GlassCard>
  );
}

export default ChefProjectDetail;
