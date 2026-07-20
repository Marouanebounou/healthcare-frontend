import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authService } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema } from '../Schemas/formSchemas';

export default function Login() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      localStorage.setItem('token', response.token || 'dummy-token');
      alert('Connexion réussie');
      navigate('/dashboard');
    } catch (error) {
      console.error("Erreur de connexion", error);
      alert('Identifiants incorrects');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#f9f9f9' }}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <div>
          <input type="email" {...register('email')} placeholder="Email" />
          {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email.message}</p>}
        </div>

        <div>
          <input type="password" {...register('password')} placeholder="Mot de passe" />
          {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password.message}</p>}
        </div>

        <button type="submit">Se connecter</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Pas de compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </div>
  );
}