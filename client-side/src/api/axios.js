import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5555',
});

api.interceptors.request.use(
  (config) => {
    localStorage.setItem('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzI5NDE3OTY3LCJleHAiOjE3Mjk1MDQzNjd9.YcIKFNYCuNXgob-QcHecPA-f9Y1FRtFz53ERgAABo8I')
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        const errorMessage = error.response.data.message || 'Solicitação inválida. Verifique os dados informados.';
        return Promise.reject(new Error(errorMessage));
      } else if (statusCode === 401) {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
