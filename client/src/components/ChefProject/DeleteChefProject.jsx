import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

const DeleteChefProject = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      await axios.delete(`http://localhost:5000/chef-projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    <Popconfirm
      title="Are you sure you want to delete this Chef Project?"
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

export default DeleteChefProject;