import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, notification, Row, Col } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const CreateProject = ({ onCreateSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const [ chefProjectRes] = await Promise.all([
      
        axios.get('http://localhost:5000/chef-projects', { headers }),
       
      ]);

      setChefProjects(chefProjectRes.data || []);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch data: ' + error.message,
      });
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const formattedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      };
      const response = await axios.post('http://localhost:5000/projects', formattedValues, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      notification.success({
        message: 'Success',
        description: 'Project created successfully',
      });
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
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
            <Select>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Delayed">Delayed</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please select the start date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please select the end date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="budget" label="Budget" rules={[{ required: true, message: 'Please input the budget!' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="revenue" label="Revenue">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
      <Col span={12}>
  <Form.Item
    name="chefProject"
    label="Chef Project"
    rules={[{ required: true, message: 'Please select a chef project!' }]}
  >
    <Select placeholder="Select a chef project">
      {chefProjects.map(chef => (
        <Select.Option key={chef.id} value={chef._id}>
          {`${chef.nom} ${chef.prenom}`}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
</Col>

        
      </Row>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
          Create Project
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
