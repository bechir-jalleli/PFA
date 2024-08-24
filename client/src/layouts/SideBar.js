// Sidebar.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Layout, theme } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  BranchesOutlined,
  AppstoreOutlined,
  CheckSquareOutlined,
  CrownOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  const menuItems = [
    { key: 'admin', icon: <CrownOutlined />, label: 'Admin' },
    { key: 'responsables', icon: <UserOutlined />, label: 'Responsables' },
    { key: 'chef-projects', icon: <TeamOutlined />, label: 'Chefs Project' },
    { key: 'membre-equipes', icon: <TeamOutlined />, label: 'Membres equipe' },
    { key: 'organisations', icon: <ApartmentOutlined />, label: 'Organisations' },
    { key: 'sous-organisation', icon: <BranchesOutlined />, label: 'Sous Organisation' },
    { key: 'project', icon: <ProjectOutlined />, label: 'Project' },
    { key: 'taches', icon: <CheckSquareOutlined />, label: 'Taches' },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      theme={isDarkMode ? 'dark' : 'light'}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64, // Adjust this value to match your header height
        bottom: 0,
      }}
    >
      <Menu
        mode="inline"
        theme={isDarkMode ? 'dark' : 'light'}
        defaultSelectedKeys={[location.pathname.split('/')[1] || 'admin']}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
