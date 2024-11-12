import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Space } from 'antd';

const phoneNumberValidator = (_, value) => {
  if (!value) {
    return Promise.reject(new Error('Please input the phone number!'));
  }
  
  const phoneRegex = /^(?:2|9|5|\+216)[0-9]{7}$/;
  if (!phoneRegex.test(value)) {
    return Promise.reject(new Error('Phone number must start with 2, 9, 5, or +216 followed by 7 digits.'));
  }

  return Promise.resolve();
};

const CreateMembreEquipe = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/membre-equipes', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Create response:', response);
      notification.success({
        message: 'Success',
        description: 'Membre equipe created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Create error:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to create membre equipe',
      });
    }
  };

  return (
    <Form 
      form={form} 
      onFinish={onFinish} 
      layout="vertical"
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="nom"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        name="prenom"
        label="Surname"
        rules={[{ required: true, message: 'Please input the surname!' }]}
      >
        <Input placeholder="Enter surname" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, validator: phoneNumberValidator }]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        name="mdp"
        label="Password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Create Team Member
          </Button>
          <Button onClick={onClose}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateMembreEquipe;
