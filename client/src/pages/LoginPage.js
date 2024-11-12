import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Typography, Space, Layout, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const { Title } = Typography;
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
    const isRoleEmail = validRoles.includes(value);
    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);

    if (!isRoleEmail && !isValidEmail) {
      return Promise.reject(new Error('Please enter a valid email!'));
    }
    return Promise.resolve();
  };

  return (
    <Layout className={`login-layout ${isDarkMode ? 'dark' : 'light'}`}>
      <Header />
      
      <div className="animated-bg">
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>
        <div className="square s1"></div>
        <div className="square s2"></div>
      </div>

      <Content className="login-content">
        <div className="login-container">
          <Row>
            <Col xs={24} md={12} className="login-left-panel">
              <div className="login-welcome">
                <Title level={2} className="gradient-text">Welcome to GRC Website</Title>
                <img 
                  src="/image/login.svg" 
                  alt="Login Illustration" 
                  className="login-illustration"
                />
              </div>
            </Col>
            <Col xs={24} md={12} className="login-right-panel">
              <Space direction="vertical" size="large" className="login-form-container">
                <Title level={2}>Sign In</Title>
                <Form
                  form={form}
                  name="normal_login"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  size="large"
                  className="login-form"
                >
                  <Form.Item
                    name="email"
                    rules={[{ validator: validateEmail }]}
                  >
                    <Input 
                      prefix={<UserOutlined />} 
                      placeholder="Email"
                      className="custom-input"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input.Password 
                      prefix={<LockOutlined />} 
                      placeholder="Password"
                      className="custom-input"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="remember-checkbox"
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      className="login-button"
                    >
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer />

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .login-layout {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .login-layout.light {
          background: #f0f2f5;
        }

        .login-layout.dark {
          background: #001529;
        }

        .animated-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .circle, .square {
          position: absolute;
          background: linear-gradient(45deg, #1890ff, #36cfc9);
          opacity: 0.1;
        }

        .circle {
          border-radius: 50%;
          animation: float 8s infinite;
        }

        .square {
          animation: rotate 10s infinite;
        }

        .c1 { width: 150px; height: 150px; top: 10%; left: 15%; }
        .c2 { width: 200px; height: 200px; bottom: 20%; right: 15%; }
        .c3 { width: 100px; height: 100px; bottom: 15%; left: 25%; }
        .s1 { width: 100px; height: 100px; top: 20%; right: 20%; }
        .s2 { width: 150px; height: 150px; bottom: 30%; left: 10%; }

        .login-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        .login-container {
          background: var(--background-color);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 1000px;
          transform: translateZ(0);
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease-out;
        }

        .login-left-panel {
          padding: 40px;
          background: rgba(246, 248, 250, 0.5);
        }

        .dark .login-left-panel {
          background: rgba(31, 31, 31, 0.5);
        }

        .login-welcome {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .gradient-text {
          background: linear-gradient(45deg, #1890ff, #36cfc9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 50px !important;
        }

        .login-illustration {
          width: 100%;
          max-width: 300px;
          margin-bottom: 20px;
          animation: float 7s ease-in-out infinite;
        }

        .login-right-panel {
          padding: 40px;
        }

        .custom-input {
          height: 45px;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .custom-input:hover {
          transform: translateY(-2px);
        }

        .login-button {
          width: 100%;
          height: 45px;
          background: linear-gradient(45deg, #1890ff, #36cfc9);
          border: none;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(24, 144, 255, 0.3);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dark .login-container {
          background: rgba(20, 20, 20, 0.8);
        }

        .dark .custom-input {
          background: rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .login-left-panel,
          .login-right-panel {
            padding: 30px;
          }
          
          .gradient-text {
            margin-bottom: 30px !important;
          }
          
          .login-illustration {
            max-width: 250px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
