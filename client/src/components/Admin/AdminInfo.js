import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Descriptions, Spin, notification } from 'antd';

const AdminInfo = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/${id}`);
        setAdmin(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin info:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch admin information',
        });
        setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!admin) {
    return <div>No admin information found.</div>;
  }

  return (
    <Card title="Admin Information" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{admin._id}</Descriptions.Item>
        <Descriptions.Item label="Nom">{admin.nom}</Descriptions.Item>
        <Descriptions.Item label="Prenom">{admin.prenom}</Descriptions.Item>
        <Descriptions.Item label="Email">{admin.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{admin.phone}</Descriptions.Item>
        <Descriptions.Item label="Created At">{new Date(admin.createdAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{new Date(admin.updatedAt).toLocaleString()}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default AdminInfo;
