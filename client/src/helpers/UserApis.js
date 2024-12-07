// apiHelper.js

import axios from 'axios';

const API_URL = "http://localhost:8000"; // Replace with your API server URL

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

// Create a new user
export const createUser = async (name, email, password, google_id) => {
  try {
    const response = await axios.post(`${API_URL}/api/users`, { name, email, password, google_id });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

// Login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

// Create a new feedback
export const createFeedback = async (content, userId, position, company, image_url = null) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/feedback`, { content, userId, position, company, image_url });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

// Get all feedbacks
export const getFeedbacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/users/feedbacks`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};
