// src/components/UpdateOrganisation.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

const UpdateOrganisation = ({ id, visible, onUpdateSuccess, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/organisations/${id}`);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching organisation:', error);
      }
    };

    if (visible) {
      fetchOrganisation();
    }
  }, [id, visible, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/organisations/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Organisation updated successfully',
      });
      onClose(); // Close the modal
      if (onUpdateSuccess) onUpdateSuccess(); // Refresh data after update
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update organisation',
      });
    }
  };

  return (
    <Modal
      title="Update Organisation"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      width={600} // Adjust the width as needed
    >
      <Form form={form} layout="vertical">
        <Form.Item name="nom" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateOrganisation;
