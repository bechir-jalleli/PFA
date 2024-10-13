import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, notification, Select } from 'antd';

const { Option } = Select;

function UpdateTache({ id, onUpdateSuccess }) {
  const [form] = Form.useForm();
  const [membreEquipes, setMembreEquipes] = useState([]);

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/taches/${id}`);
        form.setFieldsValue(response.data); 
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    const fetchMembreEquipes = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:5000/membre-equipes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMembreEquipes(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTache();
    fetchMembreEquipes();
  }, [id, form]);

  const handleOk = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/taches/${id}`, form.getFieldsValue(), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      notification.success({
        message: 'Success',
        description: 'Task updated successfully',
      });
      form.resetFields();
      if (onUpdateSuccess) onUpdateSuccess(); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update task',
      });
    }
  };

  return (
    <Form form={form} layout="vertical">
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
    </Form>
  );
}

export default UpdateTache;
