import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateTache from './UpdateTache';
import DeleteTache from './DeleteTache';
import CreateTache from './CreateTache';

const { Title } = Typography;

const ReadTaches = () => {
  const [taches, setTaches] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaches();
  }, []);

  const fetchTaches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/taches');
      setTaches(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    fetchTaches();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchTaches();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchTaches();
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
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setVisible(true);
            }}
          />
          <DeleteTache id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteTache>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>Tasks</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Task
          </Button>
        </Space>
        <Table 
          dataSource={taches} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Task" : "Create Task"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateTache 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateTache 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadTaches;
