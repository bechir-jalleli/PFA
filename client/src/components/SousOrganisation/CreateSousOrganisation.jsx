import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, notification, Space, InputNumber } from 'antd';

const { Option } = Select;

const CreateSousOrganisation = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [organisations, setOrganisations] = useState([]);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    fetchOrganisations();
    fetchResponsables();
  }, []);

  const fetchOrganisations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/organisations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrganisations(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch organisations',
      });
    }
  };

  const fetchResponsables = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/responsables', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setResponsables(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch responsables',
      });
    }
  };

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:5000/sous-organisations', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
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
            <Option key={org._id} value={org._id}>{org.title}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="responsable"
        label="Responsable"
        rules={[{ required: true, message: 'Please select a responsable!' }]}
      >
        <Select placeholder="Select a responsable">
          {responsables.map(resp => (
            <Option key={resp._id} value={resp._id}>{`${resp.nom} ${resp.prenom}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="chiffreAffaire"
        label="Chiffre d'Affaire"
        rules={[{ required: true, message: 'Please input the chiffre d\'affaire!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
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
