// src/components/ReadResponsables.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Space } from 'antd';
import UpdateResponsable from './UpdateResponsable';
import DeleteResponsable from './DeleteResponsable';
import CreateResponsable from './CreateResponsable';

const ReadResponsables = () => {
  const [responsables, setResponsables] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchResponsables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/responsables');
      setResponsables(response.data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
    }
  };

  useEffect(() => {
    fetchResponsables();
  }, []);

  const handleCreateSuccess = () => {
    fetchResponsables(); // Refresh the list of responsables after creation
  };

  const handleUpdateSuccess = () => {
    fetchResponsables(); // Refresh the list of responsables after update
  };

  const handleDeleteSuccess = () => {
    fetchResponsables(); // Refresh the list of responsables after deletion
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Surname',
      dataIndex: 'prenom',
      key: 'prenom',
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
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <UpdateResponsable id={record._id} onUpdateSuccess={handleUpdateSuccess} />
          <DeleteResponsable id={record._id} onDeleteSuccess={handleDeleteSuccess} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Responsable
      </Button>
      <Table dataSource={responsables} columns={columns} rowKey="_id" />
      <Modal
        title="Create Responsable"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateResponsable 
          onClose={() => setVisible(false)} 
          onCreateSuccess={handleCreateSuccess} 
        />
      </Modal>
    </>
  );
};

export default ReadResponsables;
