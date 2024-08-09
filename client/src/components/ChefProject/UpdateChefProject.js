// src/components/UpdateChefProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';

const UpdateChefProject = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [chefProject, setChefProject] = useState(null);

  useEffect(() => {
    const fetchChefProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chef-projects/${id}`);
        setChefProject(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching ChefProject:', error);
      }
    };

    fetchChefProject();
  }, [id, form]);

  const modifyChef = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/chef-projects/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'ChefProject updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); // Notify parent to refresh data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update ChefProject',
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
        title="Update ChefProject"
        visible={visible}
        onOk={modifyChef}
        onCancel={Cancel}
      >
        {chefProject && (
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

export default UpdateChefProject;
