import axios from 'axios';
import { API_BASE_URL } from '@/config/apiConfig';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('header', config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
