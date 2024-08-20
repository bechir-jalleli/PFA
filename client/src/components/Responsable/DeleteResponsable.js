// src/components/DeleteResponsable.js
import React from 'react';
import axios from 'axios';
import { notification , Button} from 'antd';

const DeleteResponsable = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/responsables/${id}`);
      notification.success({
        message: 'Success',
        description: 'Responsable deleted successfully',
      });
      if (onDeleteSuccess) onDeleteSuccess(); // Refresh data after delete
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete responsable',
      });
    }
  };

  return <div>
  <Button type="primary" danger ghost onClick={handleDelete}>Delete</Button>
</div>
};
export default DeleteResponsable;
