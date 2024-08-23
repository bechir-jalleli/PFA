import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Space, Button, Typography, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateAdmin from './UpdateAdmin';

const { Title } = Typography;

const ReadAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

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
    setVisible(false);
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
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentAdminId(record._id);
              setVisible(true);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div>
        <Title level={2}>Admins</Title>
        <Table
          dataSource={admins}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
        <Modal
          title="Update Admin"
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          {currentAdminId && (
            <UpdateAdmin
              id={currentAdminId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ReadAdmins;
