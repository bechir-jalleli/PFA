import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

const UpdateResponsable = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [responsable, setResponsable] = useState(null);

  useEffect(() => {
    const fetchResponsable = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/responsables/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setResponsable(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching responsable:', error);
      }
    };

    fetchResponsable();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/responsables/${id}`, form.getFieldsValue(), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Responsable updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update responsable',
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
        title="Update Responsable"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {responsable && (
          <Form 
            form={form} 
            layout="vertical"
            style={{ maxWidth: '400px', margin: '0 auto' }}
          >
            <Form.Item 
              name="nom" 
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="prenom" 
              label="Surname"
              rules={[{ required: true, message: 'Please input the surname!' }]}
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
              name="phone" 
              label="Phone"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item 
              name="mdp" 
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

export default UpdateResponsable;
