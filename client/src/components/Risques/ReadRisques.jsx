import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Typography, notification, Input, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateRisque from './CreateRisque';

const { Title } = Typography;
const { Search } = Input;

const ReadRisques = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/risks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch risks',
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
    setCreateModalVisible(false);
  };

  const handleUpdateSuccess = () => {
    fetchData();
    setUpdateModalVisible(false);
    setSelectedId(null);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter(
      (risk) =>
        risk.project.title.toLowerCase().includes(value.toLowerCase()) ||
        risk.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getImpactColor = (impact) => {
    const colors = {
      Low: 'green',
      Medium: 'orange',
      High: 'red'
    };
    return colors[impact] || 'blue';
  };

  const columns = [
    {
      title: 'Project',
      dataIndex: ['project', 'title'],
      key: 'project',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Impact',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact) => (
        <Tag color={getImpactColor(impact)}>{impact}</Tag>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/risks/info/${record._id}`)}
          />
          
        </>
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={4}>List des Risques</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Risk
          </Button>
        </Space>
        
        <Search
          placeholder="Search by project or description"
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
          title="Create Risk"
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
        >
          <CreateRisque
            onCreateSuccess={handleCreateSuccess}
          />
        </Modal>
      </Space>
    </>
  );
};

export default ReadRisques;
