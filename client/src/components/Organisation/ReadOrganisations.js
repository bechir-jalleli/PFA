import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import UpdateOrganisation from './UpdateOrganisation';
import DeleteOrganisation from './DeleteOrganisation';
import CreateOrganisation from './CreateOrganisation';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const ReadOrganisation = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');

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
      (organisation) =>
        organisation.nom.toLowerCase().includes(value.toLowerCase()) ||
        organisation.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: 'title',
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
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
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
          <Title level={4}>Organisations</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Organisation
          </Button>
        </Space>
        <Search
          placeholder="Search by name or description"
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
          title={selectedId ? "Update Organisation" : "Create Organisation"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateOrganisation 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateOrganisation 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadOrganisation;
