import React from 'react';
import { Typography, Space, Card, theme } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import ReadMembreEquipe from '../components/MembreEquipe/ReadMembreEquipe';
import { useTheme } from '../Context/ThemeContext';

const { Title } = Typography;

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

  
  return (
    <MainLayout>
      <div style={pageStyle}>
        <Space align="center" style={{ marginBottom: token.marginLG }}>
          <TeamOutlined style={iconStyle} />
          <Title level={2} style={{ margin: 0, color: token.colorText }}>
            Membre Equipe Dashboard
          </Title>
        </Space>

          
            <Card style={cardStyle} >
              <ReadMembreEquipe />
            </Card>
        
      </div>
    </MainLayout>
  );
};

export default MembreEquipePage;
