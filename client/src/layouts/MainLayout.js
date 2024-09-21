import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './SideBar';
import Footer from './Footer';
import { useTheme } from '../Context/ThemeContext';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: isDarkMode ? '#001529' : '#f0f2f5' }}>
      <Header toggleSidebar={toggleSidebar} />
      <Layout style={{ marginTop: '64px' }}> {/* Add this style */}
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
        <Layout
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '250px',
            transition: 'margin-left 0.3s',
            padding: '0 16px',
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{
              background: isDarkMode ? '#001529' : '#fff',
              borderBottom: `1px solid ${isDarkMode ? '#fff' : '#e8e8e8'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Add menu items if necessary */}
          </Menu>
          <Content
            style={{
              margin: '24px 0',
              padding: 24,
              background: isDarkMode ? '#141414' : '#fff',
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
