import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rendezVousService } from '../services/rendezVousService';
import { patientService } from '../services/patientService';
import { medecinService } from '../services/medecinService';
import { rendezvousSchema } from '../Schemas/formSchemas';
import { dossierMedicalService } from '../services/dossierMedicalService';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dossierMedical, setDossierMedical] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(rendezvousSchema)
  });

  const loadData = async () => {
    try {
      const [apptsData, ptsData, medsData , dossierData] = await Promise.all([
        rendezVousService.getAll(),
        patientService.getAll(),
        medecinService.getAll(),
        dossierMedicalService.getAll()
      ]);
      
      setAppointments(apptsData.content || []);
      setPatients(ptsData.content || []);
      setMedecins(medsData.content || []);
      setDossierMedical(dossierData.content || []);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        dateRendezVous: data.dateRendezvous,
        status: data.status,
        patientId: data.patientId,
        medecinId: data.medecinId,
        dossierMedicalId: data.dossierMedical || null
      };
      await rendezVousService.create(payload);
      alert('Rendez-vous planifié avec succès');
      reset();
      loadData();
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert('Erreur lors de la planification du rendez-vous');
    }
  };

  return (
    <div>
      <h1>Gestion des Rendez-vous</h1>

      <section style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9' }}>
        <h2>Planifier un Rendez-vous</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          
          <div>
            <label>Patient</label>
            <select {...register('patientId')} style={{ width: '100%', padding: '5px' }}>
              <option value="">Sélectionnez un patient...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.nom} {p.prenom}</option>
              ))}
            </select>
            {errors.patientId && <p style={{ color: 'red', margin: 0 }}>{errors.patientId.message}</p>}
          </div>

          <div>
            <label>Médecin</label>
            <select {...register('medecinId')} style={{ width: '100%', padding: '5px' }}>
              <option value="">Sélectionnez un médecin...</option>
              {medecins.map(m => (
                <option key={m.id} value={m.id}>{m.nom} {m.prenom} - {m.specialite}</option>
              ))}
            </select>
            {errors.medecinId && <p style={{ color: 'red', margin: 0 }}>{errors.medecinId.message}</p>}
          </div>

          
          <div>
            <label>Dossier Médical</label>
            <select {...register('dossierMedical')} style={{ width: '100%', padding: '5px' }}>
              <option value="">Sélectionnez un dossier médical...</option>
              {dossierMedical.map(d => (
                <option key={d.id} value={d.id}>{d.diagnostic} - {d.observation}</option>
              ))}
            </select>
            {errors.dossierMedical && <p style={{ color: 'red', margin: 0 }}>{errors.dossierMedical.message}</p>}
          </div>

          <div>
            <label>Date et Heure</label>
            <input type="datetime-local" {...register('dateRendezvous')} style={{ width: '100%', padding: '5px' }} />
            {errors.dateRendezvous && <p style={{ color: 'red', margin: 0 }}>{errors.dateRendezvous.message}</p>}
          </div>

          <div>
            <label>Statut</label>
            <select {...register('status')} style={{ width: '100%', padding: '5px' }}>
              <option value="PLANIFIE">Planifié</option>
              <option value="CONFIRME">Confirmé</option>
              <option value="ANNULE">Annulé</option>
            </select>
            {errors.status && <p style={{ color: 'red', margin: 0 }}>{errors.status.message}</p>}
          </div>

          <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>Planifier</button>
        </form>
      </section>

      <section>
        <h2>Liste des Rendez-vous</h2>
        {loading ? <p>Chargement...</p> : (
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Médecin</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(rdv => (
                <tr key={rdv.id}>
                  <td>{new Date(rdv.dateRendezvous).toLocaleString()}</td>
                  <td>{rdv.patient?.nom} {rdv.patient?.prenom}</td>
                  <td>{rdv.medecin?.nom} - {rdv.medecin?.specialite}</td>
                  <td>{rdv.status}</td>
                  <td>
                    {rdv.status !== 'CONFIRME' && (
                      <button onClick={async () => {
                        await rendezVousService.confirmer(rdv.id);
                        loadData();
                      }}>Confirmer</button>
                    )}
                    {rdv.status !== 'ANNULE' && (
                      <button onClick={async () => {
                        await rendezVousService.annuler(rdv.id);
                        loadData();
                      }}>Annuler</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}