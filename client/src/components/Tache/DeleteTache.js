import React from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const DeleteTache = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/taches/${id}`);
      notification.success({
        message: 'Success',
        description: 'Task deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess(); // Trigger refresh
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete task',
      });
    }
  };

  return (<Button 
    type="primary" 
    danger 
    ghost
    onClick={handleDelete}
  >
    Delete
  </Button>
  );
};

export default DeleteTache;
