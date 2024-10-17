import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CreateProject = ({ onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/projects', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      notification.success({
        message: 'Success',
        description: 'Project created successfully',
      });
      form.resetFields();
      onCreateSuccess(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create project: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="startDate" label="Start Date">
        <DatePicker />
      </Form.Item>
      <Form.Item name="endDate" label="End Date">
        <DatePicker />
      </Form.Item>
      <Form.Item name="budget" label="Budget">
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
        <Select>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Delayed">Delayed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
