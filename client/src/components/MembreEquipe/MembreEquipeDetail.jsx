import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Descriptions, Spin, Typography, notification, Avatar, Row, Col, Statistic, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, TeamOutlined, DollarOutlined, CalendarOutlined, ProjectOutlined } from '@ant-design/icons';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';

const { Title, Text } = Typography;

function MembreEquipeDetail() {
  const [membreEquipe, setMembreEquipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchMembreEquipeDetail = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/membre-equipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setMembreEquipe(response.data);
      } catch (error) {
        console.error('Error fetching membre equipe details:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch membre equipe details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembreEquipeDetail();
  }, [id]);

  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadowSecondary,
    borderRadius: token.borderRadiusLG,
    backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
  };

  const headerStyle = {
    background: isDarkMode ? 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)' : 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
    padding: '24px',
    borderTopLeftRadius: token.borderRadiusLG,
    borderTopRightRadius: token.borderRadiusLG,
    color: '#ffffff',
  };

  const statCardStyle = {
    background: isDarkMode ? '#2c2c2c' : '#f5f5f5',
    borderRadius: token.borderRadiusMD,
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!membreEquipe) {
    return <Title level={4}>Membre Equipe not found</Title>;
  }

  return (
    <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
      <div style={headerStyle}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={8} md={6} lg={4}>
            <Avatar size={120} icon={<UserOutlined />} src={membreEquipe.avatar} style={{ backgroundColor: '#ffffff', color: '#4CAF50' }} />
          </Col>
          <Col xs={24} sm={16} md={18} lg={20}>
            <Title level={2} style={{ color: '#ffffff', margin: 0 }}>{`${membreEquipe.prenom} ${membreEquipe.nom}`}</Title>
            <Text style={{ color: '#ffffff' }}>{membreEquipe.email}</Text>
          </Col>
        </Row>
      </div>

      <div style={{ padding: '24px' }}>
        <Row gutter={[24, 24]} style={{ marginBottom: token.marginLG }}>
          <Col xs={24} md={12}>
            <Card style={statCardStyle}>
              <Statistic
                title="Tasks"
                value={membreEquipe.taches?.length || 0}
                prefix={<ProjectOutlined style={{ color: '#4CAF50' }} />}
                valueStyle={{ color: isDarkMode ? '#ffffff' : '#4CAF50' }}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card style={statCardStyle}>
              <Statistic
                title="Salary"
                value={membreEquipe.salary || 0}
                prefix={<DollarOutlined style={{ color: '#4CAF50' }} />}
                precision={2}
                valueStyle={{ color: isDarkMode ? '#ffffff' : '#4CAF50' }}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ background: isDarkMode ? '#2c2c2c' : '#ffffff' }}>
          <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} labelStyle={{ fontWeight: 'bold' }}>
            <Descriptions.Item label={<><MailOutlined /> Email</>}>{membreEquipe.email}</Descriptions.Item>
            <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>{membreEquipe.phone || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label={<><CalendarOutlined /> Last Login</>}>
              {membreEquipe.lastLogin ? new Date(membreEquipe.lastLogin).toLocaleString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Is Logged In">
              <Tag color={membreEquipe.isLoggedIn ? 'green' : 'red'}>
                {membreEquipe.isLoggedIn ? 'Yes' : 'No'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={<><BankOutlined /> Organisation</>}>
              {membreEquipe.organisation ? membreEquipe.organisation.name : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Sous Organisation">
              {membreEquipe.sousOrganisation ? membreEquipe.sousOrganisation.name : 'N/A'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </Card>
  );
}

export default MembreEquipeDetail;
