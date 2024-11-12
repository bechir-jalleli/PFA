import React, { useState, useEffect } from 'react';
import { Layout, Typography, notification, Row, Col, Avatar, Spin } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import styled from 'styled-components';

const { Content } = Layout;
const { Title, Text } = Typography;

const PageContainer = styled(Layout)`
  min-height: 100vh;
  background: ${props => props.isDarkMode ? 
    'linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%)' : 
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
`;

const GlassContainer = styled(Content)`
  padding: 2rem;
  background: ${props => props.isDarkMode ? 
    'rgba(0, 0, 0, 0.2)' : 
    'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  border-radius: 24px;
  margin: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ProfileCard = styled.div`
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.05)' : 
    'rgba(255, 255, 255, 0.9)'};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledAvatar = styled(Avatar)`
  border: 4px solid ${props => props.isDarkMode ? '#1890ff' : '#fff'};
  box-shadow: 0 0 20px rgba(24, 144, 255, 0.2);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: ${props => props.isDarkMode ? 
    'rgba(255, 255, 255, 0.05)' : 
    'rgba(24, 144, 255, 0.05)'};
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    background: ${props => props.isDarkMode ? 
      'rgba(255, 255, 255, 0.1)' : 
      'rgba(24, 144, 255, 0.1)'};
  }

  .anticon {
    font-size: 1.2rem;
    color: #1890ff;
    margin-right: 1rem;
  }
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(45deg, #1890ff, #36cfc9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem !important;
`;

const RoleTag = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #1890ff, #36cfc9);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(24, 144, 255, 0.2);
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
    <MainLayout>
      <PageContainer isDarkMode={isDarkMode}>
        <GlassContainer isDarkMode={isDarkMode}>
          <Row gutter={[32, 32]} justify="center" align="top">
            <Col xs={24} md={8}>
              <ProfileCard isDarkMode={isDarkMode} style={{ textAlign: 'center' }}>
                <StyledAvatar 
                  size={200} 
                  icon={<UserOutlined />} 
                  isDarkMode={isDarkMode}
                />
                {userData && (
                  <>
                    <GradientTitle level={2}>
                      {`${userData.prenom} ${userData.nom}`}
                    </GradientTitle>
                    <RoleTag>
                      {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                    </RoleTag>
                  </>
                )}
              </ProfileCard>
            </Col>

            <Col xs={24} md={16}>
              <ProfileCard isDarkMode={isDarkMode}>
                <GradientTitle level={3}>Profile Information</GradientTitle>
                {userData && (
                  <>
                    <InfoItem isDarkMode={isDarkMode}>
                      <IdcardOutlined />
                      <div>
                        <Text strong style={{ color: isDarkMode ? 'rgba(255,255,255,0.85)' : undefined }}>
                          Full Name
                        </Text>
                        <div style={{ color: isDarkMode ? 'rgba(255,255,255,0.65)' : undefined }}>
                          {`${userData.prenom} ${userData.nom}`}
                        </div>
                      </div>
                    </InfoItem>

                    <InfoItem isDarkMode={isDarkMode}>
                      <MailOutlined />
                      <div>
                        <Text strong style={{ color: isDarkMode ? 'rgba(255,255,255,0.85)' : undefined }}>
                          Email Address
                        </Text>
                        <div style={{ color: isDarkMode ? 'rgba(255,255,255,0.65)' : undefined }}>
                          {userData.email}
                        </div>
                      </div>
                    </InfoItem>

                    <InfoItem isDarkMode={isDarkMode}>
                      <PhoneOutlined />
                      <div>
                        <Text strong style={{ color: isDarkMode ? 'rgba(255,255,255,0.85)' : undefined }}>
                          Phone Number
                        </Text>
                        <div style={{ color: isDarkMode ? 'rgba(255,255,255,0.65)' : undefined }}>
                          {userData.phone}
                        </div>
                      </div>
                    </InfoItem>

                    <InfoItem isDarkMode={isDarkMode}>
                      <UserOutlined />
                      <div>
                        <Text strong style={{ color: isDarkMode ? 'rgba(255,255,255,0.85)' : undefined }}>
                          Role
                        </Text>
                        <div style={{ color: isDarkMode ? 'rgba(255,255,255,0.65)' : undefined }}>
                          {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                        </div>
                      </div>
                    </InfoItem>
                  </>
                )}
              </ProfileCard>
            </Col>
          </Row>
        </GlassContainer>
      </PageContainer>
    </MainLayout>
  );
};

export default ProfilePage;
