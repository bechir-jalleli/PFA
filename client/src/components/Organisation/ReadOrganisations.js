import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Row, Col, Typography, Space, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateOrganisation from './UpdateOrganisation';
import DeleteOrganisation from './DeleteOrganisation';
import CreateOrganisation from './CreateOrganisation';

const { Title } = Typography;

const ReadOrganisation = () => {
  const [organisations, setOrganisations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrganisationId, setSelectedOrganisationId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/organisations');
      setOrganisations(response.data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch organisations',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const handleCreateSuccess = () => {
    fetchOrganisations();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchOrganisations();
    setSelectedOrganisationId(null);
    setVisible(false);
  };

  const handleDeleteSuccess = () => {
    fetchOrganisations();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
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
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedOrganisationId(record._id);
              setVisible(true);
            }}
          />
          <DeleteOrganisation id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteOrganisation>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4}>Organisations</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Organisation
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={organisations}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title={selectedOrganisationId ? "Update Organisation" : "Create Organisation"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelectedOrganisationId(null);
        }}
        footer={null}
      >
        {selectedOrganisationId ? (
          <UpdateOrganisation
            id={selectedOrganisationId}
            onUpdateSuccess={handleUpdateSuccess}
            onCancel={() => {
              setVisible(false);
              setSelectedOrganisationId(null);
            }}
          />
        ) : (
          <CreateOrganisation
            onCreateSuccess={handleCreateSuccess}
            onCancel={() => setVisible(false)}
          />
        )}
      </Modal>
    </Card>
  );
};

export default ReadOrganisation;
