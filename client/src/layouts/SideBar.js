import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  UserOutlined, 
  TeamOutlined, 
  ProjectOutlined, 
  BranchesOutlined, 
  CheckSquareOutlined, 
  ApartmentOutlined, 
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';

const { Sider } = Layout;

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
      key: '/Dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      allowedRoles: ['admin', 'responsable', 'chefProject', 'membreEquipe'],
    },
    {
      key: '/responsables',
      icon: <UserOutlined />,
      label: 'Responsables',
      allowedRoles: ['admin'],
    },
    {
      key: '/chef-projects',
      icon: <TeamOutlined />,
      label: 'Chefs Project',
      allowedRoles: ['admin', 'responsable'],
    },
    {
      key: '/membre-equipes',
      icon: <TeamOutlined />,
      label: 'Membres equipe',
      allowedRoles: ['admin', 'responsable', 'chefProject'],
    },
    {
      key: '/organisations',
      icon: <ApartmentOutlined />,
      label: 'Organisations',
      allowedRoles: ['admin'],
    },
    {
      key: '/sous-organisations',
      icon: <BranchesOutlined />,
      label: 'Sous Organisation',
      allowedRoles: ['admin'],
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: 'Project',
      allowedRoles: ['admin', 'responsable', 'chefProject'],
    },
    {
      key: '/taches',
      icon: <CheckSquareOutlined />,
      label: 'Taches',
      allowedRoles: ['admin', 'responsable', 'chefProject','membreEquipe'],
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="site-layout-sidebar"
      width={250}
      theme={isDarkMode ? 'dark' : 'light'}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        
        overflow: 'auto',
        transition: 'all 0.3s',
        zIndex: 1000,
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
      }}
    >
      <div  style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      </div>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => onCollapse(!collapsed)}
        style={{
          fontSize: '16px',
          width: '100%',
          height: 44,
          color: isDarkMode ? '#fff' : '#001529',
        }}
      />
      <Menu
        mode="inline"
        theme={isDarkMode ? 'dark' : 'light'}
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        style={{ borderRight: 0  }}
      >
        {menuItems.map(item =>
          item.allowedRoles.includes(userRole) && (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
