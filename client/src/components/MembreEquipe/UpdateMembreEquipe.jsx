import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, notification ,Card} from 'antd';

const UpdateMembreEquipe = ({ id, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembre = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5000/membre-equipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching membre equipe:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch membre equipe details',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMembre();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/membre-equipes/${id}`, values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Membre equipe updated successfully',
      });
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update membre equipe',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card hoverable style={{backgroundColor:'#fff',maxWidth: '500px',margin: '0 auto'}}>
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <Form form={form} onFinish={handleSubmit} layout="vertical">
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Membre Equipe
        </Button>
      </Form.Item>
    </Form>
    </div>
    </Card>
    
  );
};

export default UpdateMembreEquipe;
