import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, InputNumber, Select } from 'antd';

const { Option } = Select;

const UpdateOrganisation = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const [orgResponse, respResponse] = await Promise.all([
          axios.get(`http://localhost:5000/organisations/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/responsables', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const orgData = orgResponse.data;
        setResponsables(respResponse.data);

        form.setFieldsValue({
          ...orgData,
          responsable: orgData.responsable._id || orgData.responsable
        });
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
      await axios.put(`http://localhost:5000/organisations/${id}`, values, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      notification.success({
        message: 'Success',
        description: 'Organisation updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      console.error('Error updating organisation:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update organisation',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
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
            <Option key={resp._id} value={resp._id}>{resp.nom}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Organisation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateOrganisation;
