// src/components/UpdateMembreEquipe.js
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
        const response = await axios.get(`http://localhost:5000/membre-equipes/${id}`);
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
      await axios.put(`http://localhost:5000/membre-equipes/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Membre equipe updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); // Notify parent to refresh data
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
      <Button className="update-button" onClick={() => setVisible(true)}>
  Update
</Button>

<Modal
  className="update-modal"
  title="Update Task"
  visible={visible}
  onOk={handleOk}
  onCancel={handleCancel}
>

        {membre && (
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
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateMembreEquipe;
