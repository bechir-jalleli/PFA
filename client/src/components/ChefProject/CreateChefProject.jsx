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

const CreateChefProject = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/responsables', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setResponsables(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch responsables',
        });
      }
    };

    fetchResponsables();
  }, []);

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      const chefProjectData = {
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        phone: values.phone,
        responsable: values.responsable,
        salary: values.salary,
      };

      await axios.post('http://localhost:5000/chef-projects', chefProjectData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

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
        description: error.response?.data?.message || 'Failed to create chef project',
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
        name="responsable"
        label="Responsable"
        rules={[{ required: true, message: 'Please select a responsable!' }]}
      >
        <Select placeholder="Select responsable">
          {responsables.map((resp) => (
            <Option key={resp._id} value={resp._id}>
              {`${resp.nom} ${resp.prenom}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="salary"
        label="Salary"
        rules={[{ required: true, message: 'Please input the salary!' }]}
      >
        <Input type="number" placeholder="Enter salary" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Create Chef Project
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateChefProject;
