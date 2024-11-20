import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification, Select, InputNumber, Spin } from 'antd';

const { Option } = Select;

const UpdateSousOrganisation = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [responsableOptions, setResponsableOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const sousOrgResponse = axios.get(`http://localhost:5000/sous-organisations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const orgsResponse = axios.get('http://localhost:5000/organisations', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const responsablesResponse = axios.get('http://localhost:5000/responsables', {
          headers: { Authorization: `Bearer ${token}` },
        })

        const sousOrganisation = sousOrgResponse.data;

        form.setFieldsValue({
          title: sousOrganisation.title ,
          description: sousOrganisation.description ,
          chiffreAffaire: sousOrganisation.chiffreAffaire ,
          organisation: sousOrganisation.organisation?._id ,
          responsable: sousOrganisation.responsable?._id ,
        });

        setOrganisationOptions(orgsResponse.data);
        setResponsableOptions(responsablesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to load sous-organisation details. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/sous-organisations/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      notification.success({
        message: 'Success',
        description: 'Sous-Organisation updated successfully.',
      });

      if (onUpdateSuccess) {
        onUpdateSuccess(); 
      }
    } catch (error) {
      console.error('Error updating sous-organisation:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update sous-organisation. Please try again.',
      });
    }
  };

  if (loading) {
    return <Spin tip="Loading sous-organisation details..." />;
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input placeholder="Enter the title" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Enter a description (optional)" />
      </Form.Item>
      <Form.Item
        name="chiffreAffaire"
        label="Chiffre d'Affaire"
        rules={[{ required: true, message: "Please input the chiffre d'affaire!" }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Enter chiffre d'affaire"
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="organisation"
        label="Organisation"
        rules={[{ required: true, message: 'Please select an organisation!' }]}
      >
        <Select placeholder="Select an organisation" allowClear>
          {organisationOptions.map((org) => (
            <Option key={org._id} value={org._id}>
              {org.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="responsable"
        label="Responsable"
        rules={[{ required: true, message: 'Please select a responsable!' }]}
      >
        <Select placeholder="Select a responsable" allowClear>
          {responsableOptions.map((resp) => (
            <Option key={resp._id} value={resp._id}>
              {`${resp.nom} ${resp.prenom}`}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Sous-Organisation
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateSousOrganisation;
