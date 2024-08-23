import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification, Select } from 'antd';
import '../../styles/components/UpdateComponents.css';

const { Option } = Select;

function UpdateTache({ id, onUpdateSuccess }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [tache, setTache] = useState(null);
  const [chefProjects, setChefProjects] = useState([]);

  useEffect(() => {
    const fetchTache = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/taches/${id}`);
        setTache(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    const fetchChefProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chef-projects');
        setChefProjects(response.data);
      } catch (error) {
        console.error('Error fetching chef projects:', error);
      }
    };

    fetchTache();
    fetchChefProjects();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/taches/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Task updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update task',
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
        {tache && (
          <Form form={form} layout="vertical">
            <Form.Item
              name="titre"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select placeholder="Select a status">
                <Option value="Not Started">Not Started</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="chefProject"
              label="Chef Project"
              rules={[{ required: true, message: 'Please select a Chef Project!' }]}
            >
              <Select placeholder="Select a Chef Project">
                {chefProjects.map(chef => (
                  <Option key={chef._id} value={chef._id}>
                    {chef.nom} {chef.prenom}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}

export default UpdateTache;
