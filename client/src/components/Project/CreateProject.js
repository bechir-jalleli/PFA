import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, DatePicker, Select, Button, notification } from 'antd';
import '../../styles/components/CreateForms.css';

const { TextArea } = Input;
const { Option } = Select;

// Function to convert date to ISO string format
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

const CreateProject = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [organisations, setOrganisations] = useState([]);
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, organisationsResponse, sousOrganisationsResponse, chefProjectsResponse] = await Promise.all([
          axios.get('http://localhost:5000/projects'),
          axios.get('http://localhost:5000/organisations'),
          axios.get('http://localhost:5000/sous-organisations'),
          axios.get('http://localhost:5000/chef-projects'),
        ]);

        setOrganisations(organisationsResponse.data);
        setSousOrganisations(sousOrganisationsResponse.data);
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
        rules={[{ required: true, message: 'Please select an Organisation!' }]}
      >
        <Select placeholder="Select an Organisation">
          {organisations.map(org => (
            <Option key={org._id} value={org._id}>
              {org.nom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="sousOrganisation"
        label="Sous-Organisation"
      >
        <Select placeholder="Select a Sous-Organisation">
          {sousOrganisations.map(sousOrg => (
            <Option key={sousOrg._id} value={sousOrg._id}>
              {sousOrg.nom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="chefProject"
        label="Chef Project"
        rules={[{ required: true, message: 'Please select a Chef Project!' }]}
      >
        <Select placeholder="Select a Chef Project">
          {chefProjects.map(chefProject => (
            <Option key={chefProject._id} value={chefProject._id}>
              {chefProject.nom}
            </Option>
          ))}
        </Select>
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
