
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
import { useTheme } from '../styles/Context/ThemeContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  const menuItems = [
    {
      key: 'sub1',
      icon: <CrownOutlined />,
      label: 'Admin',
      children: [
        { key: 'admin', label: 'Admin Dashboard' },
        { key: 'responsables', label: 'Responsables' },
      ]
    },
    {
      key: 'sub2',
      icon: <TeamOutlined />,
      label: 'Team',
      children: [
        { key: 'chef-projects', label: 'Chefs Project' },
        { key: 'membre-equipes', label: 'Membres equipe' },
      ]
    },
    {
      key: 'sub3',
      icon: <ApartmentOutlined />,
      label: 'Organization',
      children: [
        { key: 'organisations', label: 'Organisations' },
        { key: 'sous-organisation', label: 'Sous Organisation' },
      ]
    },
    {
      key: 'sub4',
      icon: <AppstoreOutlined />,
      label: 'Projects',
      children: [
        { key: 'project', label: 'Project' },
        { key: 'taches', label: 'Taches' },
      ]
    },
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
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuItems.map(item => (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map(child => (
              <Menu.Item key={child.key}>{child.label}</Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
