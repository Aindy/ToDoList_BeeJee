import axios from 'axios';

const API_URL = 'http://localhost/api';


export const getTasks = (page = 1, sortBy = 'username') => {
  return axios.get(`${API_URL}/tasks?page=${page}&sort_by=${sortBy}`);
};


export const createTask = (taskData) => {
  return axios.post(`${API_URL}/tasks`, taskData);
};


export const editTask = async (taskId, taskData, token) => {
  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  try {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task.");
  }
};


export const loginAdmin = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};
