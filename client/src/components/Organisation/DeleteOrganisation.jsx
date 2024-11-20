import React from 'react';
import axios from 'axios';
import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteOrganisation = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/organisations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      notification.success({
        message: 'Success',
        description: 'Organisation deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'Failed to delete organisation',
      });
    }
  };

  return (
    <Popconfirm
      title="Delete Organisation"
      description="Are you sure you want to delete this organisation?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ danger: true }}
    >
      <Button 
        icon={<DeleteOutlined />}
        danger
        type="primary"
      />
    </Popconfirm>
  );
};

export default DeleteOrganisation;
