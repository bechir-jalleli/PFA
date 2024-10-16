import React from 'react';
import { Typography, Card, Row, Col, Progress, List, Avatar, theme } from 'antd';
import { ProjectOutlined, TeamOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons';
import ReadChefProject from './ReadChefProject';

const { Title, Paragraph } = Typography;

function ChefProjectDashboard() {
  const { token } = theme.useToken();

  const pageStyle = {
    padding: token.padding,
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
  };

  const dummyProjects = [
    { name: 'Website Redesign', progress: 75 },
    { name: 'Mobile App Development', progress: 30 },
    { name: 'Database Migration', progress: 90 },
  ];

  return (
    <div style={pageStyle}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: token.marginLG }}>
        <Col>
          <ProjectOutlined style={iconStyle} />
        </Col>
        <Col>
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Chef Project Dashboard
          </Title>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <ReadChefProject />
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
  );
}

export default ChefProjectDashboard;
