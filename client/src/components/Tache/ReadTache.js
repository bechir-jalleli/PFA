import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import UpdateTache from './UpdateTache';
import DeleteTache from './DeleteTache';
import CreateTache from './CreateTache';
import '../../styles/components/TableComponents.css';  // Adjust the path as necessary

const ReadTaches = () => {
  const [taches, setTaches] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTaches();
  }, []);

  const fetchTaches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/taches');
      setTaches(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateSuccess = () => {
    fetchTaches(); // Refresh tasks after creating a new one
    setVisible(false); // Close the modal
  };

  const handleUpdateSuccess = () => {
    fetchTaches(); // Refresh tasks after updating
  };

  const handleDeleteSuccess = () => {
    fetchTaches(); // Refresh tasks after deleting
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'titre',
      key: 'titre',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Chef Project',
      dataIndex: 'chefProject',
      key: 'chefProject',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <UpdateTache id={record._id} onUpdateSuccess={handleUpdateSuccess} />
          <DeleteTache id={record._id} onDeleteSuccess={handleDeleteSuccess} />
        </span>
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
        Create Task
      </Button>
      <Table dataSource={taches} columns={columns} rowKey="_id" />
      <Modal
        title="Create Task"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateTache onCreateSuccess={handleCreateSuccess} />
      </Modal>
    </div>
    </div>
  );
};

export default ReadTaches;
