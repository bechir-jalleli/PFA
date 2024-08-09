// src/components/ReadSousOrganisations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import UpdateSousOrganisation from './UpdateSousOrganisation';
import DeleteSousOrganisation from './DeleteSousOrganisation';
import CreateSousOrganisation from './CreateSousOrganisation';

const ReadSousOrganisations = () => {
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [visible, setVisible] = useState(false);

  // Fetch sous-organisations
  const fetchSousOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/sous-organisations');
      setSousOrganisations(response.data);
    } catch (error) {
      console.error('Error fetching sous-organisations:', error);
    }
  };

  // Fetch organisations for the select options
  const fetchOrganisations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/organisations');
      setOrganisationOptions(response.data);
    } catch (error) {
      console.error('Error fetching organisations:', error);
    }
  };

  useEffect(() => {
    fetchSousOrganisations();
    fetchOrganisations();
  }, []);

  // Update sous-organisation list after creation or deletion
  const handleCreateSuccess = () => {
    fetchSousOrganisations();
    setVisible(false);
  };

  const handleDeleteSuccess = () => {
    fetchSousOrganisations();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Details',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
      render: (organisation) => organisation?.nom || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <UpdateSousOrganisation
            id={record._id}
            onUpdateSuccess={fetchSousOrganisations}
          />
          <DeleteSousOrganisation
            id={record._id}
            onDelete={handleDeleteSuccess}
          />
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
        Create Sous-Organisation
      </Button>
      <Table
        dataSource={sousOrganisations}
        columns={columns}
        rowKey="_id"
      />
      <Modal
        title="Create Sous-Organisation"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateSousOrganisation
          onClose={handleCreateSuccess}
          organisationOptions={organisationOptions}
        />
      </Modal>
    </>
  );
};

export default ReadSousOrganisations;
