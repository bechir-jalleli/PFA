import React, { useState, useEffect } from 'react';
import { Layout, Typography, notification, Row, Col, Avatar, Divider, Spin } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import { theme } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const { token: themeToken } = theme.useToken();

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const contentStyle = {
    minHeight: '100vh',
    backgroundColor: isDarkMode ? themeToken.colorBgContainer : '#f0f2f5',
  };

  const cardStyle = {
    background: isDarkMode ? themeToken.colorBgElevated : 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: themeToken.boxShadow,
  };

  if (loading) {
    return (
      <MainLayout>
        <Layout style={contentStyle}>
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Spin size="large" />
          </Content>
        </Layout>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Layout style={contentStyle}>
        <Content style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Avatar size={200} icon={<UserOutlined />} style={{ backgroundColor: themeToken.colorPrimary }} />
              {userData && (
                <>
                  <Title level={2} style={{ marginTop: '20px', marginBottom: '0', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                    {`${userData.prenom} ${userData.nom}`}
                  </Title>
                  <Text type="secondary" style={{ fontSize: '18px' }}>
                    {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                  </Text>
                </>
              )}
            </Col>
            <Col xs={24} md={16}>
              <div style={cardStyle}>
                <Title level={3} style={{ textAlign: 'center', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>Profile</Title>
                <Divider />
                {userData && (
                  <Row gutter={[16, 24]}>
                    <Col span={24}>
                      <Text strong style={{ fontSize: '16px', marginRight: '10px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        <IdcardOutlined /> Nom:
                      </Text>
                      <Text style={{ fontSize: '16px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>{` ${userData.nom}`}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong style={{ fontSize: '16px', marginRight: '10px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        <IdcardOutlined /> Prenom:
                      </Text>
                      <Text style={{ fontSize: '16px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>{`${userData.prenom} `}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong style={{ fontSize: '16px', marginRight: '10px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        <MailOutlined /> Email:
                      </Text>
                      <Text style={{ fontSize: '16px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>{userData.email}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong style={{ fontSize: '16px', marginRight: '10px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        <PhoneOutlined /> Telephone:
                      </Text>
                      <Text style={{ fontSize: '16px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>{userData.phone}</Text>
                    </Col>
                    <Col span={24}>
                      <Text strong style={{ fontSize: '16px', marginRight: '10px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        <UserOutlined /> Role:
                      </Text>
                      <Text style={{ fontSize: '16px', color: isDarkMode ? themeToken.colorTextLightSolid : undefined }}>
                        {userData.role}
                      </Text>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </MainLayout>
  );
};

export default ProfilePage;
