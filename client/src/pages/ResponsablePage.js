import React, { useEffect, useState } from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, List, Avatar, Progress, Timeline, theme } from 'antd';import { 
  UserOutlined, 
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  DollarOutlined,
  FileTextOutlined,
  TeamOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useTheme } from '../Context/ThemeContext';
import LoadingDots from '../components/Loading';

const { Title } = Typography;

const ResponsablePage = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/responsable')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <LoadingDots />; 
  }

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="Total Projects" value={data.totalProjects} prefix={<ProjectOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="Team Members" value={data.teamMembers} prefix={<TeamOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="Budget Utilization" value={data.budgetUtilization} suffix="%" prefix={<DollarOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="On-Time Delivery Rate" value={data.onTimeDeliveryRate} suffix="%" prefix={<RiseOutlined />} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Project Status">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="In Progress" value={data.projectStatus.inProgress} prefix={<ClockCircleOutlined />} />
                </Col>
                <Col span={8}>
                  <Statistic title="Completed" value={data.projectStatus.completed} prefix={<CheckCircleOutlined />} />
                </Col>
                <Col span={8}>
                  <Statistic title="Delayed" value={data.projectStatus.delayed} prefix={<WarningOutlined />} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Team Performance">
              <Progress percent={data.teamPerformance} status="active" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Upcoming Deadlines">
              <Timeline>
                {data.upcomingDeadlines.map((deadline, index) => (
                  <Timeline.Item key={index}>{deadline}</Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Recent Documents">
              <List
                itemLayout="horizontal"
                dataSource={data.recentDocuments}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<FileTextOutlined />} />}
                      title={item.title}
                      description={item.updatedAt}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    </MainLayout>
  );
};

export default ResponsablePage;
