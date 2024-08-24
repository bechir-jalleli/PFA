import React from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Space } from 'antd';

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
      if (onClose) onClose();
      if (onCreateSuccess) onCreateSuccess();
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
        <Space>
          <Button type="primary" htmlType="submit">
            Create Organisation
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateOrganisation;
