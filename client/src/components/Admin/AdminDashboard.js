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
  DollarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoadingDots from '../Loading';
import { DashboardOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AdminDashboard = () => {
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
       <DashboardOutlined style={{ fontSize: 48,marginBottom : 10 }} />
          <Title level={2} style={{ marginBottom : 20 }}>
            Admin Panel
          </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/responsables/list')}>
            <Statistic
              title="Responsables"
              value={data.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/organisations/list')}>
            <Statistic
              title="Organisations"
              value={data.organisationCount}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable onClick={() => navigate('/sous-organisations/list')}>
            <Statistic
              title="Sous-organisations"
              value={data.sousOrganisationCount}
              prefix={<BranchesOutlined />}
              valueStyle={{ color: '#fa8c16' }}
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


        <Col xs={24}>
          <Card title="Quick Actions" hoverable >
            <Space size="large">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ borderRadius: '8px' }}
                onClick={() => navigate('/responsables/create')}
              >
                Add New Responsables
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ borderRadius: '8px' }}
                onClick={() => navigate('/organisations/create')}
              >
                Add New Organisation
              </Button>
              <Button
               type="primary"
                icon={<ProjectOutlined />}
                style={{ borderRadius: '8px' }}
                onClick={() => navigate('/projects/create')}
              >
                Create Project
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;