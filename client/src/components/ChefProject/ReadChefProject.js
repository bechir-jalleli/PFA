// src/components/ReadChefProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import CreateChefProject from './CreateChefProject';
import UpdateChefProject from './UpdateChefProject';
import DeleteChefProject from './DeleteChefProject';

const ReadChefProject = () => {
  const [chefProjects, setChefProjects] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchChefProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chef-projects');
      setChefProjects(response.data);
    } catch (error) {
      console.error('Error fetching ChefProjects:', error);
    }
  };

  useEffect(() => {
    fetchChefProjects();
  }, []);

  const handleCreateSuccess = () => {
    fetchChefProjects(); 
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
          <UpdateChefProject id={record._id} onUpdateSuccess={fetchChefProjects} />
          <DeleteChefProject id={record._id} onDeleteSuccess={fetchChefProjects} />
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
        Create ChefProject
      </Button>
      <Table dataSource={chefProjects} columns={columns} rowKey="_id" />
      <Modal
        title="Create ChefProject"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateChefProject onClose={() => setVisible(false)} onCreateSuccess={handleCreateSuccess} />
      </Modal>
    </>
  );
};

export default ReadChefProject;
