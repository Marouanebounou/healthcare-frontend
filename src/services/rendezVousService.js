import api from './api';

export const rendezVousService = {
  getAll: async () => {
    const response = await api.get('/rendez-vous/all');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/rendez-vous/${id}`);
    return response.data;
  },
  getByPatientId: async (id) => {
    const response = await api.get(`/rendez-vous/patient/${id}`);
    return response.data;
  },
  getByMedecinId: async (id) => {
    const response = await api.get(`/rendez-vous/medecin/${id}`);
    return response.data;
  },
  searchByStatus: async (status) => {
    const response = await api.get(`/rendez-vous/search/status/${status}`);
    return response.data;
  },
  searchByDate: async (date) => {
    const response = await api.get(`/rendez-vous/search/date/${date}`);
    return response.data;
  },
  searchByPatientName: async (nom) => {
    const response = await api.get(`/rendez-vous/all/patient/${nom}`);
    return response.data;
  },
  searchByMedecinName: async (nom) => {
    const response = await api.get(`/rendez-vous/all/medecin/${nom}`);
    return response.data;
  },
  create: async (rdvData) => {
    const response = await api.post('/rendez-vous/create', rdvData);
    return response.data;
  },
  update: async (rdvData) => {
    const response = await api.put('/rendez-vous/update', rdvData);
    return response.data;
  },
  confirmer: async (id) => {
    const response = await api.put(`/rendez-vous/${id}/confirmer`);
    return response.data;
  },
  annuler: async (id) => {
    const response = await api.put(`/rendez-vous/${id}/annuler`);
    return response.data;
  }
};