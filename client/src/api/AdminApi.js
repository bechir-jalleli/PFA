import axios from 'axios';



const URL = 'http://localhost:5000'; // Replace with your API base URL

export const getAdmin = async (id) => {
  try {
    const response = await axios.get(`${URL}/admin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getَAllAdmin = async (id) => {
  try {
    const response = await axios.get(`${URL}/admin`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const createAdmin = async (id) => {
  try {
    const response = await axios.post(`${URL}/admin`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};