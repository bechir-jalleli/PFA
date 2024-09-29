import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateResponsable from './UpdateResponsable';
import DeleteResponsable from './DeleteResponsable';
import CreateResponsable from './CreateResponsable';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const ListResponsable = () => {
  const [responsables, setResponsables] = useState([]);
  const [filteredResponsables, setFilteredResponsables] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchResponsables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/responsables');
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
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchResponsables();
    setVisible(false);
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
            backgroundColor: isLoggedIn ? 'green' : 'red',
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
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setVisible(true);
            }}
          />
          <DeleteResponsable id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteResponsable>
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
          <Title level={4}>Responsables</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
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
          title={selectedId ? "Update Responsable" : "Create Responsable"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateResponsable 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateResponsable 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ListResponsable;
