import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UpdateSousOrganisation from './UpdateSousOrganisation';
import DeleteSousOrganisation from './DeleteSousOrganisation';
import CreateSousOrganisation from './CreateSousOrganisation';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ReadSousOrganisations = () => {
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [filteredSousOrganisations, setFilteredSousOrganisations] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchSousOrganisations = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/sous-organisations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSousOrganisations(response.data);
      setFilteredSousOrganisations(response.data);
    } catch (error) {
      console.error('Error fetching sous-organisations:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch sous-organisations',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSousOrganisations();

    const intervalId = setInterval(fetchSousOrganisations, 30000);
    return () => clearInterval(intervalId);
  }, [fetchSousOrganisations]);

  const handleCreateSuccess = () => {
    fetchSousOrganisations();
    setCreateModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchSousOrganisations();
    setUpdateModalVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchSousOrganisations();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = sousOrganisations.filter(
      (sousOrganisation) =>
        sousOrganisation.title.toLowerCase().includes(value.toLowerCase()) ||
        sousOrganisation.organisation?.title.toLowerCase().includes(value.toLowerCase()) ||
        sousOrganisation.responsable?.nom.toLowerCase().includes(value.toLowerCase()) ||
        sousOrganisation.responsable?.prenom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSousOrganisations(filtered);
  };

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Chiffre d\'Affaire',
      dataIndex: 'chiffreAffaire',
      key: 'chiffreAffaire',
      render: (chiffreAffaire) => `$${chiffreAffaire?.toLocaleString() || 'N/A'}`,
    },
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
      render: (organisation) => organisation?.title || 'N/A',
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
      render: (responsable) => responsable ? `${responsable.nom} ${responsable.prenom}` : 'N/A',
    },
    {
      title: 'Nombre de Projets',
      dataIndex: 'projects',
      key: 'projects',
      render: (projects) => projects?.length || 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/sous-organisations/info/${record._id}`)}
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setUpdateModalVisible(true);
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

  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadow,
    backgroundColor: isDarkMode ? token.colorBgElevated : token.colorBgContainer,
  };

  return (
    <Card style={cardStyle}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>Sous-Organisations</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Sous-Organisation
          </Button>
        </Space>
        <Search
          placeholder="Search by title, organisation, or responsable"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table 
          dataSource={filteredSousOrganisations} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title="Create Sous-Organisation"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
        >
          <CreateSousOrganisation
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
        <Modal
              title="Update Sous-Organisation"
              visible={updateModalVisible}
              onCancel={() => {
                setUpdateModalVisible(false);
                setSelectedId(null);
              }}
              footer={null}
            >
              {selectedId && (
                <UpdateSousOrganisation
                  id={selectedId}
                  onUpdateSuccess={handleUpdateSuccess}
                />
              )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadSousOrganisations;
