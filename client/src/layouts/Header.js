import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Switch } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  MenuOutlined,
  BulbOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import LogoWhite from '../assets/image/logo-white.jpg';
import LogoBlack from '../assets/image/logo-black.jpg';
import '../styles/layouts/Header.css';
import { useTheme } from '../Context/ThemeContext';

const { Header: AntHeader } = Layout;

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
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="logo-container">
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={toggleSidebar} 
          className="sidebar-toggle"
        />
        <Link to="/" className="logo-link">
          <img className="logo" src={isDarkMode ? LogoWhite : LogoBlack} alt="Logo" />
        </Link>
        <span className="grc-title">GRC</span>
      </div>
      
      <div className="right-container">
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
          className="theme-switch"
        />
        {user ? (
          <>
            <span className="user-info">Welcome, {user.name}</span>
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <Avatar icon={<UserOutlined />} className="user-avatar" />
            </Dropdown>
          </>
        ) : (
          <Button 
            type="primary" 
            icon={<LoginOutlined />} 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
