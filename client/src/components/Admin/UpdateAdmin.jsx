import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Spin, Card, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';

const { Title } = Typography;

const UpdateAdmin = () => {
  const [form] = Form.useForm();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem('accessToken');

  const { isDarkMode } = useTheme();
  const { token: themeToken } = theme.useToken();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAdmin(response.data);
        form.setFieldsValue({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          phone: response.data.phone,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch admin data',
        });
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id, form, token]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`http://localhost:5000/admin/${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      notification.success({
        message: 'Success',
        description: 'Admin updated successfully',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update admin',
      });
    }
  };

  const cardStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: isDarkMode ? themeToken.colorBgElevated : themeToken.colorBgContainer,
    boxShadow: themeToken.boxShadow,
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card hoverable style={cardStyle}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Update Admin</Title>
      <Form 
        form={form} 
        layout="vertical"
        onFinish={handleUpdate}
      >
        <Form.Item 
          name="nom" 
          label="Nom"
          rules={[{ required: true, message: 'Please input the nom!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="prenom" 
          label="Prenom"
          rules={[{ required: true, message: 'Please input the prenom!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="email" 
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="phone" 
          label="Phone"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateAdmin;
