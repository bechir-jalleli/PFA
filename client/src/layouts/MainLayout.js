import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './SideBar';
import Header from './Header';
import { useTheme } from '../Context/ThemeContext';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s' }}>
        <Header collapsed={collapsed} onCollapse={setCollapsed} />
        <Content
          style={{
            margin: '60px 16px',
            padding: 24,
            minHeight: 280,
            background: isDarkMode ? '#141414' : '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;