import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const getStudents = (params) => api.get('/students', { params });

export const getStudentById = (id) => api.get(`/students/${id}`);

export const createStudent = (formData) =>
  api.post('/students', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateStudent = (id, formData) =>
  api.put(`/students/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getStats = () => api.get('/students/stats');
