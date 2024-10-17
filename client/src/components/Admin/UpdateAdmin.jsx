import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Spin } from 'antd';
import { useParams } from 'react-router-dom';

const UpdateAdmin = () => {
  const [form] = Form.useForm();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`);
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
  }, [id, form]);

  const handleUpdate = async (values) => {
    try {
      await axios.put(`http://localhost:5000/admin/${id}`, values);
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

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Update Admin</h2>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAdmin;
