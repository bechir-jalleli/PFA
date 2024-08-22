import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './SideBar';
import Footer from './Footer';
import { useTheme } from '../Context/ThemeContext';
import '../styles/layouts/MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Layout className={`main-layout ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <Layout className={`site-layout ${sidebarCollapsed ? '' : 'expanded'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <Content className="site-content">
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
