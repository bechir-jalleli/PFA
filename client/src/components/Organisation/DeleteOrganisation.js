import React from 'react';
import axios from 'axios';
import { Button } from 'antd';

const DeleteOrganisation = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/organisations/${id}`);
      if (onDelete) onDelete(); // Notify parent component about deletion
    } catch (error) {
      console.error('Error deleting organisation:', error);
    }
  };

  return (
    <Button type="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteOrganisation;
