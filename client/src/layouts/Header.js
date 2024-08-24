import React from 'react';
import { Layout, Dropdown, Switch, Menu, Typography, Space, theme, Button } from 'antd';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  BulbOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import LogoWhite from '../assets/image/logo-white.jpg';
import LogoBlack from '../assets/image/logo-black.jpg';
import ProfileImage from '../assets/image/profile.png';
import { useTheme } from '../Context/ThemeContext';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      width: '100%',
      height: '64px',
      backgroundColor: token.colorBgContainer,
      color: token.colorText,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
    }}>
      <Space align="center">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={isDarkMode ? LogoWhite : LogoBlack} 
            alt="Logo" 
            style={{
              height: '32px',
              width: '50px',
              marginRight: '8px',
              borderRadius: '30%',
              objectFit: 'cover',
            }}
          />
        </Link>
        <Text strong style={{ 
          fontSize: '20px', 
          color: token.colorText,
          '@media screen and (max-width: 768px)': {
            display: 'none',
          },
        }}>
          GRC
        </Text>
      </Space>
      
      <Space align="center">
        <Switch
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
          checked={isDarkMode}
          onChange={toggleTheme}
          style={{ marginRight: '16px' }}
        />
        {user ? (
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <img 
              src={ProfileImage} 
              alt="Profile" 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                objectFit: 'cover',
              }}
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
