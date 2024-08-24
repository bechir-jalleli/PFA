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
        const response = await axios.get(`http://localhost:5000/responsables/${id}`);
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
      await axios.put(`http://localhost:5000/responsables/${id}`, form.getFieldsValue());
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
      <Button type="primary" onClick={() => setVisible(true)}>
        Update
      </Button>
      <Modal
        title="Update Responsable"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {responsable && (
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
            <Form.Item name="mdp" label="Password" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateResponsable;
