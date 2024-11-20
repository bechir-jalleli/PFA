import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Space, Select } from 'antd';

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

const CreateResponsable = ({ onClose, onCreateSuccess, organisations, sousOrganisations }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:5000/responsables/', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Responsable created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.error || 'Failed to create responsable',
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="nom" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="prenom" label="Surname" rules={[{ required: true, message: 'Please input the surname!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true, validator: phoneNumberValidator }]}>
        <Input />
      </Form.Item>
      
      <Form.Item name="organisation" label="Organisation" rules={[{ required: true, message: 'Please select an organisation!' }]}>
        <Select>
          {organisations?.map(org => (
            <Select.Option key={org._id} value={org._id}>{org.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="sousOrganisation" label="Sous Organisation" rules={[{ required: true, message: 'Please select a sous organisation!' }]}>
        <Select>
          {sousOrganisations?.map(sorg => (
            <Select.Option key={sorg._id} value={sorg._id}>{sorg.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">Create Responsable</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateResponsable;
