import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

const UpdateMembreEquipe = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [membre, setMembre] = useState(null);

  useEffect(() => {
    const fetchMembre = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/membre-equipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMembre(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching membre equipe:', error);
      }
    };

    fetchMembre();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/membre-equipes/${id}`, form.getFieldsValue(), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Membre equipe updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update membre equipe',
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Update
      </Button>
      <Modal
        title="Update Membre Equipe"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {membre && (
          <Form form={form} layout="vertical">
            <Form.Item name="nom" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="prenom" label="Surname" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateMembreEquipe;