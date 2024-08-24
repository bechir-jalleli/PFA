import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateChefProject from './UpdateChefProject';
import DeleteChefProject from './DeleteChefProject';
import CreateChefProject from './CreateChefProject';

const { Title } = Typography;

const ReadChefProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchData();
  };

  const columns = [
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
          <DeleteChefProject id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteChefProject>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>Chef Projects</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Chef Project
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Chef Project" : "Create Chef Project"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateChefProject 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateChefProject 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadChefProject;
