import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  BranchesOutlined,
  CheckSquareOutlined,
  CrownOutlined,
  ApartmentOutlined,
  DashboardOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const menuItems = [
    {
      key: '/admin',
      icon: <CrownOutlined />,
      label: 'Admin',
      allowedRoles: ['admin'],
    },
    {
      key: '/responsables',
      icon: <UserOutlined />,
      label: 'Responsables',
      allowedRoles: ['admin', 'responsable'],
      children: [
        { key: '/responsables/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable'] },
        { key: '/responsables/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin'] },
        { key: '/responsables/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable'] },
      ],
    },
    {
      key: '/chef-projects',
      icon: <TeamOutlined />,
      label: 'Chefs Project',
      allowedRoles: ['admin', 'responsable', 'chef-project'],
      children: [
        { key: '/chef-projects/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable', 'chef-project'] },
        { key: '/chef-projects/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin', 'responsable'] },
        { key: '/chef-projects/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable', 'chef-project'] },
      ],
    },
    {
      key: '/membre-equipes',
      icon: <TeamOutlined />,
      label: 'Membres equipe',
      allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'],
      children: [
        { key: '/membre-equipes/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'] },
        { key: '/membre-equipes/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin', 'responsable', 'chef-project'] },
        { key: '/membre-equipes/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'] },
      ],
    },
    {
      key: '/organisations',
      icon: <ApartmentOutlined />,
      label: 'Organisations',
      allowedRoles: ['admin', 'responsable'],
      children: [
        { key: '/organisations/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable'] },
        { key: '/organisations/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin'] },
        { key: '/organisations/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable'] },
      ],
    },
    {
      key: '/sous-organisations',
      icon: <BranchesOutlined />,
      label: 'Sous Organisation',
      allowedRoles: ['admin', 'responsable'],
      children: [
        { key: '/sous-organisations/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable'] },
        { key: '/sous-organisations/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin'] },
        { key: '/sous-organisations/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable'] },
      ],
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: 'Project',
      allowedRoles: ['admin', 'responsable', 'chef-project','membre-equipe'],
      children: [
        { key: '/projects/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable', 'chef-project'] },
        { key: '/projects/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin', 'responsable'] },
        { key: '/projects/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable', 'chef-project'] },
      ],
    },
    {
      key: '/taches',
      icon: <CheckSquareOutlined />,
      label: 'Taches',
      allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'],
      children: [
        { key: '/taches/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'] },
        { key: '/taches/create', icon: <PlusOutlined />, label: 'Create', allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'] },
        { key: '/taches/list', icon: <UnorderedListOutlined />, label: 'List', allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'] },
      ],
    },
  ];

  const filterMenuItems = (items) => {
    return items.filter(item => {
      if (item.allowedRoles && item.allowedRoles.includes(userRole)) {
        if (item.children) {
          item.children = filterMenuItems(item.children);
        }
        return true;
      }
      return false;
    });
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      );
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

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
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Title level={4} style={{ color: isDarkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)', margin: 0 }}>
          {collapsed ? 'App' : 'Menu'}
        </Title>
      </div>
      <Menu
        mode="inline"
        theme={isDarkMode ? 'dark' : 'light'}
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={[location.pathname.split('/')[1]]}
        onClick={handleMenuClick}
        style={{ 
          borderRight: 0,
        }}
      >
        {renderMenuItems(filteredMenuItems)}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
