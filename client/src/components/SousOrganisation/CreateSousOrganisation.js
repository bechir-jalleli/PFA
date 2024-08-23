// src/components/CreateSousOrganisation.js
import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Select } from 'antd';
import '../../styles/components/CreateForms.css';

const { Option } = Select;

const CreateSousOrganisation = ({ onClose, organisationOptions }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/sous-organisations', values);
      notification.success({
        message: 'Success',
        description: 'Sous-organisation created successfully',
      });
      form.resetFields();
      if (onClose) onClose(); // Close modal on success
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create sous-organisation',
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
        name="description"
        label="Details"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="organisation"
        label="Organisation"
        rules={[{ required: true, message: 'Please select an organisation!' }]}
      >
        <Select>
          {organisationOptions.map(org => (
            <Option key={org._id} value={org._id}>{org.nom}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Sous-Organisation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateSousOrganisation;
