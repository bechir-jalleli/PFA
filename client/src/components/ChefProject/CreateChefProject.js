import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';
import '../../styles/components/ChefProject.css';

const CreateChefProject = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/chef-projects/register', values);
      notification.success({
        message: 'Success',
        description: 'Chef Project created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess(); 
      if (onClose) onClose(); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create Chef Project',
      });
    }
  };
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

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" className="chef-project-form">
      <Form.Item
        name="nom"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input className="input-field" />
      </Form.Item>
      <Form.Item
        name="prenom"
        label="Surname"
      >
        <Input className="input-field" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
      >
        <Input className="input-field" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[{ required: true, validator: phoneNumberValidator }]}
      >
        <Input className="input-field" />
      </Form.Item>
      <Form.Item
        name="mdp"
        label="Password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password className="input-field" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="form-button">
          Create Chef Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateChefProject;
