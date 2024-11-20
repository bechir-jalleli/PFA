import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Spin, Typography, notification, Avatar, Row, Col, Statistic, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined, DollarOutlined, CalendarOutlined, BankOutlined } from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';
import styled from 'styled-components';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';

const { Title, Text } = Typography;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%)' : 
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  padding: 2rem;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${props => props.isDarkMode ? 
    '0 8px 32px rgba(0, 0, 0, 0.3)' : 
    '0 8px 32px rgba(31, 38, 135, 0.15)'};
  background: ${props => props.isDarkMode ? '#1f1f1f' : '#ffffff'};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ProfileHeader = styled.div`
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1a237e 0%, #283593 100%)' : 
    'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'};
  padding: 2.5rem;
  color: white;
`;

const StyledAvatar = styled(Avatar)`
  border: 4px solid white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StatCard = styled(Card)`
  background: ${props => props.isDarkMode ? '#2c2c2c' : '#f5f5f5'};
  border-radius: 15px;
  transition: transform 0.3s ease;
  border: 1px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-5px);
  }

  .ant-statistic-title {
    color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
  }
`;

const InfoCard = styled(Card)`
  background: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
  border-radius: 15px;
  margin-top: 1.5rem;
  border: 1px solid ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

  .ant-descriptions-bordered {
    .ant-descriptions-item-label {
      background: ${props => props.isDarkMode ? '#1f1f1f' : '#f5f5f5'};
      color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
    }
    .ant-descriptions-item-content {
      background: ${props => props.isDarkMode ? '#2c2c2c' : '#ffffff'};
      color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
    }
  }
`;

const StyledTag = styled(Tag)`
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${props => props.isDarkMode ? '#141414' : '#f0f2f5'};
`;

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('accessToken');

      if (!user || !token) {
        throw new Error('User information or token not found');
      }

      let endpoint;
      switch (user.role) {
        case 'admin':
          endpoint = `/admin/${user.id}`;
          break;
        case 'responsable':
          endpoint = `/responsables/${user.id}`;
          break;
        case 'chefProject':
          endpoint = `/chef-projects/${user.id}`;
          break;
        case 'membreEquipe':
          endpoint = `/membre-equipes/${user.id}`;
          break;
        default:
          throw new Error('Unknown user role');
      }

      const response = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch user data: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <LoadingContainer isDarkMode={isDarkMode}>
          <Spin size="large" />
        </LoadingContainer>
      </MainLayout>
    );
  }

  return (
   
      <PageWrapper isDarkMode={isDarkMode}>
        <StyledCard isDarkMode={isDarkMode} bodyStyle={{ padding: 0 }}>
          <ProfileHeader isDarkMode={isDarkMode}>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6} lg={4}>
                <StyledAvatar 
                  size={120} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#ffffff', color: '#1976d2' }} 
                />
              </Col>
              <Col xs={24} sm={16} md={18} lg={20}>
                <Title level={2} style={{ color: '#ffffff', margin: 0 }}>
                  {userData?.prenom} {userData?.nom}
                </Title>
                <Text style={{ color: '#ffffff' }}>{userData?.email}</Text>
              </Col>
            </Row>
          </ProfileHeader>

          <div style={{ padding: '24px' }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <StatCard isDarkMode={isDarkMode}>
                  <Statistic
                    title="Projects"
                    value={userData?.projects?.length || 0}
                    prefix={<TeamOutlined style={{ color: '#1976d2' }} />}
                    valueStyle={{ color: isDarkMode ? '#ffffff' : '#1976d2' }}
                  />
                </StatCard>
              </Col>
              <Col xs={24} md={12}>
                <StatCard isDarkMode={isDarkMode}>
                  <Statistic
                    title="Status"
                    value="Active"
                    prefix={<DollarOutlined style={{ color: '#4caf50' }} />}
                    valueStyle={{ color: isDarkMode ? '#ffffff' : '#4caf50' }}
                  />
                </StatCard>
              </Col>
            </Row>

            <InfoCard isDarkMode={isDarkMode}>
              <Descriptions 
                bordered 
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                labelStyle={{ fontWeight: 'bold' }}
              >
                <Descriptions.Item label={<><MailOutlined /> Email</>}>
                  {userData?.email}
                </Descriptions.Item>
                <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
                  {userData?.phone || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label={<><CalendarOutlined /> Last Login</>}>
                  {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleString() : 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <StyledTag color="green">Active</StyledTag>
                </Descriptions.Item>
                <Descriptions.Item label={<><BankOutlined /> Organisation</>}>
                  {userData?.organisation?.name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  <StyledTag color="blue">
                    {userData?.role}
                  </StyledTag>
                </Descriptions.Item>
              </Descriptions>
            </InfoCard>
          </div>
        </StyledCard>
      </PageWrapper>
  );
};

export default ProfilePage;
