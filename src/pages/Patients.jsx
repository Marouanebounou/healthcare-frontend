import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema } from "../Schemas/formSchemas";
import { patientService } from '../services/patientService';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(patientSchema)
  });

  const loadPatients = async () => {
    try {
      const data = await patientService.getAll();
      setPatients(data);
    } catch (error) {
      console.error("Erreur lors du chargement des patients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const onSubmit = async (data) => {
    try {
      await patientService.create(data);
      alert('Patient ajouté avec succès');
      reset();
      loadPatients();
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert('Erreur lors de l\'ajout du patient');
    }
  };

  return (
    <div>
      <h1>Gestion des Patients</h1>

      <section style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9' }}>
        <h2>Ajouter un Patient</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          
          <div>
            <input {...register('nom')} placeholder="Nom" />
            {errors.nom && <p style={{ color: 'red', margin: 0 }}>{errors.nom.message}</p>}
          </div>

          <div>
            <input {...register('prenom')} placeholder="Prénom" />
            {errors.prenom && <p style={{ color: 'red', margin: 0 }}>{errors.prenom.message}</p>}
          </div>

          <div>
            <input {...register('email')} placeholder="Email" />
            {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email.message}</p>}
          </div>

          <div>
            <input {...register('telephone')} placeholder="Téléphone" />
            {errors.telephone && <p style={{ color: 'red', margin: 0 }}>{errors.telephone.message}</p>}
          </div>

          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section>
        <h2>Liste des Patients</h2>
        {loading ? <p>Chargement...</p> : (
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.nom}</td>
                  <td>{patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>
                  <td>
                    <button>Modifier</button>
                    <button onClick={async () => {
                      if (window.confirm('Supprimer ce patient ?')) {
                        await patientService.delete(patient.id);
                        loadPatients();
                      }
                    }}>Supprimer</button>
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