import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Alert } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateResponsable from './UpdateResponsable';
import DeleteResponsable from './DeleteResponsable';
import CreateResponsable from './CreateResponsable';

const { Title } = Typography;

const ReadResponsable = () => {
  const [responsables, setResponsables] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResponsables = async () => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:5000/responsables');
      setResponsables(response.data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
      setError('Failed to fetch responsables. Please try again later.');
      notification.error({
        message: 'Error',
        description: 'Failed to fetch responsables',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponsables();
  }, []);

  const handleCreateSuccess = () => {
    fetchResponsables();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchResponsables();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchResponsables();
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
      title: 'Organisation',
      dataIndex: ['organisation', 'nom'],
      key: 'organisation',
    },
    {
      title: 'Sous-Organisation',
      dataIndex: ['sousOrganisation', 'nom'],
      key: 'sousOrganisation',
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
          <DeleteResponsable id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteResponsable>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>Responsables</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Responsable
          </Button>
        </Space>
        {error && <Alert message={error} type="error" />}
        <Table 
          dataSource={responsables} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Responsable" : "Create Responsable"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateResponsable 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateResponsable 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadResponsable;
