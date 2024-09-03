import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
});

api.interceptors.request.use(
  (config) => {
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM5LCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTcyNTIwMjMzNywiZXhwIjoxNzI1Mjg4NzM3fQ.07eR5pEkXOpaGcM0sLYkrpsZts9QmmyM6ThfnTXsF7Q')
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;