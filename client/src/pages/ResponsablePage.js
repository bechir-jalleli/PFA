import React from 'react';
import { Typography, Card, Space, Button, Row, Col, Statistic, List, Avatar, theme } from 'antd';
import { 
  UserOutlined, 
  PlusCircleOutlined, 
  SettingOutlined, 
  FileTextOutlined, 
  TeamOutlined, 
  StarOutlined,
  ProjectOutlined  // Add this import
} from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadResponsables from '../components/Responsable/ReadResponsable';
import { useTheme } from '../styles/Context/ThemeContext';

const { Title, Paragraph } = Typography;

const ResponsablePage = () => {
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

  const topResponsables = [
    { name: 'John Doe', projects: 5 },
    { name: 'Jane Smith', projects: 4 },
    { name: 'Bob Johnson', projects: 3 },
  ];

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <UserOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Responsable Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card style={cardStyle}>
              <Statistic title="Total Responsables" value={25} prefix={<TeamOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card style={cardStyle}>
              <Statistic title="Active Projects" value={15} prefix={<ProjectOutlined />} />
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Card title="Responsable List" style={cardStyle}>
              <ReadResponsables />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Top Responsables" style={cardStyle}>
              <List
                itemLayout="horizontal"
                dataSource={topResponsables}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.name}
                      description={`${item.projects} projects`}
                    />
                    {index === 0 && <StarOutlined style={{ color: token.colorWarning }} />}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Quick Actions" style={cardStyle}>
              <Space wrap>
                <Button type="primary" icon={<PlusCircleOutlined />}>Add New Responsable</Button>
                <Button icon={<FileTextOutlined />}>Generate Report</Button>
                <Button icon={<SettingOutlined />}>Responsable Settings</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ResponsablePage;
