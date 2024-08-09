import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Select } from 'antd';

const { Option } = Select;

const CreateTache = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    const fetchChefProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chef-projects'); // Update URL as needed
        setChefProjects(response.data);
      } catch (error) {
        console.error('Error fetching chef projects:', error);
      }
    };

    fetchChefProjects();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/taches', values);
      notification.success({
        message: 'Success',
        description: 'Task created successfully',
      });
      form.resetFields();
      if (onClose) onClose(); // Close modal on success
      if (onCreateSuccess) onCreateSuccess(); // Trigger refresh
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create task',
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="titre"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status!' }]}
      >
        <Select placeholder="Select a status">
          <Option value="Not Started">Not Started</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="chefProject"
        label="Chef Project"
        rules={[{ required: true, message: 'Please select a Chef Project!' }]}
      >
        <Select placeholder="Select a Chef Project">
          {chefProjects.map(chef => (
            <Option key={chef._id} value={chef._id}>
              {chef.nom}   {chef.prenom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTache;
