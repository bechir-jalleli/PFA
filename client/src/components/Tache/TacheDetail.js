import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ExclamationOutlined } from '@ant-design/icons';


import {
  Card, Row, Col, Typography, Tag, Timeline, Avatar,
  Descriptions, Statistic, Progress, Divider, Badge
} from 'antd';
import {
  CalendarOutlined, UserOutlined, ProjectOutlined,
  ClockCircleOutlined, CheckCircleOutlined, PriorityHighOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

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

const TacheDetail = () => {
  const [tache, setTache] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/taches/${id}`);
        setTache(response.data);
      } catch (error) {
        console.error('Error fetching tache:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTache();
  }, [id]);

  if (!tache) return null;

  const calculateProgress = () => {
    const total = new Date(tache.endDate) - new Date(tache.startDate);
    const elapsed = new Date() - new Date(tache.startDate);
    return Math.min(Math.round((elapsed / total) * 100), 100);
  };

  return (
    <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px' }}>this is tache</h1>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Row align="middle" justify="space-between">
              <Col>
                <Title level={2} style={{ marginBottom: 0 }}>{tache.titre}</Title>
                <Text type="secondary">{tache.description}</Text>
              </Col>
              <Col>
                <Tag color={getStatusColor(tache.status)} style={{ padding: '4px 12px', borderRadius: '20px' }}>
                  {tache.status}
                </Tag>
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
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            bordered={false}
            style={{ 
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Title level={4}>Assigned To</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Text strong style={{ display: 'block' }}>
                  {tache.membreEquipe.nom} {tache.membreEquipe.prenom}
                </Text>
                <Text type="secondary">Team Member</Text>
              </div>
            </div>

            <Descriptions column={1}>
              <Descriptions.Item label={<><CalendarOutlined /> Start Date</>}>
                {new Date(tache.startDate).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> End Date</>}>
                {new Date(tache.endDate).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label={<><ProjectOutlined /> Project ID</>}>
                {tache.project._id}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24}>
          <Card
            bordered={false}
            style={{ 
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Timeline
              mode="left"
              items={[
                {
                  label: new Date(tache.createdAt).toLocaleDateString(),
                  children: 'Task Created',
                  dot: <Badge status="success" />
                },
                {
                  label: new Date(tache.startDate).toLocaleDateString(),
                  children: 'Start Date',
                  dot: <Badge status="processing" />
                },
                {
                  label: new Date(tache.endDate).toLocaleDateString(),
                  children: 'Due Date',
                  dot: <Badge status="warning" />
                },
                {
                  label: new Date(tache.updatedAt).toLocaleDateString(),
                  children: 'Last Updated',
                  dot: <Badge status="default" />
                }
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TacheDetail;
