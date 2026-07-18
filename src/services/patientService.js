import api from './api';

export const patientService = {
  getAll: async () => {
    const response = await api.get('/patient/all');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/patient/${id}`);
    return response.data;
  },

  create: async (patientData) => {
    const response = await api.post('/patient/add', patientData);
    return response.data;
  },

  update: async (patientData) => {
    const response = await api.put(`/patient/update/`, patientData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/patient/delete/${id}`);
    return response.data;
  }
};