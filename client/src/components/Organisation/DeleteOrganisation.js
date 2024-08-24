import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

const DeleteOrganisation = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/organisations/${id}`);
      notification.success({
        message: 'Success',
        description: 'Organisation deleted successfully',
      });
      if (onDelete) onDelete();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete organisation',
      });
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this organisation?"
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

export default DeleteOrganisation;
