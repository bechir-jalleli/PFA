// src/components/ReadChefProject.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal } from 'antd';
import UpdateChefProject from './UpdateOrganisation';
import CreateChefProject from './CreateOrganisation';
import '../../styles/components/TableComponents.css';

const { Title } = Typography;

const ReadChefProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [currentChefProject, setCurrentChefProject] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSuccess = () => {
    fetchData();
    setCreateVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setUpdateVisible(false);
  };

  const handleDeleteSuccess = () => {
    fetchData();
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
          <Button
            type="primary"
            onClick={() => {
              setCurrentChefProject(record);
              setUpdateVisible(true);
            }}
            style={{ marginRight: '8px' }}
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => {
              setCurrentChefProject(record);
              Modal.confirm({
                title: 'Are you sure you want to delete this Chef Project?',
                onOk: async () => {
                  try {
                    await axios.delete(`http://localhost:5000/chef-projects/${record._id}`);
                    notification.success({
                      message: 'Success',
                      description: 'Chef Project deleted successfully',
                    });
                    handleDeleteSuccess();
                  } catch (error) {
                    notification.error({
                      message: 'Error',
                      description: 'Failed to delete Chef Project',
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
    <div className="table-container">
      <div style={{ padding: '20px', marginLeft: '20px' }}>
        <Title level={2}>Chef Projects</Title>
        <Button
          type="primary"
          onClick={() => setCreateVisible(true)}
          style={{ marginBottom: 16, float: 'right' }}
        >
          Create Chef Project
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
        <Modal
          title="Create Chef Project"
          visible={createVisible}
          footer={null}
          onCancel={() => setCreateVisible(false)}
        >
          <CreateChefProject 
            onClose={() => setCreateVisible(false)} 
            onCreateSuccess={handleCreateSuccess} 
          />
        </Modal>
        {currentChefProject && (
          <UpdateChefProject
            id={currentChefProject._id}
            visible={updateVisible}
            onUpdateSuccess={handleUpdateSuccess}
            onClose={() => setUpdateVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ReadChefProject;
