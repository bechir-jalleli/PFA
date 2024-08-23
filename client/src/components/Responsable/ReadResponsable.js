  // src/components/ReadResponsables.js
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Table, Button, Modal, Space } from 'antd';
  import UpdateResponsable from './UpdateResponsable';
  import DeleteResponsable from './DeleteResponsable';
  import CreateResponsable from './CreateResponsable';
  import '../../styles/components/TableComponents.css';  // Adjust the path as necessary

  const ReadResponsables = () => {
    const [responsables, setResponsables] = useState([]);
    const [visible, setVisible] = useState(false);

    const fetchResponsables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/responsables');
        setResponsables(response.data);
      } catch (error) {
        console.error('Error fetching responsables:', error);
      }
    };

    useEffect(() => {
      fetchResponsables();
    }, []);

    const handleCreateSuccess = () => {
      fetchResponsables();
    };

    const handleUpdateSuccess = () => {
      fetchResponsables();
    };

    const handleDeleteSuccess = () => {
      fetchResponsables();
    };

    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
      },
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
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => new Date(text).toLocaleDateString(),
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (text) => new Date(text).toLocaleDateString(),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space>
            <UpdateResponsable id={record._id} onUpdateSuccess={handleUpdateSuccess} />
            <DeleteResponsable id={record._id} onDeleteSuccess={handleDeleteSuccess} />
          </Space>
        ),
      },
    ];

    return (
      
      <div className="table-container">
<div style={{ padding: '20px', marginLeft: '20px' }}>    
      
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          style={{ marginBottom: 16 }}
        >
          Create Responsable
        </Button>
        <Table dataSource={responsables} columns={columns} rowKey="_id" />
        <Modal
          title="Create Responsable"
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <CreateResponsable 
            onClose={() => setVisible(false)} 
            onCreateSuccess={handleCreateSuccess} 
          />
        </Modal>
      </div>
      </div>
    );
  };

  export default ReadResponsables;
