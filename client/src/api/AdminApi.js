import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/admin';

// Fetch all admins
export const fetchAdmins = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
};

// Fetch a single admin by ID
export const fetchAdminById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin:', error);
    throw error;
  }
};

// Update an admin
export const updateAdmin = async (id, adminData) => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, adminData);
  } catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
};
