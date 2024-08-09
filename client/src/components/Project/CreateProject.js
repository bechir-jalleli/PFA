import React from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Button, notification } from 'antd';

const { TextArea } = Input;

// Function to convert date to ISO string format
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

const CreateProject = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Convert dates to ISO string format
      const formattedValues = {
        ...values,
        startDate: formatDate(values.startDate),
        endDate: formatDate(values.endDate),
      };

      await axios.post('http://localhost:5000/projects', formattedValues);
      notification.success({
        message: 'Success',
        description: 'Project created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create project',
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Project Name"
        rules={[{ required: true, message: 'Please input the project name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="organisation"
        label="Organisation"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sousOrganisation"
        label="Sous-Organisation"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="chefProject"
        label="Chef Project"
        rules={[{ required: true, message: 'Please select the Chef Project!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: 'Please select the start date!' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name="endDate"
        label="End Date"
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name="budget"
        label="Budget"
        rules={[{ required: true, message: 'Please input the budget!' }]}
      >
        <Input type="number" min={0} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
