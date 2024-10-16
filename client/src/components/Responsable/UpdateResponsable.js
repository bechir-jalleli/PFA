import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const UpdateResponsable = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

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
    return <div>Loading...</div>;
  }

  return (
    <Form 
      form={form} 
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item 
        name="nom" 
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="prenom" 
        label="Surname"
        rules={[{ required: true, message: 'Please input the surname!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="email" 
        label="Email"
        rules={[
          { required: true, message: 'Please input the email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="phone" 
        label="Phone"
        rules={[{ required: true, message: 'Please input the phone number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="mdp" 
        label="Password"
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
  );
};

export default UpdateResponsable;
