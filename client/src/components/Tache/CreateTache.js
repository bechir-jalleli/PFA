import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, DatePicker, Button, notification, Space } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const CreateTache = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [membreEquipes, setMembreEquipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [projectsResponse, membreEquipesResponse] = await Promise.all([
          axios.get('http://localhost:5000/projects', { headers }),
          axios.get('http://localhost:5000/membre-equipes', { headers }),
        ]);

        setProjects(projectsResponse.data);
        setMembreEquipes(membreEquipesResponse.data);
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
      const token = localStorage.getItem('accessToken');
      const headers = { 'Authorization': `Bearer ${token}` };

      const formattedValues = {
        titre: values.titre,
        description: values.description,
        status: values.status,
        project: values.project,
        membreEquipe: values.membreEquipe,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate ? values.endDate.toISOString() : null,
        priority: values.priority,
      };
     
      await axios.post('http://localhost:5000/taches', formattedValues, { headers });
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
        description: 'Failed to create task: ' + (error.response?.data?.message || error.message),
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
          <Option value="Not Started">Not Started</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="project"
        label="Project"
        rules={[{ required: true, message: 'Please select a project!' }]}
      >
        <Select placeholder="Select a project">
          {projects.map(project => (
            <Option key={project._id} value={project._id}>{project.tittle}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="membreEquipe"
        label="Team Member"
        rules={[{ required: true, message: 'Please select a team member!' }]}
      >
        <Select placeholder="Select a team member">
          {membreEquipes.map(membre => (
            <Option key={membre._id} value={membre._id}>{`${membre.nom} ${membre.prenom}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: 'Please select the start date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="endDate"
        label="End Date"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select the priority!' }]}
      >
        <Select placeholder="Select priority">
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
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
