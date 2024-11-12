import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal, Input, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UpdateTache from './UpdateTache';
import DeleteTache from './DeleteTache';
import CreateTache from './CreateTache';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const ReadTaches = () => {
  const [taches, setTaches] = useState([]);
  const [filteredTaches, setFilteredTaches] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const fetchTaches = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/taches', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTaches(response.data);
      setFilteredTaches(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch tasks',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  const handleCreateSuccess = () => {
    fetchTaches();
    setCreateModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchTaches();
    setUpdateModalVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchTaches();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = taches.filter(
      (tache) =>
        tache.titre.toLowerCase().includes(value.toLowerCase()) ||
        tache.description.toLowerCase().includes(value.toLowerCase()) ||
        tache.status.toLowerCase().includes(value.toLowerCase()) ||
        tache.priority.toLowerCase().includes(value.toLowerCase()) ||
        (tache.projet && tache.projet.nom.toLowerCase().includes(value.toLowerCase())) ||
        (tache.membreEquipe && 
          `${tache.membreEquipe.nom} ${tache.membreEquipe.prenom}`.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredTaches(filtered);
  };

  const getStatusColor = (status) => {
    const colors = {
      'not started': 'orange',
      'in progress': 'blue',
      'completed': 'green',
      'default': 'default'
    };
    return colors[status.toLowerCase()] || colors.default;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'red',
      'medium': 'orange',
      'low': 'green',
      'default': 'default'
    };
    return colors[priority.toLowerCase()] || colors.default;
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'titre',
      key: 'titre',
      sorter: (a, b) => a.titre.localeCompare(b.titre),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'Not Started', value: 'not started' },
        { text: 'In Progress', value: 'in progress' },
        { text: 'Completed', value: 'completed' },
      ],
      onFilter: (value, record) => record.status.toLowerCase() === value,
    },
    {
      title: 'Membre Équipe',
      dataIndex: ['membreEquipe', 'nom'],
      key: 'membreEquipe',
      render: (_, record) =>
        `${record.membreEquipe?.nom || ''} ${record.membreEquipe?.prenom || ''}`,
    },
    {
      title: 'Nom de Projet',
      dataIndex: ['project', 'tittle'],
      key: 'project',
      render: (text, record) => record.project?.tittle || '',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => (date ? new Date(date).toLocaleDateString() : 'N/A'),
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>{priority.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'High', value: 'high' },
        { text: 'Medium', value: 'medium' },
        { text: 'Low', value: 'low' },
      ],
      onFilter: (value, record) => record.priority.toLowerCase() === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/taches/info/${record._id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedId(record._id);
              setUpdateModalVisible(true);
            }}
          />
          <DeleteTache id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteTache>
        </>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>List des Tâches</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Task
          </Button>
        </Space>
        <Search
          placeholder="Search by title, description, status, membre équipe, or project"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={filteredTaches}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title="Create Task"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
        >
          <CreateTache onCreateSuccess={handleCreateSuccess} />
        </Modal>
        <Modal
          title="Update Task"
          visible={updateModalVisible}
          onCancel={() => {
            setUpdateModalVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId && (
            <UpdateTache 
              id={selectedId} 
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </Modal>
      </Space>
    </>
  );
};

export default ReadTaches;
