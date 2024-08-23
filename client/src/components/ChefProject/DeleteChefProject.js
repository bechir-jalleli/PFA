import React from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';
import '../../styles/components/ChefProject.css';

const DeleteChefProject = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/chef-projects/${id}`);
      notification.success({
        message: 'Success',
        description: 'Chef Project deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess(); 
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete Chef Project',
      });
    }
  };

  return (
    <Button onClick={handleDelete} danger className="delete-button">
      Delete
    </Button>
  );
};

export default DeleteChefProject;
