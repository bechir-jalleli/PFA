import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Space, Button, Typography, Divider } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  BankOutlined,
  BranchesOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  PlusOutlined,
  EyeOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import LoadingDots from '../Loading'; 

const { Title } = Typography;

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/admin/info')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <LoadingDots />; // Use the LoadingDots component as a fallback while loading
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
        Admin Dashboard
      </Title>
      
      <Row gutter={[16, 16]}>
        {/* Statistics Cards */}
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Responsables"
              value={data.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Organisations"
              value={data.organisationCount}
              prefix={<BankOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Sous-organisations"
              value={data.sousOrganisationCount}
              prefix={<BranchesOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Projects"
              value={data.projectCount}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        {/* Project Status Card */}
        <Col xs={24} lg={12}>
          <Card hoverable title="Project Status" style={{ marginTop: '16px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="In Progress"
                  value={data.projectStatuses.inProgress}
                  valueStyle={{ color: '#1890ff' }} // Blue for In Progress
                  prefix={<ClockCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Completed"
                  value={data.projectStatuses.completed}
                  valueStyle={{ color: '#52c41a' }} // Green for Completed
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Delayed"
                  value={data.projectStatuses.delayed}
                  valueStyle={{ color: '#cf1322' }} // Red for Delayed
                  prefix={<WarningOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Performance Metrics Card */}
        <Col xs={24} lg={12}>
          <Card hoverable title="Performance Metrics" style={{ marginTop: '16px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Total Revenue"
                  value={data.totalRevenue || 0} // Replace with actual data if available
                  prefix={<DollarOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Active Users"
                  value={data.activeUsers} // Dynamic value from API
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Pending Tasks"
                  value={data.pendingTasks || 0} // Replace with actual data if available
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Divider */}
        <Col xs={24}>
          <Divider />
        </Col>

        {/* Quick Actions Card */}
        <Col xs={24}>
          <Card title="Quick Actions" hoverable style={{ backgroundColor: '#e6f7ff' }}>
            <Space size="large">
              <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: '8px' }}>
                Add New User
              </Button>
              <Button icon={<ProjectOutlined />} style={{ borderRadius: '8px' }}>
                Create Project
              </Button>
              <Button icon={<TeamOutlined />} style={{ borderRadius: '8px' }}>
                Manage Teams
              </Button>
              
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
