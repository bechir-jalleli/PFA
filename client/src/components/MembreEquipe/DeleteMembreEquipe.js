import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

const DeleteMembreEquipe = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/membre-equipes/${id}`);
      notification.success({
        message: 'Success',
        description: 'Membre equipe deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete membre equipe',
      });
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this team member?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary" danger>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteMembreEquipe;