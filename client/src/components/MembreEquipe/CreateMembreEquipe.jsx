import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Space, Select } from 'antd';

const { Option } = Select;

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
  const [chefProjects, setChefProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChefProjects = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/chef-projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setChefProjects(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch chef projects',
        });
      }
    };

    fetchChefProjects();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/membre-equipes', {
        ...values,
        role: 'membre',
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      notification.success({
        message: 'Success',
        description: 'Membre equipe created successfully',
      });
      
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.error || 'Failed to create membre equipe',
      });
    } finally {
      setLoading(false);
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
        name="salary"
        label="Salary"
        rules={[{ required: true, message: 'Please input the salary!' }]}
      >
        <Input type="number" placeholder="Enter salary" />
      </Form.Item>

      <Form.Item
        name="chefProject"
        label="Chef Project"
        rules={[{ required: true, message: 'Please select a chef project!' }]}
      >
        <Select placeholder="Select chef project">
          {chefProjects.map(chef => (
            <Option key={chef._id} value={chef._id}>
              {`${chef.nom} ${chef.prenom}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
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
