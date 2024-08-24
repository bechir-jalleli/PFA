import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateSousOrganisation from './UpdateSousOrganisation';
import DeleteSousOrganisation from './DeleteSousOrganisation';
import CreateSousOrganisation from './CreateSousOrganisation';

const { Title } = Typography;

const ReadSousOrganisations = () => {
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSousOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sous-organisations');
      setSousOrganisations(response.data);
    } catch (error) {
      console.error('Error fetching sous-organisations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/organisations');
      setOrganisationOptions(response.data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  useEffect(() => {
    fetchSousOrganisations();
    fetchOrganisations();
  }, []);

  const handleCreateSuccess = () => {
    fetchSousOrganisations();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchSousOrganisations();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchSousOrganisations();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Details',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
      render: (organisation) => organisation?.nom || 'N/A',
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
          <DeleteSousOrganisation
            id={record._id}
            onDeleteSuccess={handleDeleteSuccess}
          >
            <Button icon={<DeleteOutlined />} danger />
          </DeleteSousOrganisation>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>Sous-Organisations</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Sous-Organisation
          </Button>
        </Space>
        <Table
          dataSource={sousOrganisations}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Sous-Organisation" : "Create Sous-Organisation"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateSousOrganisation
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
              organisationOptions={organisationOptions}
            />
          ) : (
            <CreateSousOrganisation
              onCreateSuccess={handleCreateSuccess}
              organisationOptions={organisationOptions}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadSousOrganisations;
