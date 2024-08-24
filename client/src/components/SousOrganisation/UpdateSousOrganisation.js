import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, notification, Select } from 'antd';

const { Option } = Select;

const UpdateSousOrganisation = ({ id, onUpdateSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [sousOrganisation, setSousOrganisation] = useState(null);
  const [organisationOptions, setOrganisationOptions] = useState([]);

  useEffect(() => {
    const fetchSousOrganisation = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sous-organisations/${id}`);
        setSousOrganisation(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching sous-organisation:', error);
      }
    };

    const fetchOrganisations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/organisations');
        setOrganisationOptions(response.data);
      } catch (error) {
        console.error('Error fetching organisations:', error);
      }
    };

    fetchSousOrganisation();
    fetchOrganisations();
  }, [id, form]);

  const handleOk = async () => {
    try {
      await form.validateFields();
      await axios.put(`http://localhost:5000/sous-organisations/${id}`, form.getFieldsValue());
      notification.success({
        message: 'Success',
        description: 'Sous-organisation updated successfully',
      });
      setVisible(false);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update sous-organisation',
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
        title="Update Sous-Organisation"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {sousOrganisation && (
          <Form form={form} layout="vertical">
            <Form.Item name="nom" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Details">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="organisation"
              label="Organisation"
              rules={[{ required: true, message: 'Please select an organisation!' }]}
            >
              <Select>
                {organisationOptions.map(org => (
                  <Option key={org._id} value={org._id}>{org.nom}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default UpdateSousOrganisation;
