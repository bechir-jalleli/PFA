// src/components/UpdateAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

function UpdateAdmin({ id, onUpdateSuccess }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`);
        setAdmin(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    fetchAdmin();
  }, [id, form]);

  const modifyAdmin = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/admin/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Admin updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); // Update the admin list after update
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update admin',
      });
    }
  };

  const Cancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>Update</Button>
      <Modal
        title="Update Admin"
        visible={visible}
        onOk={modifyAdmin}
        onCancel={Cancel}
      >
        {admin && (
          <Form form={form} layout="vertical">
            <Form.Item name="nom" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="prenom" label="Surname">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="mdp" label="Password">
              <Input.Password />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateAdmin;
