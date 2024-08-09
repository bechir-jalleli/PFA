import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import UpdateOrganisation from './UpdateOrganisation';
import DeleteOrganisation from './DeleteOrganisation';
import CreateOrganisation from './CreateOrganisation';

const ReadOrganisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const fetchOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/organisations');
      setOrganisations(response.data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  const handleCreateSuccess = () => {
    fetchOrganisations(); // Refresh organisations list after creating a new organisation
  };

  const handleUpdateSuccess = () => {
    fetchOrganisations(); // Refresh organisations list after updating an organisation
    setSelectedOrganisation(null); // Close update modal
  };

  const handleDelete = () => {
    fetchOrganisations(); // Refresh organisations list after deleting an organisation
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom', // Ensure 'nom' matches field name in data
      key: 'nom',
    },
    {
      title: 'Details',
      dataIndex: 'description', // Ensure 'description' matches field name in data
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => { setSelectedOrganisation(record); setVisible(true); }}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <DeleteOrganisation id={record._id} onDelete={handleDelete} />
        </span>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Create Organisation
      </Button>
      <Table dataSource={organisations} columns={columns} rowKey="_id" />
      <Modal
        title="Create Organisation"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateOrganisation onClose={() => setVisible(false)} onCreateSuccess={handleCreateSuccess} />
      </Modal>
      {selectedOrganisation && (
        <Modal
          title="Update Organisation"
          visible={true}
          onCancel={() => setSelectedOrganisation(null)}
          footer={null}
        >
          <UpdateOrganisation id={selectedOrganisation._id} onUpdateSuccess={handleUpdateSuccess} />
        </Modal>
      )}
    </>
  );
};

export default ReadOrganisations;
