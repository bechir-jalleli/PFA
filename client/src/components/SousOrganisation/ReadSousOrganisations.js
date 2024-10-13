import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateSousOrganisation from './UpdateSousOrganisation';
import DeleteSousOrganisation from './DeleteSousOrganisation';
import CreateSousOrganisation from './CreateSousOrganisation';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Search } = Input;

const ReadSousOrganisations = () => {
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [filteredSousOrganisations, setFilteredSousOrganisations] = useState([]);
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchSousOrganisations = async () => {
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
  };

  const fetchOrganisations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/organisations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrganisationOptions(response.data);
    
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

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = sousOrganisations.filter(
      (sousOrganisation) =>
        sousOrganisation.nom.toLowerCase().includes(value.toLowerCase()) ||
        sousOrganisation.description.toLowerCase().includes(value.toLowerCase()) ||
        sousOrganisation.organisation?.nom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSousOrganisations(filtered);
  };
  const navigate = useNavigate();
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
        icon={<EyeOutlined />}
        onClick={() => navigate(`/responsables/info/${record._id}`)}
      />
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
            onClick={() => setVisible(true)}
          >
            Create Sous-Organisation
          </Button>
        </Space>
        <Search
          placeholder="Search by name, details or organisation"
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
