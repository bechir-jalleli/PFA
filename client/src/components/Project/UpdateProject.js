import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, InputNumber, Select, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const UpdateProject = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [projectResponse, organisationsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/projects/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/organisations', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        const projectData = projectResponse.data;
        form.setFieldsValue({
          ...projectData,
          startDate: moment(projectData.startDate),
          endDate: projectData.endDate ? moment(projectData.endDate) : null,
          organisation: projectData.organisation?._id,
        });

        setOrganisations(organisationsResponse.data);
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
      await axios.put(`http://localhost:5000/projects/${id}`, {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate ? values.endDate.toISOString() : null,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      notification.success({
        message: 'Success',
        description: 'Project updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      console.error('Error updating project:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update project',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the project name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the project description!' }]}
      >
        <Input.TextArea />
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
      <Form.Item
        name="budget"
        label="Budget"
        rules={[{ required: true, message: 'Please input the budget!' }]}
      >
        <InputNumber
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="organisation"
        label="Organisation"
        rules={[{ required: true, message: 'Please select an organisation!' }]}
      >
        <Select placeholder="Select an organisation">
          {organisations.map(org => (
            <Option key={org._id} value={org._id}>
              {org.nom}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Project
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProject;
