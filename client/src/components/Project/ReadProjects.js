import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, notification } from 'antd';
import UpdateProject from './UpdateProject';
import DeleteProject from './DeleteProject';
import CreateProject from './CreateProject';

const ReadProjects = () => {
  const [projects, setProjects] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [sousOrganisations, setSousOrganisations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const fetchData = async () => {
    try {
      const [projectsResponse, organisationsResponse, sousOrganisationsResponse] = await Promise.all([
        axios.get('http://localhost:5000/projects'),
        axios.get('http://localhost:5000/organisations'),
        axios.get('http://localhost:5000/sous-organisations'),
      ]);

      setProjects(projectsResponse.data);
      setOrganisations(organisationsResponse.data);
      setSousOrganisations(sousOrganisationsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      notification.error({
        message: 'Error',
        description: error.response ? error.response.data.message : 'Failed to fetch data.',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrichProjectData = (projects) => {
    return projects.map(project => {
      const organisation = organisations.find(org => org.no === project.organisation?._id) || { nom: 'N/A' };
      const sousOrganisation = sousOrganisations.find(sousOrg => sousOrg._id === project.sousOrganisation?._id) || { nom: 'N/A' };
      const chefProject = project.chefProject || { nom: 'N/A', prenom: 'N/A' };

      return {
        ...project,
        organisationName: organisation.nom,
        sousOrganisationName: sousOrganisation.nom,
        chefProjectName: `${chefProject.nom || 'N/A'} ${chefProject.prenom || 'N/A'}`,
      };
    });
  };

  const handleCreateSuccess = () => {
    fetchData(); // Refresh the project list after creation
  };

  const handleUpdateSuccess = () => {
    fetchData(); // Refresh the project list after update
  };

  const handleDeleteSuccess = () => {
    fetchData(); // Refresh the project list after deletion
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Organisation',
      dataIndex: 'organisationName',
      key: 'organisationName',
    },
    {
      title: 'Sous Organisation',
      dataIndex: 'sousOrganisationName',
      key: 'sousOrganisationName',
    },
    {
      title: 'Chef Project',
      dataIndex: 'chefProjectName',
      key: 'chefProjectName',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button
            onClick={() => {
              setSelectedProjectId(record._id);
              setVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <DeleteProject
            id={record._id}
            onDeleteSuccess={handleDeleteSuccess}
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
        Create Project
      </Button>
      <Table dataSource={enrichProjectData(projects)} columns={columns} rowKey="_id" />
      <Modal
        title="Create Project"
        visible={visible && !selectedProjectId}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CreateProject
          onCreateSuccess={handleCreateSuccess}
          onCancel={() => setVisible(false)}
        />
      </Modal>
      <Modal
        title="Update Project"
        visible={visible && selectedProjectId}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <UpdateProject
          id={selectedProjectId}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </>
  );
};

export default ReadProjects;
