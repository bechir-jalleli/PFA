import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, DatePicker, Button, notification, Space } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const CreateTache = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, chefProjectsResponse] = await Promise.all([
          axios.get('http://localhost:5000/projects'),
          axios.get('http://localhost:5000/chef-projects'),
        ]);
        setProjects(projectsResponse.data);
        setChefProjects(chefProjectsResponse.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data',
        });
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/taches', values);
      notification.success({
        message: 'Success',
        description: 'Task created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
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
        rules={[{ required: true, message: 'Please input the task title!' }]}
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
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status!' }]}
      >
        <Select placeholder="Select status">
          <Option value="To Do">To Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="project"
        label="Project"
        rules={[{ required: true, message: 'Please select a project!' }]}
      >
        <Select placeholder="Select a project">
          {projects.map(project => (
            <Option key={project._id} value={project._id}>{project.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="chefProject"
        label="Chef Project"
        rules={[{ required: true, message: 'Please select a chef project!' }]}
      >
        <Select placeholder="Select a chef project">
          {chefProjects.map(chef => (
            <Option key={chef._id} value={chef._id}>{`${chef.nom} ${chef.prenom}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="dateDebut"
        label="Start Date"
        rules={[{ required: true, message: 'Please select the start date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="dateFin"
        label="End Date"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Create Task
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateTache;
