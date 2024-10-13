import React from 'react';
import { Typography, Card, Space, Button, Row, Col, Progress, theme } from 'antd';
import { ProjectOutlined, PlusCircleOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadProject from '../components/Project/ReadProjects';
import { useTheme } from '../Context/ThemeContext';

const { Title, Paragraph } = Typography;

const ProjectPage = React.memo(() => {
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

  

  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <ProjectOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Project Dashboard
          </Title>
        </Space>

        <Row gutter={[16, 24]}>
          <Col xs={24} lg={24}>
            <Card title="Project List" style={cardStyle}>
              <ReadProject />
            </Card>
          </Col>
          
          <Col xs={24}>
            <Card title="Quick Actions" style={cardStyle}>
              <Space wrap>
                <Button type="primary" icon={<PlusCircleOutlined />}>Add New Project</Button>
                <Button icon={<FileTextOutlined />}>Generate Report</Button>
                <Button icon={<SettingOutlined />}>Project Settings</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
});

export default ProjectPage;
