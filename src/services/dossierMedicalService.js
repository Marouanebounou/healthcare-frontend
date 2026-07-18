import api from './api';

export const dossierMedicalService = {
  getAll: async () => {
    const response = await api.get('/dossier-medical/all');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/dossier-medical/${id}`);
    return response.data;
  },
  create: async (dossierData) => {
    const response = await api.post('/dossier-medical/create', dossierData);
    return response.data;
  },
  update: async (dossierData) => {
    const response = await api.put('/dossier-medical/update', dossierData);
    return response.data;
  },
  addObservation: async (id, observationData) => {
    const response = await api.post(`/dossier-medical/add/observation/${id}`, observationData);
    return response.data;
  },
  addDiagnostic: async (id, diagnosticData) => {
    const response = await api.post(`/dossier-medical/add/diagnostic/${id}`, diagnosticData);
    return response.data;
  }
};