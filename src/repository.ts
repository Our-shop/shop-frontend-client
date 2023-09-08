import axios from 'axios';
import storage from './local-storage/storage';

const repository = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: false,
});

repository.interceptors.request.use((config) => {
  const accessToken = storage.get('access-token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default repository;
