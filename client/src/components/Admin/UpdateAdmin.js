import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

const UpdateAdmin = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admins/${id}`);
        setAdmin(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching admin:', error);
      }
    };

    fetchAdmin();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/admins/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Admin updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update admin',
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button 
        type="primary" 
        onClick={() => setVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        Update
      </Button>

      <Modal
        title="Update Admin"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
      >
        {admin && (
          <Form 
            form={form} 
            layout="vertical"
            style={{ maxWidth: '400px', margin: '0 auto' }}
          >
            <Form.Item 
              name="name" 
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="email" 
              label="Email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="password" 
              label="Password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateAdmin;
