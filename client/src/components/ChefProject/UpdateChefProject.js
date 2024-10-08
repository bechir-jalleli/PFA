import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification } from 'antd';
import '../../styles/components/ChefProject.css';

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
        notification.error({
          message: 'Error',
          description: 'Failed to fetch Chef Project details',
        });
      }
    };

    fetchChefProject();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/chef-projects/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Chef Project updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess(); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update Chef Project',
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
        title="Update Chef Project"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {chefProject && (
          <Form form={form} layout="vertical" className="chef-project-form">
            <Form.Item name="nom" label="Name">
              <Input className="input-field" />
            </Form.Item>
            <Form.Item name="prenom" label="Surname">
              <Input className="input-field" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input className="input-field" />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input className="input-field" />
            </Form.Item>
            <Form.Item name="mdp" label="Password">
              <Input.Password className="input-field" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateChefProject;
