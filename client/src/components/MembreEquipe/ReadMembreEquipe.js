import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Card, Space, Typography, notification, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateMembreEquipe from './UpdateMembreEquipe';
import DeleteMembreEquipe from './DeleteMembreEquipe';
import CreateMembreEquipe from './CreateMembreEquipe';
import { useTheme } from '../../Context/ThemeContext';
import { theme } from 'antd';

const { Title } = Typography;
const { Search } = Input;

const ReadMembreEquipe = () => {
  const [membres, setMembres] = useState([]);
  const [filteredMembres, setFilteredMembres] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchMembres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/membre-equipes');
      setMembres(response.data);
      setFilteredMembres(response.data);
    } catch (error) {
      console.error('Error fetching membres:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch membres',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  const handleCreateSuccess = () => {
    fetchMembres();
    setVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchMembres();
    setVisible(false);
    setSelectedId(null);
  };

  const handleDeleteSuccess = () => {
    fetchMembres();
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = membres.filter(
      (membre) =>
        (membre.nom && membre.nom.toLowerCase().includes(value.toLowerCase())) ||
        (membre.prenom && membre.prenom.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredMembres(filtered);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Surname',
      dataIndex: 'prenom',
      key: 'prenom',
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
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedId(record._id);
              setVisible(true);
            }}
          />
          <DeleteMembreEquipe id={record._id} onDeleteSuccess={handleDeleteSuccess}>
            <Button icon={<DeleteOutlined />} danger />
          </DeleteMembreEquipe>
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
          <Title level={4}>Membre Equipe</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
          >
            Create Membre Equipe
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
          dataSource={filteredMembres} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
        <Modal
          title={selectedId ? "Update Membre Equipe" : "Create Membre Equipe"}
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedId(null);
          }}
          footer={null}
        >
          {selectedId ? (
            <UpdateMembreEquipe 
              id={selectedId}
              onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <CreateMembreEquipe 
              onCreateSuccess={handleCreateSuccess}
            />
          )}
        </Modal>
      </Space>
    </Card>
  );
};

export default ReadMembreEquipe;
