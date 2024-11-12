import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UpdateResponsable from './UpdateResponsable';
import DeleteResponsable from './DeleteResponsable';
import CreateResponsable from './CreateResponsable';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ListResponsable = () => {
  const [responsables, setResponsables] = useState([]);
  const [filteredResponsables, setFilteredResponsables] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const fetchResponsables = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/responsables', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setResponsables(response.data);
      setFilteredResponsables(response.data);
    } catch (error) {
      console.error('Error fetching responsables:', error);
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
    setCreateModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchResponsables();
    setUpdateModalVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchResponsables();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = responsables.filter(
      (responsable) =>
        (responsable.nom && responsable.nom.toLowerCase().includes(value.toLowerCase())) ||
        (responsable.prenom && responsable.prenom.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredResponsables(filtered);
  };

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Active',
      dataIndex: 'isLoggedIn',
      key: 'isLoggedIn',
      render: (isLoggedIn) => (
        <span
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
          }}
        />
      ),
    },
    {
      title: 'Number of Projects',
      dataIndex: 'projects',
      key: 'projects',
      render: (projects) => projects.length,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/responsables/info/${record._id}`)}
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setUpdateModalVisible(true);
            }}
          />
          <DeleteResponsable id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteResponsable>
        </>
      ),
    },
  ];

  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();


  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>List des Responsable</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Responsable
          </Button>
        </Space>
        <Search
          placeholder="Search by nom or prénom"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table 
          dataSource={filteredResponsables} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title="Create Responsable"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
        >
          <CreateResponsable
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
        <Modal
          title="Update Responsable"
          visible={updateModalVisible}
          onCancel={() => {
            setUpdateModalVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId && (
            <UpdateResponsable
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </Modal>
      </Space>
    </>
  );
};

export default ListResponsable;
