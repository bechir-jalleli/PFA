import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Ensure this path is correct
import './Login.css'; // Import any additional CSS specific to the Login page if needed

const { Title, Text } = Typography;

export default function Login() {
  const { login } = useAuth(); // Use the useAuth hook to get the login function
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Initialize the form instance
  const [emailError, setEmailError] = useState(''); // State to handle email error
  const [passwordError, setPasswordError] = useState(''); // State to handle password error

  const onFinish = async (values) => {
    const { email, mdp } = values;
    
    // Reset errors before submitting
    setEmailError('');
    setPasswordError('');

    try {
      const response = await axios.post('http://localhost:5000/login', { email, mdp }, { withCredentials: true });

      // Store the access token and role in local storage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('role', response.data.role);

      // Update authentication state
      login();

      // Redirect user based on their role
      switch (response.data.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'responsable':
          navigate('/responsables');
          break;
        case 'chefProject':
          navigate('/chef-projects');
          break;
        case 'membreEquipe':
          navigate('/membre-equipes');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        if (err.response.data.error.toLowerCase().includes('email')) {
          setEmailError('Incorrect email address.');
        }
        if (err.response.data.error.toLowerCase().includes('password')) {
          setPasswordError('Incorrect password.');
        }
      } else {
        setEmailError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Sign in</Title>
        <Text style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>Welcome back! Please enter your details below to sign in.</Text>
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ email: '', mdp: '' }}
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', required: true, message: 'Please input your Email!' },
            ]}
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
            style={{ marginBottom: '16px' }}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#1890ff' }} />}
              placeholder="Email"
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="mdp"
            rules={[
              { required: true, message: 'Please input your Password!' },
            ]}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
            style={{ marginBottom: '24px' }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="Password"
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large" style={{ borderRadius: '8px' }}>Log in</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
