import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../Schemas/formSchemas';
import { authService } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      alert('Inscription réussie, veuillez vous connecter');
      navigate('/login');
    } catch (error) {
      console.error("Erreur d'inscription", error);
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#f9f9f9' }}>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <div>
          <input {...register('username')} placeholder="Nom d'utilisateur" />
          {errors.username && <p style={{ color: 'red', margin: 0 }}>{errors.username.message}</p>}
        </div>

        <div>
          <input type="email" {...register('email')} placeholder="Email" />
          {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email.message}</p>}
        </div>

        <div>
          <input type="password" {...register('password')} placeholder="Mot de passe" />
          {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password.message}</p>}
        </div>

        <button type="submit">S'inscrire</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}