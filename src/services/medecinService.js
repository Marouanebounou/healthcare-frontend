import api from './api';

export const medecinService = {
  getAll: async () => {
    const response = await api.get('/medecin/all');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/medecin/${id}`);
    return response.data;
  },
  searchBySpecialite: async (specialite) => {
    const response = await api.get(`/medecin/search/specialite/${specialite}`);
    return response.data;
  },
  create: async (medecinData) => {
    const response = await api.post('/medecin/create', medecinData);
    return response.data;
  },
  update: async (medecinData) => {
    const response = await api.put('/medecin/update', medecinData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/medecin/${id}`);
    return response.data;
  }
};