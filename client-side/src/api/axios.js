import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
});

api.interceptors.request.use(
  (config) => {
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzI1MTE0MTk0LCJleHAiOjE3MjUyMDA1OTR9.f0iyK4LNtxwCGWfywM4OxVVeV014tY-hyxLbhPepdFo')
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