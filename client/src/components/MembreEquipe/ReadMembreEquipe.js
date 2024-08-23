// src/components/ReadMembreEquipe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Space } from 'antd';
import UpdateMembreEquipe from './UpdateMembreEquipe';
import DeleteMembreEquipe from './DeleteMembreEquipe';
import CreateMembreEquipe from './CreateMembreEquipe';
import '../../styles/components/TableComponents.css';  // Adjust the path as necessary

const ReadMembreEquipe = () => {
  const [membres, setMembres] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchMembres();
  }, []);

  const fetchMembres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/membre-equipes');
      setMembres(response.data);
    } catch (error) {
      console.error('Error fetching membres equipe:', error);
    }
  };

  const handleCreateSuccess = () => {
    fetchMembres(); // Refresh the list after creation
  };

  const handleUpdateSuccess = () => {
    fetchMembres(); // Refresh the list after update
  };

  const handleDeleteSuccess = () => {
    fetchMembres(); // Refresh the list after deletion
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
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
      render: (text, record) => (
        <Space>
          <UpdateMembreEquipe id={record._id} onUpdateSuccess={handleUpdateSuccess} />
          <DeleteMembreEquipe id={record._id} onDeleteSuccess={handleDeleteSuccess} />
        </Space>
      ),
    },
  ];

  return (
   
    <div className="table-container">
 <div style={{ padding: '20px', marginLeft: '20px' }}>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Membre Equipe
      </Button>
      <Table dataSource={membres} columns={columns} rowKey="_id" />
      <Modal
        title="Create Membre Equipe"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateMembreEquipe 
          onClose={() => setVisible(false)} 
          onCreateSuccess={handleCreateSuccess} 
        />
      </Modal>
    </div>
    </div>
  );
};

export default ReadMembreEquipe;
