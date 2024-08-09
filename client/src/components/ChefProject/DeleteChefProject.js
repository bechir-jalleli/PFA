// src/components/DeleteChefProject.js
import React from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const DeleteChefProject = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/chef-projects/${id}`);
      notification.success({
        message: 'Success',
        description: 'ChefProject deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess(); // Notify parent to refresh data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete ChefProject',
      });
    }
  };

  return <Button onClick={handleDelete} danger>Delete</Button>;
};

export default DeleteChefProject;
