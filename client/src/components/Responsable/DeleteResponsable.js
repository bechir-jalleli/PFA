import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

const DeleteResponsable = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/responsables/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Responsable deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete responsable',
      });
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this responsable?"
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

export default DeleteResponsable;
