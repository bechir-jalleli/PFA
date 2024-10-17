
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Space, Button, Typography, Divider, message } from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  BankOutlined,
  BranchesOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  PlusOutlined,

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoadingDots from '../Loading';
import { DashboardOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ResponsableDashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No access token found');
        }

        const response = await fetch('http://localhost:5000/admin/info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load dashboard data');
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <LoadingDots />;
  }

  return (
    <div style={{ padding: '24px' }}>
         
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/chef-projects/list')}>
            <Statistic
              title="Nombre Chef Projet"
              value={data.chefProjectCount}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/membre-equipes/list')}>
            <Statistic
              title="Nombre Membre Equipe"
              value={data.membreEquipeCount}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/projects/list')}>
            <Statistic
              title="Projects"
              value={data.projectCount}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        {/* Project Status Card */}
        <Col xs={24} lg={24}>
          <Card hoverable title="Project Status" style={{ marginTop: '16px' }} onClick={() => navigate('/projects/list')}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="In Progress"
                  value={data.projectStatuses.inProgress}
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Completed"
                  value={data.projectStatuses.completed}
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Delayed"
                  value={data.projectStatuses.delayed}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<WarningOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>


        

        <Col xs={24}>
          <Divider />
        </Col>


        
      </Row>
    </div>
  );
};

export default ResponsableDashboard;