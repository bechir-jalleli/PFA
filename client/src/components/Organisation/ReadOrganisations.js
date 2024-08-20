// src/components/ReadOrganisation.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal } from 'antd';
import UpdateOrganisation from './UpdateOrganisation';
import DeleteOrganisation from './DeleteOrganisation';
import CreateOrganisation from './CreateOrganisation';

const { Title } = Typography;

const ReadOrganisation = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [currentOrganisation, setCurrentOrganisation] = useState(null);

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/organisations');
      setOrganisations(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch organisations',
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
    setCreateVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchData(); // Refresh the list after update
    setUpdateVisible(false);
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
          <Button
            type="primary"
            onClick={() => {
              setCurrentOrganisation(record);
              setUpdateVisible(true);
            }}
            style={{ marginRight: '8px' }}
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setCurrentOrganisation(record);
              // Show delete confirmation dialog
              Modal.confirm({
                title: 'Are you sure you want to delete this organisation?',
                onOk: async () => {
                  try {
                    await axios.delete(`http://localhost:5000/organisations/${record._id}`);
                    notification.success({
                      message: 'Success',
                      description: 'Organisation deleted successfully',
                    });
                    handleDeleteSuccess();
                  } catch (error) {
                    notification.error({
                      message: 'Error',
                      description: 'Failed to delete organisation',
                    });
                  }
                },
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
<div style={{ padding: '20px', marginLeft: '20px' }}>    
    <Title level={2} style={{ marginBottom: '20px' }}>Organisations</Title>
      <Button
        type="primary"
        onClick={() => setCreateVisible(true)}
        style={{ marginBottom: '20px', float: 'right' }}
      >
        Create Organisation
      </Button>
      <Table
        columns={columns}
        dataSource={organisations}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }} // Enable horizontal scrolling if needed
      />
      <Modal
        title="Create Organisation"
        visible={createVisible}
        footer={null}
        onCancel={() => setCreateVisible(false)}
      >
        <CreateOrganisation 
          onClose={() => setCreateVisible(false)} 
          onCreateSuccess={handleCreateSuccess} 
        />
      </Modal>
      {currentOrganisation && (
        <UpdateOrganisation
          id={currentOrganisation._id}
          visible={updateVisible}
          onUpdateSuccess={handleUpdateSuccess}
          onClose={() => setUpdateVisible(false)}
        />
      )}
    </div>
  );
};

export default ReadOrganisation;
