import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UpdateOrganisation from './UpdateOrganisation';
import DeleteOrganisation from './DeleteOrganisation';
import CreateOrganisation from './CreateOrganisation';
import { useTheme } from '../../Context/ThemeContext';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ReadOrganisation = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/organisations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch organisations',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (organisation) =>
        organisation.title.toLowerCase().includes(value.toLowerCase()) ||
        (organisation.description && organisation.description.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: "Chiffre d'Affaire",
      dataIndex: 'chiffreAffaire',
      key: 'chiffreAffaire',
      render: (value) => value ? `€${value.toLocaleString()}` : '-'
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
      render: (responsable) => responsable ? `${responsable.nom} ${responsable.prenom}` : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/organisations/info/${record._id}`)}
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setUpdateModalVisible(true);
            }}
          />
          <DeleteOrganisation 
            id={record._id} 
            onDeleteSuccess={fetchData}
          />
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={4}>List des Organisations</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create Organisation
        </Button>
      </Space>
      
      <Search
        placeholder="Search by title or description"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table 
        dataSource={filteredData} 
        columns={columns} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title="Create Organisation"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <CreateOrganisation
          onCreateSuccess={() => {
            fetchData();
            setCreateModalVisible(false);
          }}
        />
      </Modal>

      <Modal
        title="Update Organisation"
        open={updateModalVisible}
        onCancel={() => {
          setUpdateModalVisible(false);
          setSelectedId(null);
        }}
        footer={null}
      >
        {selectedId && (
          <UpdateOrganisation
            id={selectedId}
            onUpdateSuccess={() => {
              fetchData();
              setUpdateModalVisible(false);
              setSelectedId(null);
            }}
          />
        )}
      </Modal>
    </Space>
  );
};

export default ReadOrganisation;
