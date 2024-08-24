// MainLayout.js
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Header from './Header';
import Sidebar from './SideBar';
import Footer from './Footer';
import { useTheme } from '../Context/ThemeContext';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} />
      <Layout hasSider>
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
        <Layout style={{ 
          marginLeft: sidebarCollapsed ? '80px' : '250px',
          transition: 'all 0.2s',
        }}>
          <Content style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
          }}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
