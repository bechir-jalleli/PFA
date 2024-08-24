import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';
import CreateProject from './CreateProject';

const { Title } = Typography;

const ReadProjects = () => {
  const [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch projects',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateSuccess = () => {
    fetchProjects();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchProjects();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchProjects();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Organisation',
      dataIndex: ['organisation', 'nom'],
      key: 'organisation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setVisible(true);
            }}
          />
          <DeleteProject id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteProject>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>Projects</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Project
          </Button>
        </Space>
        <Table 
          dataSource={projects} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Project" : "Create Project"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateProject 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateProject 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadProjects;
