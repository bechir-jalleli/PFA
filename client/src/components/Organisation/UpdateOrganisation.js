// src/components/UpdateOrganisation.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';
import '../../styles/components/UpdateComponents.css';

const UpdateOrganisation = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
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
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); // Notify parent to refresh data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update organisation',
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button className="update-button" onClick={() => setVisible(true)}>
        Update
      </Button>

      <Modal
        className="update-modal"
        title="Update Organisation"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {organisation && (
          <Form form={form} layout="vertical" className="update-form">
            <Form.Item name="nom" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateOrganisation;
