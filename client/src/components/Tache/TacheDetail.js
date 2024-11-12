import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { ExclamationOutlined } from '@ant-design/icons';
import {
  Card, Row, Col, Typography, Tag, Timeline, Avatar,
  Descriptions, Statistic, Progress, Divider, Badge, Spin
} from 'antd';
import {
  CalendarOutlined, UserOutlined, ProjectOutlined,
  ClockCircleOutlined, CheckCircleOutlined, PriorityHighOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  50% { box-shadow: 0 8px 24px rgba(32,148,243,0.15); }
  100% { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
`;

// Styled Components
const StyledCard = styled(Card)`
  border-radius: 15px;
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    animation: ${glowEffect} 2s infinite;
  }
`;

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const StatusTag = styled(Tag)`
  padding: 4px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Utility functions remain the same
const getStatusColor = (status) => {
  const statusColors = {
    'Not Started': '#ff4d4f',
    'In Progress': '#faad14',
    'Completed': '#52c41a',
    'On Hold': '#1890ff'
  };
  return statusColors[status] || '#000000';
};

const getPriorityColor = (priority) => {
  const priorityColors = {
    'High': '#ff4d4f',
    'Medium': '#faad14',
    'Low': '#52c41a'
  };
  return priorityColors[priority] || '#000000';
};

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    return 'Invalid Date';
  }
};

const TacheDetail = () => {
  const [tache, setTache] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/taches/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTache(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error loading task details');
      } finally {
        setLoading(false);
      }
    };
    fetchTache();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>{error}</div>;
  }

  if (!tache) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Task not found</div>;
  }

  const calculateProgress = () => {
    const total = new Date(tache.endDate) - new Date(tache.startDate);
    const elapsed = new Date() - new Date(tache.startDate);
    return Math.min(Math.round((elapsed / total) * 100), 100);
  };

  return (
    <Container>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <StyledCard bordered={false}>
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={2} style={{ marginBottom: 0 }}>{tache.titre}</Title>
                <Text type="secondary">{tache.description}</Text>
              </Col>
              <Col>
                <StatusTag color={getStatusColor(tache.status)}>
                  {tache.status}
                </StatusTag>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[24, 24]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Priority"
                  value={tache.priority}
                  prefix={<ExclamationOutlined style={{ color: getPriorityColor(tache.priority) }} />}
                />
              </Col>
              <Col xs={24} sm={16}>
                <Title level={5}>Progress</Title>
                <Progress 
                  percent={calculateProgress()} 
                  status="active"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </Col>
            </Row>
          </StyledCard>
        </Col>

        <Col xs={24} lg={8}>
          <StyledCard bordered={false}>
            <Title level={4}>Assigned To</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Text strong style={{ display: 'block' }}>
                  {tache.membreEquipe?.nom} {tache.membreEquipe?.prenom}
                </Text>
                <Text type="secondary">Team Member</Text>
              </div>
            </div>

            <Descriptions column={1}>
              <Descriptions.Item label={<><CalendarOutlined /> Start Date</>}>
                {formatDate(tache.startDate)}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> End Date</>}>
                {formatDate(tache.endDate)}
              </Descriptions.Item>
              <Descriptions.Item label={<><ProjectOutlined /> Project</>}>
                {tache.project?.tittle || 'N/A'}
              </Descriptions.Item>
            </Descriptions>
          </StyledCard>
        </Col>

        <Col span={24}>
          <StyledCard bordered={false}>
            <Timeline
              mode="left"
              items={[
                {
                  label: formatDate(tache.createdAt),
                  children: 'Task Created',
                  dot: <Badge status="success" />
                },
                {
                  label: formatDate(tache.startDate),
                  children: 'Start Date',
                  dot: <Badge status="processing" />
                },
                {
                  label: formatDate(tache.endDate),
                  children: 'Due Date',
                  dot: <Badge status="warning" />
                },
                {
                  label: formatDate(tache.updatedAt),
                  children: 'Last Updated',
                  dot: <Badge status="default" />
                }
              ]}
            />
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default TacheDetail;
