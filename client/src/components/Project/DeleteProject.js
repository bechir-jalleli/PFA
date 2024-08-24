import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

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
    <Popconfirm
      title="Are you sure you want to delete this project?"
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

export default DeleteProject;
