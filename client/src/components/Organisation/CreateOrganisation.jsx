import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button, notification, Space, InputNumber } from 'antd';

const { Option } = Select;

const CreateOrganisation = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm();
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
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

    fetchResponsables();
  }, []);

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:5000/organisations', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Organisation created successfully',
      });
      form.resetFields();
      if (onCreateSuccess) onCreateSuccess();
      if (onClose) onClose();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create organisation',
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
        name="chiffreAffaire"
        label="Chiffre d'Affaire"
      >
        <InputNumber 
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="responsable"
        label="Responsable"
        rules={[{ required: true, message: 'Please select a responsable!' }]}
      >
        <Select placeholder="Select a responsable">
          {responsables.map(resp => (
            <Option key={resp._id} value={resp._id}>{resp.nom}  {resp.prenom}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Create Organisation
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateOrganisation;
