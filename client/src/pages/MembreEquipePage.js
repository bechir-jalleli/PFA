import React from 'react';
import { Typography, Space, Card, Row, Col, Avatar, List, Button, theme } from 'antd';
import { TeamOutlined, UserOutlined, ProjectOutlined, CheckCircleOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadMembreEquipe from '../components/MembreEquipe/ReadMembreEquipe';
import { useTheme } from '../Context/ThemeContext';

const { Title, Paragraph } = Typography;

const MembreEquipePage = () => {
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

  const dummyTasks = [
    'Complete project documentation',
    'Review code changes',
    'Attend team meeting',
    'Update task board',
  ];

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <TeamOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Membre Equipe Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card style={cardStyle} title="Team Members">
              <ReadMembreEquipe />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card style={cardStyle} title="My Tasks">
              <List
                itemLayout="horizontal"
                dataSource={dummyTasks}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CheckCircleOutlined />}
                      title={item}
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

export default MembreEquipePage;
