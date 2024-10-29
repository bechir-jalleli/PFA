import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification,Card } from 'antd';

const UpdateChefProject = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefProject = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/chef-projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        form.setFieldsValue(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch Chef Project details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChefProject();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/chef-projects/${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      notification.success({
        message: 'Success',
        description: 'Chef Project updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update Chef Project',
      });
    }
  };

 

  return (
    <Card hoverable style={{backgroundColor:'#fff',maxWidth: '500px',margin: '0 auto'}}>
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="nom" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="prenom" label="Surname" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="mdp" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Chef Project
        </Button>
      </Form.Item>
    </Form>
    </div>
    </Card>
  );
};

export default UpdateChefProject;
