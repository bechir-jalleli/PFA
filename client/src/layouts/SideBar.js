// src/components/Sidebar.js
import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import {
  UserOutlined,
  TeamOutlined,
  AppstoreOutlined,
  CarryOutFilled,
  AppstoreFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import '../styles/Sidebar.css';

const items = [
  {
    label: 'Admin',
    key: 'admin',
    icon: <UserOutlined />,
    path: '/admin',
  },
  {
    label: 'Responsables',
    key: 'responsables',
    icon: <UserOutlined />,
    path: '/responsables',
  },
  {
    label: 'Chefs Project',
    key: 'chef-projects',
    icon: <UserOutlined />,
    path: '/chef-projects',
  },
  {
    label: 'Membres equipe',
    key: 'membres-equipe',
    icon: <TeamOutlined />,
    path: '/membre-equipes',
  },
  {
    label: 'Organisations',
    key: 'organisations',
    icon: <AppstoreOutlined />,
    path: '/organisations',
  },
  {
    label: 'Sous Organisation',
    key: 'sous-organisation',
    icon: <AppstoreOutlined />,
    path: '/sous-organisation',
  },
  {
    label: 'Project',
    key: 'project',
    icon: <AppstoreFilled />,
    path: '/project',
  },
  {
    label: 'Taches',
    key: 'taches',
    icon: <CarryOutFilled />,
    path: '/taches',
  },
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  const handleMenuClick = (path) => {
    navigate(path); // Use navigate to programmatically navigate
  };

  return (
<div className={`sidebar ${collapsed ? 'collapsed' : ''}`} style={{ marginTop: '64px' }}>
<Button
        type="primary"
        onClick={toggleCollapsed}
        className="toggle-btn"
        style={{ marginBottom: 16 }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className="sidebar-menu"
      >
        {items.map(item => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => handleMenuClick(item.path)} // Handle menu item click
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;