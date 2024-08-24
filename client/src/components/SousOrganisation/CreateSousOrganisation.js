import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, notification, Space } from 'antd';

const { Option } = Select;

const CreateSousOrganisation = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/organisations');
        setOrganisations(response.data);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch organisations',
        });
      }
    };

    fetchOrganisations();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/sous-organisations', values);
      notification.success({
        message: 'Success',
        description: 'Sous-Organisation created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create Sous-Organisation',
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="nom"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="organisation"
        label="Organisation"
        rules={[{ required: true, message: 'Please select an organisation!' }]}
      >
        <Select placeholder="Select an organisation">
          {organisations.map(org => (
            <Option key={org._id} value={org._id}>{org.nom}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Create Sous-Organisation
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateSousOrganisation;
