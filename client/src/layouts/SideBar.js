import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
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
import '../styles/layouts/Sidebar.css';

const { Sider } = Layout;

const items = [
  { key: 'admin', icon: <CrownOutlined />, label: 'Admin' },
  { key: 'responsables', icon: <UserOutlined />, label: 'Responsables' },
  { key: 'chef-projects', icon: <ProjectOutlined />, label: 'Chefs Project' },
  { key: 'membre-equipes', icon: <TeamOutlined />, label: 'Membres equipe' },
  { key: 'organisations', icon: <ApartmentOutlined />, label: 'Organisations' },
  { key: 'sous-organisation', icon: <BranchesOutlined />, label: 'Sous Organisation' },
  { key: 'project', icon: <AppstoreOutlined />, label: 'Project' },
  { key: 'taches', icon: <CheckSquareOutlined />, label: 'Taches' },
];

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Sider
      className={`sidebar ${isDarkMode ? 'dark' : 'light'}`}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={250}
      collapsedWidth={80}
    >
      <div className="logo">
        {!collapsed && <span className="logo-text">Your Logo</span>}
      </div>
      <Menu
        mode="inline"
        theme={isDarkMode ? 'dark' : 'light'}
        defaultSelectedKeys={[location.pathname.split('/')[1] || 'admin']}
        defaultOpenKeys={['organisations']}
        items={items}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;
