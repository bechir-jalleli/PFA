import React from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, List, Tag, theme } from 'antd';
import { CheckSquareOutlined, PlusOutlined, ClockCircleOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadTache from '../components/Tache/ReadTache';
import { useTheme } from '../styles/Context/ThemeContext';

const { Title, Paragraph } = Typography;

const TachesPage = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

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

  const recentTasks = [
    { title: 'Update documentation', status: 'In Progress', assignee: 'John Doe' },
    { title: 'Fix bug in login page', status: 'Pending', assignee: 'Jane Smith' },
    { title: 'Design new logo', status: 'Completed', assignee: 'Bob Johnson' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'blue';
      case 'Pending': return 'orange';
      case 'Completed': return 'green';
      default: return 'default';
    }
  };

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
              <Statistic title="Total Tasks" value={50} prefix={<CheckSquareOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Completed Tasks" value={30} prefix={<FileDoneOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={cardStyle}>
              <Statistic title="Pending Tasks" value={20} prefix={<ClockCircleOutlined />} />
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Card 
              title="Task List" 
              style={cardStyle}
              extra={<Button type="primary" icon={<PlusOutlined />}>Add New Task</Button>}
            >
              <ReadTache />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Recent Tasks" style={cardStyle}>
              <List
                itemLayout="horizontal"
                dataSource={recentTasks}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<UserOutlined />}
                      title={item.title}
                      description={
                        <Space>
                          <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                          <span>{item.assignee}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default TachesPage;
