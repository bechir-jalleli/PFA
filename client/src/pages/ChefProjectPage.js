import React from 'react';
import { Typography, Space, Card, Row, Col, Progress, List, Avatar, Button, theme } from 'antd';
import { ProjectOutlined, TeamOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadChefProject from '../components/ChefProject/ReadChefProject';
import { useTheme } from '../styles/Context/ThemeContext';

const { Title, Paragraph } = Typography;

const ChefProjectPage = () => {
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

  const dummyProjects = [
    { name: 'Website Redesign', progress: 75 },
    { name: 'Mobile App Development', progress: 30 },
    { name: 'Database Migration', progress: 90 },
  ];

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <ProjectOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Chef Project Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card style={cardStyle} title="Project Overview">
              <ReadChefProject />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card style={cardStyle} title="Project Progress">
              {dummyProjects.map((project, index) => (
                <div key={index} style={{ marginBottom: token.marginMD }}>
                  <Paragraph>{project.name}</Paragraph>
                  <Progress percent={project.progress} status="active" />
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <Card style={cardStyle} title="Recent Activities">
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: 'Team meeting scheduled', icon: <TeamOutlined /> },
              { title: 'Project deadline updated', icon: <ClockCircleOutlined /> },
              { title: 'New document uploaded', icon: <FileOutlined /> },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={item.icon} />}
                  title={item.title}
                  description="2 hours ago"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChefProjectPage;
