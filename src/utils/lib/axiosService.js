import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'http://localhost:8000/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// singleton instance
export default axiosService;