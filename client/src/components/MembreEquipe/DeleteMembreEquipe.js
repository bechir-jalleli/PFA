// src/components/DeleteMembreEquipe.js
import React from 'react';
import axios from 'axios';
import { Button, notification } from 'antd';

const DeleteMembreEquipe = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/membre-equipes/${id}`);
      notification.success({
        message: 'Success',
        description: 'Membre equipe deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess(); // Notify parent to refresh data
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete membre equipe',
      });
    }
  };

  return (
    <Button 
      type="primary" 
      danger 
      ghost
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default DeleteMembreEquipe;
