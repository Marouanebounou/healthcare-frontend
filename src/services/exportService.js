import api from './api';

export const exportService = {
  exportPatientRendezVousExcel: async (patientId) => {
    const response = await api.get(`/exports/patient/${patientId}/rendezvous/excel`, {
    });
    return response.data;
  },
  exportDossierRapport: async (id) => {
    const response = await api.get(`/exports/dossier/${id}/rapport`, {
      responseType: 'blob'
    });
    return response.data;
  },
  exportDossierPdf: async (id) => {
    const response = await api.get(`/exports/dossier/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  }
};