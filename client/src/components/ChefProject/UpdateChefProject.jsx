import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Card, Select } from 'antd';

const { Option } = Select;

const UpdateChefProject = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [responsables, setResponsables] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const [responsablesResponse, projectsResponse] = await Promise.all([
          axios.get('http://localhost:5000/responsables', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/projects', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        setResponsables(responsablesResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data',
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChefProject = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/chef-projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        form.setFieldsValue({
          nom: response.data.nom,
          prenom: response.data.prenom,
          phone: response.data.phone,
          email: response.data.email,
          salary: response.data.salary,
          responsable: response.data.responsable?._id,
          project: response.data.project?._id
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch Chef Project details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChefProject();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/chef-projects/${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      notification.success({
        message: 'Success',
        description: 'Chef Project updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to update Chef Project',
      });
    }
  };

  return (
    <Card hoverable style={{backgroundColor:'#fff', maxWidth: '500px', margin: '0 auto'}}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="nom" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="prenom" label="Surname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="responsable" label="Responsable" rules={[{ required: true }]}>
            <Select placeholder="Select a responsable">
              {responsables.map(responsable => (
                <Option key={responsable._id} value={responsable._id}>
                  {`${responsable.nom} ${responsable.prenom}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="project" label="Project" rules={[{ required: true }]}>
            <Select placeholder="Select a project">
              {projects.map(project => (
                <Option key={project._id} value={project._id}>
                  {project.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Chef Project
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default UpdateChefProject;
