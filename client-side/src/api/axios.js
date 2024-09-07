import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
});

api.interceptors.request.use(
  (config) => {
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzI1NzEwNjg4LCJleHAiOjE3MjU3OTcwODh9.swILKO-k6jos0drUVeAIlPEZ9Hlt0hNjr0FWCM6nYZQ')
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