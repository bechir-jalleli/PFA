import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import UpdateMembreEquipe from './UpdateMembreEquipe';
import DeleteMembreEquipe from './DeleteMembreEquipe';
import CreateMembreEquipe from './CreateMembreEquipe';

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
        <span>
          <UpdateMembreEquipe 
            id={record._id} 
            onUpdateSuccess={handleUpdateSuccess} 
          />
          <DeleteMembreEquipe 
            id={record._id} 
            onDeleteSuccess={handleDeleteSuccess} 
          />
        </span>
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
    </>
  );
};

export default ReadMembreEquipe;
