import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Card } from 'antd';
import { useTheme } from '../../Context/ThemeContext';

const UpdateResponsable = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  const cardStyle = {
    backgroundColor: isDarkMode ? '#141414' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: isDarkMode ? '0 4px 12px rgba(255, 255, 255, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
  };

  const formItemStyle = {
    color: isDarkMode ? '#fff' : '#000'
  };

  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/responsables/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching responsable:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch responsable details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResponsable();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/responsables/${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Responsable updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update responsable',
      });
    }
  };

  if (loading) {
    return <div style={{ color: isDarkMode ? '#fff' : '#000' }}>Loading...</div>;
  }

  return (
    <Card hoverable style={cardStyle}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form 
          form={form} 
          onFinish={handleSubmit}
          layout="vertical"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <Form.Item 
            name="nom" 
            label={<span style={formItemStyle}>Name</span>}
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="prenom" 
            label={<span style={formItemStyle}>Surname</span>}
            rules={[{ required: true, message: 'Please input the surname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="email" 
            label={<span style={formItemStyle}>Email</span>}
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="phone" 
            label={<span style={formItemStyle}>Phone</span>}
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="mdp" 
            label={<span style={formItemStyle}>Password</span>}
            rules={[{ required: true, message: 'Please input the password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Responsable
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default UpdateResponsable;
