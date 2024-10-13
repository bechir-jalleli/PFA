import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Button, Space, notification, Modal, Card, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateChefProject from './UpdateChefProject';
import DeleteChefProject from './DeleteChefProject';
import CreateChefProject from './CreateChefProject';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Search } = Input;

const ReadChefProject = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/chef-projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
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

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (chefProject) =>
        (chefProject.nom && chefProject.nom.toLowerCase().includes(value.toLowerCase())) ||
        (chefProject.prenom && chefProject.prenom.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
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
        icon={<EyeOutlined />}
        onClick={() => navigate(`/chef-projects/info/${record._id}`)}
      />
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

  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();

  const cardStyle = {
    marginBottom: token.marginMD,
    boxShadow: token.boxShadow,
    backgroundColor: isDarkMode ? token.colorBgElevated : token.colorBgContainer,
  };
  const navigate = useNavigate();
  return (
    <Card style={cardStyle}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>Chef Projects</Title>
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Chef Project
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
          columns={columns}
          dataSource={filteredData}
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
