import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../styles/Context/AuthContext';
import { useTheme } from '../styles/Context/ThemeContext';

const { Title, Paragraph } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: isDarkMode ? '#001529' : '#f0f2f5'
    }}>
      <Space align="center" direction="vertical" size="large">
        <img src="https://placeholder.com/3d-illustration-login" alt="Login Illustration" style={{ width: '300px' }} />
        <div style={{ 
          padding: '40px', 
          background: isDarkMode ? '#1f1f1f' : '#fff', 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Welcome Back</Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Paragraph style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register now!</Link>
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default LoginPage;
