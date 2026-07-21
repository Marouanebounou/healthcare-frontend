import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { medecinService } from '../services/medecinService';
import { medecinSchema } from '../Schemas/formSchemas';

export default function Doctors() {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(medecinSchema)
  });

  const loadMedecins = async () => {
    try {
      const data = await medecinService.getAll();
      console.log(data);
      setMedecins(data.content || []);
    } catch (error) {
      console.error("Erreur lors du chargement des médecins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedecins();
  }, []);

  const onSubmit = async (data) => {
    try {
      await medecinService.create(data);
      alert('Médecin ajouté avec succès');
      reset(); 
      loadMedecins(); 
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert('Erreur lors de l\'ajout du médecin');
    }
  };

  return (
    <div>
      <h1>Gestion des Médecins</h1>

      <section style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9' }}>
        <h2>Ajouter un Médecin</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          
          <div>
            <input {...register('nom')} placeholder="Nom" />
            {errors.nom && <p style={{ color: 'red', margin: 0 }}>{errors.nom.message}</p>}
          </div>

          <div>
            <input {...register('email')} placeholder="Email" />
            {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email.message}</p>}
          </div>

          <div>
            <input {...register('specialite')} placeholder="Spécialité (ex: Cardiologue)" />
            {errors.specialite && <p style={{ color: 'red', margin: 0 }}>{errors.specialite.message}</p>}
          </div>

          <div>
            <input type="number" {...register('telephone')} placeholder="Téléphone" />
            {errors.telephone && <p style={{ color: 'red', margin: 0 }}>{errors.telephone.message}</p>} 
          </div>

          <button type="submit">Ajouter</button>
        </form>
      </section>

      <section>
        <h2>Liste des Médecins</h2>
        {loading ? <p>Chargement...</p> : (
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Spécialité</th>
                <th>Téléphone</th>
              </tr>
            </thead>
            <tbody>
              {medecins.map(medecin => (
                <tr key={medecin.id}>
                  <td>{medecin.nom}</td>
                  <td>{medecin.email}</td>
                  <td>{medecin.specialite}</td>
                  <td>{medecin.telephone}</td>
                  <td>
                    <button>Modifier</button>
                    <button onClick={async () => {
                      if (window.confirm('Supprimer ce médecin ?')) {
                        await medecinService.delete(medecin.id);
                        loadMedecins();
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