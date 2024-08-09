// src/components/CreateResponsable.js
import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const phoneNumberValidator = (_, value) => {
  if (!value) {
    return Promise.reject(new Error('Please input the phone number!'));
  }
  
  // Regular expression for validating the phone number
  const phoneRegex = /^(?:2|9|5|\+216)[0-9]{7}$/;
  if (!phoneRegex.test(value)) {
    return Promise.reject(new Error('Phone number must start with 2, 9, 5, or +216 followed by 7 digits.'));
  }

  return Promise.resolve();
};

const CreateResponsable = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/responsables/register', values);
      notification.success({
        message: 'Success',
        description: 'Responsable created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess(); // Call the callback to refresh data
      if (onClose) onClose(); // Close modal on success
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create responsable',
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
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
        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, validator: phoneNumberValidator }]}
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
          Create Responsable
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateResponsable;
