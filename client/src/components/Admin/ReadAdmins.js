// src/components/Admin/ReadAdmins.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Space } from 'antd';
import UpdateAdmin from './UpdateAdmin';

const ReadAdmins = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleUpdateSuccess = () => {
    fetchAdmins();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <UpdateAdmin id={record._id} onUpdateSuccess={handleUpdateSuccess} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', marginLeft: '20px' }}>
      <Table dataSource={admins} columns={columns} rowKey="_id" />
    </div>
  );
};

export default ReadAdmins;
