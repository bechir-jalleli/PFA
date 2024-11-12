import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal, Input } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';
import CreateProject from './CreateProject';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ReadProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch projects',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateSuccess = () => {
    fetchProjects();
    setCreateModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchProjects();
    setUpdateModalVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchProjects();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(value.toLowerCase()) ||
        project.description.toLowerCase().includes(value.toLowerCase()) ||
        project.organisation.title.toLowerCase().includes(value.toLowerCase()) ||
        project.sousOrganisation.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(filtered);
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
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Organisation',
      dataIndex: ['organisation', 'title'],
      key: 'organisation',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/project/info/${record._id}`)}
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setUpdateModalVisible(true);
            }}
          />
          <DeleteProject id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteProject>
        </>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>List des Projects</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Project
          </Button>
        </Space>
        <Search
          placeholder="Search by title, description or organisation"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table 
          dataSource={filteredProjects} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title="Create Project"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
        >
          <CreateProject
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
        <Modal
          title="Update Project"
          visible={updateModalVisible}
          onCancel={() => {
            setUpdateModalVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId && (
            <UpdateProject
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          )}
        </Modal>
      </Space>
    </>
  );
};

export default ReadProjects;
