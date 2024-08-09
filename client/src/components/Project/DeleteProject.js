import React from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const DeleteProject = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      notification.success({
        message: 'Success',
        description: 'Project deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete project',
      });
    }
  };

  return (
    <Button 
      type="primary" 
      danger ghost
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default DeleteProject;
