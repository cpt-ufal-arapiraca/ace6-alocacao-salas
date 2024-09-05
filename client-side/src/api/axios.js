import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
});

api.interceptors.request.use(
  (config) => {
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzI1Mzg0MjI4LCJleHAiOjE3MjU0NzA2Mjh9.JCnuplcDwvoB6bVy6wIjoKW9mhcqHVWvYFucLIJMe9A')
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