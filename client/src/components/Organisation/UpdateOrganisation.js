import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification } from 'antd';

const UpdateOrganisation = ({ id, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [organisation, setOrganisation] = useState(null);

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/organisations/${id}`);
        setOrganisation(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching organisation:', error);
      }
    };

    fetchOrganisation();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/organisations/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Organisation updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess(); // Notify parent to refresh data
      if (onClose) onClose(); // Close modal on success
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update organisation',
      });
    }
  };

  return (
    <>
      {organisation && (
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item name="nom" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Details">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Organisation
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default UpdateOrganisation;
