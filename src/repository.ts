import axios from 'axios';

const repository = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

repository.interceptors.request.use((config) => {
  const accessToken = localStorage.get('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default repository;
