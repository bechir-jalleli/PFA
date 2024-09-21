import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
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
  UnorderedListOutlined 
} from '@ant-design/icons';
import { useTheme } from '../Context/ThemeContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

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
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      allowedRoles: ['admin', 'responsable', 'chef-project', 'membre-equipe'],
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
      allowedRoles: ['admin', 'responsable', 'chef-project'],
      
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
      allowedRoles: ['admin', 'responsable', 'chef-project'],
     
    },

    {
      key: '/taches',
      icon: <CheckSquareOutlined />,
      label: 'Taches',
      allowedRoles: ['admin', 'responsable', 'chef-project'],
      
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="site-layout-sidebar"
      width={250}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        background: isDarkMode ? '#001529' : '#fff',
        overflow: 'auto',
        transition: 'width 0.3s',
        zIndex: 1000,
      }}
    >
      <Menu
        mode="inline"
        theme={isDarkMode ? 'dark' : 'light'}
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
      >
        {menuItems.map(item =>
          item.allowedRoles.includes(userRole) ? (
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map(subItem =>
                  subItem.allowedRoles.includes(userRole) ? (
                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                      {subItem.label}
                    </Menu.Item>
                  ) : null
                )}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          ) : null
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
