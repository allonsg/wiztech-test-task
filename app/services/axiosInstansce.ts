import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
