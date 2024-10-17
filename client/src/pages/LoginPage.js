import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Typography, Space, Layout, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const { Title, Text } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      navigateBasedOnRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    if (rememberedUser) {
      form.setFieldsValue(rememberedUser);
      setRememberMe(true);
    }
  }, [form]);

  const navigateBasedOnRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'responsable':
        navigate('/responsables');
        break;
      case 'chefProject':
        navigate('/chef-projects');
        break;
      case 'membre-equipe':
        navigate('/membre-equipes');
        break;
      default:
        navigate('/');
        break;
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const loggedInUser = await login(values.email, values.password);
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({ email: values.email, password: values.password }));
      } else {
        localStorage.removeItem('rememberedUser');
      }
      message.success('Login successful');
      navigateBasedOnRole(loggedInUser.role);
    } catch (error) {
      } finally {
      setLoading(false);
    }
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Email!'));
    }
    const validRoles = ['admin', 'responsable', 'chef', 'membre'];
    const isRoleEmail = validRoles.includes(value); // Check if input is one of the roles
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value); // Regex for general email format

    if (!isRoleEmail && !isValidEmail) {
      return Promise.reject(new Error('Please enter a valid email!'));
    }
    return Promise.resolve();
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: isDarkMode ? '#001529' : '#f0f2f5',
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const loginBoxStyle = {
    background: isDarkMode ? '#141414' : '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '1000px',
  };

  return (
    <Layout style={containerStyle}>
      <Header />

      <Content style={contentStyle}>
        <div style={loginBoxStyle}>
          <Row>
            <Col xs={24} md={12} style={{ padding: '40px', background: isDarkMode ? '#1f1f1f' : '#f6f8fa' }}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={3} style={{ textAlign: 'center', margin: '0px 0px 50px 0px ' }}>Welcome to GRCWebsite</Title>

                <img 
                  src="/image/login.png" 
                  alt="Login Illustration" 
                  style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }} 
                />
                
              </div>
            </Col>
            <Col xs={24} md={12} style={{ padding: '40px' }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2} style={{ marginBottom: '24px' }}>Log In</Title>
                <Form
                  form={form}
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  size="large"
                >
                  <Form.Item
                    name="email"
                    rules={[{ validator: validateEmail }]}
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
                    <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
                
              </Space>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
};

export default LoginPage;
