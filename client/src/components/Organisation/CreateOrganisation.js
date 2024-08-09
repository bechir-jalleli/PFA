import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const CreateOrganisation = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/organisations', values);
      notification.success({
        message: 'Success',
        description: 'Organisation created successfully',
      });
      form.resetFields();
      if (onClose) onClose(); // Close modal on success
      if (onCreateSuccess) onCreateSuccess(); // Notify parent to refresh data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create organisation',
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Organisation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrganisation;
