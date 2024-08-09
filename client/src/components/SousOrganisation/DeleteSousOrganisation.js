// src/components/DeleteSousOrganisation.js
import React from 'react';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';

const DeleteSousOrganisation = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/sous-organisations/${id}`);
      if (onDelete) onDelete(); // Refresh the list on success
    } catch (error) {
      console.error('Error deleting sous-organisation:', error);
    }
  };

  return (
    <Popconfirm
      title="Are you sure to delete this sous-organisation?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="danger">Delete</Button>
    </Popconfirm>
  );
};

export default DeleteSousOrganisation;
