import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Card, Space, Row, Col, Statistic, List, Tag, theme, notification } from 'antd';
import { CheckSquareOutlined, ClockCircleOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadTache from '../components/Tache/ReadTache';
import { useTheme } from '../Context/ThemeContext';
import { Outlet } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const TachesPage = () => {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const authToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/taches', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        setTaches(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch tasks',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTaches();
  }, []);

  const pageStyle = {
    padding: token.padding,
    minHeight: '100vh',
    backgroundColor: token.colorBgContainer,
    color: token.colorText,
  };

  const iconStyle = {
    fontSize: 48,
    color: token.colorPrimary,
  };

  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadow,
    backgroundColor: isDarkMode ? token.colorBgElevated : token.colorBgContainer,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'blue';
      case 'Not Started': return 'orange';
      case 'Completed': return 'green';
      default: return 'default';
    }
  };

  const totalTasks = taches.length;
  const completedTasks = taches.filter(task => task.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  const recentTasks = taches.slice(0, 3).map(task => ({
    title: task.titre,
    status: task.status,
    assignee: task.membreEquipe ? `${task.membreEquipe.nom} ${task.membreEquipe.prenom}` : 'Unassigned'
  }));

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <CheckSquareOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Taches Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Total Tasks" value={totalTasks} prefix={<CheckSquareOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Completed Tasks" value={completedTasks} prefix={<FileDoneOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Pending Tasks" value={pendingTasks} prefix={<ClockCircleOutlined />} />
            </Card>
          </Col>
          
          <Col xs={24} lg={24}>
            <ReadTache />
          </Col>
        </Row>
      </div>
      <Outlet />
    </MainLayout>
  );
};

export default TachesPage;
