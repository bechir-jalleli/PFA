import React from 'react';
import { Layout, Dropdown, Switch, Menu, Typography, Space, Button } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  BulbOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import './Header.css'; 

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a href='http://localhost:3000/profil'>Profile</a>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
      {user && <Link to={`http://localhost:3000/${user.role}/update/${user.id}`}>Settingx</Link>}

      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  

  return (
    <AntHeader className="header">
      <Space align="center">
        <Button 
          type="link"
          icon={<BulbOutlined />} 
          onClick={toggleSidebar}
          className="sidebar-toggle"
        />
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={isDarkMode ? '/image/logo-white.jpg' : '/image/logo-black.jpg'} 
            alt="Logo" 
            className="logo"
          />
          <Text strong className="logo-text">
            GRC
          </Text>
        </Link>
      </Space>
      
      <Space align="center">
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
          className="theme-switch"
        />
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <img 
              src="/image/profile.png" 
              alt="Profile" 
              className="profile-img"
            />
          </Dropdown>
        ) : (
          <Button 
            type="primary" 
            icon={<LoginOutlined />} 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;
