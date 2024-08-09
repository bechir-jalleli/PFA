// src/components/ReadAdmins.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import UpdateAdmin from './UpdateAdmin';


const ReadAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [visible, setVisible] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

 

  const handleUpdateSuccess = () => {
    fetchAdmins(); // Refresh the admin list after update
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
          <UpdateAdmin id={record._id} onUpdateSuccess={handleUpdateSuccess} />
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
        Create Admin
      </Button>
      <Table dataSource={admins} columns={columns} rowKey="_id" />
      <Modal
        title="Create Admin"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
      </Modal>
    </>
  );
};

export default ReadAdmins;
