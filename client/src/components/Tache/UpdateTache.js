import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

function UpdateTache({ id, onUpdateSuccess }) {
  const [form] = Form.useForm();
  const [membreEquipes, setMembreEquipes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [tacheResponse, membreEquipesResponse, projectsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/taches/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/membre-equipes', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/projects', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        const tacheData = tacheResponse.data;
        form.setFieldsValue({
          ...tacheData,
          startDate: moment(tacheData.startDate),
          endDate: tacheData.endDate ? moment(tacheData.endDate) : null,
          membreEquipe: tacheData.membreEquipe?._id,
          project: tacheData.project?._id,
        });

        setMembreEquipes(membreEquipesResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/taches/${id}`, {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate ? values.endDate.toISOString() : null,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      notification.success({
        message: 'Success',
        description: 'Task updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      console.error('Error updating task:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update task',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
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
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status!' }]}
      >
        <Select placeholder="Select a status">
          <Option value="Not Started">Not Started</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select a priority!' }]}
      >
        <Select placeholder="Select a priority">
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="membreEquipe"
        label="Membre Équipe"
        rules={[{ required: true, message: 'Please select a team member!' }]}
      >
        <Select placeholder="Select a team member">
          {membreEquipes.map(membre => (
            <Option key={membre._id} value={membre._id}>
              {membre.nom} {membre.prenom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="project"
        label="Project"
        rules={[{ required: true, message: 'Please select a project!' }]}
      >
        <Select placeholder="Select a project">
          {projects.map(project => (
            <Option key={project._id} value={project._id}>
              {project.tittle}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: 'Please select the start date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="endDate"
        label="End Date"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Task
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateTache;
