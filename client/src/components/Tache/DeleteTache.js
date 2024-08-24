import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';

const DeleteTache = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/taches/${id}`);
      notification.success({
        message: 'Success',
        description: 'Task deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete task',
      });
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this task?"
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

export default DeleteTache;
