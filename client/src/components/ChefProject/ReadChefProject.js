// src/components/ReadChefProject.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal } from 'antd';
import UpdateChefProject from './UpdateChefProject';
import DeleteChefProject from './DeleteChefProject';
import CreateChefProject from './CreateChefProject';

const { Title } = Typography;

const ReadChefProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chef-projects');
      setData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch Chef Projects',
      });
    } finally {
      setLoading(false);
    }
  };

  // Call fetchData when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSuccess = () => {
    fetchData(); // Refresh the list after creation
  };

  const handleUpdateSuccess = () => {
    fetchData(); // Refresh the list after update
  };

  const handleDeleteSuccess = () => {
    fetchData(); // Refresh the list after deletion
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'prenom',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <UpdateChefProject id={record._id} onUpdateSuccess={handleUpdateSuccess} />
          <DeleteChefProject id={record._id} onDeleteSuccess={handleDeleteSuccess} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', marginLeft: '20px' }}>
      <Title level={2}>Chef Projects</Title>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Chef Project
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
      />
      <Modal
        title="Create Chef Project"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateChefProject 
          onClose={() => setVisible(false)} 
          onCreateSuccess={handleCreateSuccess} 
        />
      </Modal>
    </div>
  );
};

export default ReadChefProject;
